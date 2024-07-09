import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UISelect } from "../../components/UI/Select";
import { postService } from "../../actions/POST/post-service";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { useLocaleService } from "../../../services/locale";
import { getCurrencies } from "../../actions/GET/get-currencies";
import { BankToast } from "../../components/BankToast";
import { useDarkModeService } from "../../../services/dark-mode";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../../types").CustomError>} UseQueryResult
 */

export function ServiceForm() {
  const { isDark } = useDarkModeService();
  const { locale } = useLocaleService();
  const selectedCurrency = useRef(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "",
    description: "",
  });

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

  const mutation = useMutationWithToast(postService, {
    invalidateQueries: ["services"],
  });

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    // wait 3 seconds before being able to submit again
    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  useEffect(() => {
    if (!mutation.isSuccess) return;

    // when success, reset form
    setForm({
      name: "",
      price: "",
      currency: "",
      description: "",
    });
    selectedCurrency.current = null;
  }, [mutation.isSuccess]);

  return (
    <div className="flex flex-col gap-10 py-5 px-5 h-full overflow-y-scroll">
      <h1 className="text-5xl w-full text-center">Service Form</h1>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-6 gap-4 w-full lg:w-[600px] items-start"
          onSubmit={(e) => {
            e.preventDefault();
            // prevent multiple submits
            if (!mutation.isIdle) return;
            mutation.mutate({ service: form, locale });
          }}
        >
          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Name
          </label>
          <div className="col-span-full md:col-span-5">
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Price
          </label>
          <div className="col-span-full md:col-span-5">
            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Currency
          </label>
          <div className="col-span-full md:col-span-5">
            <UISelect
              value={selectedCurrency.current}
              onChange={(e) => {
                setForm({ ...form, currency: e.value });
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

          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Description
          </label>
          <div className="col-span-full md:col-span-5">
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 h-[12ch] rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>
          <button
            type="submit"
            className={`${mutation.isIdle ? "bg-primary-400" : "bg-primary-300"} outline-none focus:outline-offset-2 focus:outline-primary-400 px-4 py-2 text-center col-span-full md:col-start-2 md:col-span-5 rounded text-white hover:bg-primary-300 flex gap-2 justify-center`}
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
            {mutation.isError && <span>Ups! hubo un problema</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
