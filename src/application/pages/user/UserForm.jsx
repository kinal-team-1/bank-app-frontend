import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { postUser } from "../../actions/POST/post-user";
import { useLocaleService } from "../../../services/locale";
import { UISelect } from "../../components/UI/Select";
import { getCurrencies } from "../../actions/GET/get-currencies";
import { BankToast } from "../../components/BankToast";
import { useDarkModeService } from "../../../services/dark-mode";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../../types").CustomError>} UseQueryResult
 */

export function UserForm() {
  const { locale } = useParams();
  const { LL } = useLocaleService();
  const selectedCurrency = useRef(null);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    last_name: "",
    address: "",
    DPI: "",
    phone_number: "",
    job_name: "",
    monthly_income: "",
    currency_income: "",
    initial_balance: 0,
  });

  const { isDark } = useDarkModeService();

  // Fetch currencies
  const { data: [currencies] = [], isLoading, isError, error } =
    /** @type UseQueryResult */
    (
      useQuery({
        queryKey: ["currencies"],
        queryFn: getCurrencies,
      })
    );

  // show toaster when error loading currencies
  if (isError) {
    toast.error(
      <BankToast
        title={error.message}
        statusCode={error.statusCode}
        message={error.errors}
      />,
      {
        autoClose: 5000,
        closeButton: true,
        theme: isDark ? "dark" : "light",
      },
    );
  }

  const mutation = useMutationWithToast(postUser, {
    invalidateQueries: ["users"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mutation.isIdle) return;

    await mutation.mutateAsync({ user: form, locale });
  };

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  return (
    <div className="flex flex-col gap-10 py-5 px-5 h-full overflow-y-scroll">
      <h1 className="text-5xl w-full text-center">User Form</h1>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-6 gap-4 w-full lg:w-[600px] items-start"
          onSubmit={handleSubmit}
        >
          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.EMAIL?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              autoFocus
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.USERNAME?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.PASSWORD?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.NAME?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.LAST_NAME?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.ADDRESS?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.DPI?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.DPI}
              onChange={(e) => setForm({ ...form, DPI: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.PHONE_NUMBER?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.phone_number}
              onChange={(e) =>
                setForm({ ...form, phone_number: e.target.value })
              }
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.JOB_NAME?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.job_name}
              onChange={(e) => setForm({ ...form, job_name: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.MONTHLY_INCOME?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.monthly_income}
              onChange={(e) =>
                setForm({ ...form, monthly_income: e.target.value })
              }
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            {LL?.PAGES?.USER?.CURRENCY_INCOME?.()}
          </label>
          <div className="col-span-full md:col-span-4">
            <UISelect
              value={selectedCurrency.current}
              onChange={(e) => {
                setForm({ ...form, currency_income: e.value });
                selectedCurrency.current = e;
              }}
              options={(isLoading || isError ? [] : currencies).map(
                (currency) => {
                  return {
                    label: currency.symbol,
                    // eslint-disable-next-line no-underscore-dangle
                    value: currency._id,
                  };
                },
              )}
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            ajskldjaslkdjs
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.initial_balance}
              onChange={(e) =>
                setForm({ ...form, initial_balance: e.target.value })
              }
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <button
            type="submit"
            className={`${
              mutation.isIdle ? "bg-primary-400" : "bg-primary-300"
            } outline-none focus:outline-offset-2 focus:outline-primary-400 px-4 py-2 text-center col-span-full md:col-start-3 md:col-span-4 rounded text-white hover:bg-primary-300 flex gap-2 justify-center`}
          >
            {mutation.isIdle && "Submit"}
            {mutation.isPending && (
              <>
                <span className="animate-spin">Submitting ...</span>
                <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
              </>
            )}
            {mutation.isSuccess && (
              <>
                <span>Success</span>
                <FontAwesomeIcon icon={faCheck} />
              </>
            )}
            {mutation.isError && <span>Oops! There was an error</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
