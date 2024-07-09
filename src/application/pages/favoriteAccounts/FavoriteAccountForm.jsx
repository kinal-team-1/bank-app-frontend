import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { postFavoriteAccount } from "../../actions/POST/post-favorite-account";
import { useAuthService } from "../../../services/auth";
import { getUserById } from "../../actions/GET/get-user-by-id.js";
import { UISelect } from "../../components/UI/Select";

export function FavoriteAccountForm() {
  const { locale } = useParams();
  const { user } = useAuthService();
  // const { LL } = useLocaleService();
  const [form, setForm] = useState({
    account: "",
    alias: "",
  });

  const {
    data: [user] = [],
    isLoading,
    isError,
  } = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["user", { locale, id: user._id }],
    queryFn: getUserById,
  });

  const mutation = useMutationWithToast(postFavoriteAccount, {
    invalidateQueries: ["favorite-accounts"],
  });

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  useEffect(() => {
    if (!mutation.isSuccess) return;

    setForm({
      account: "",
      alias: "",
    });
  }, [mutation.isSuccess]);

  const accounts = user?.accounts || [];

  return (
    <div className="flex flex-col gap-10 py-5 px-5 h-full overflow-y-scroll">
      <h1 className="text-5xl w-full text-center">Create Alias</h1>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-6 gap-4 w-full lg:w-[600px] items-start"
          onSubmit={(e) => {
            e.preventDefault();
            // prevent multiple submits
            if (!mutation.isIdle) return;
            mutation.mutate({ favoriteAccount: form, locale, user });
          }}
        >
          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Choose your account
          </label>
          <div className="col-span-full md:col-span-5">
            <UISelect
              value={selectedAccount.current}
              onChange={(e) => {
                setForm({ ...form, account: e.value });
                selectedAccount.current = e;
              }}
              options={accounts.map((currency) => {
                return {
                  label: currency.symbol,
                  // eslint-disable-next-line no-underscore-dangle
                  value: currency._id,
                };
              })}
            />
          </div>

          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Account
          </label>
          <div className="col-span-full md:col-span-5">
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={form.account}
              onChange={(e) => setForm({ ...form, account: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Alias
          </label>
          <div className="col-span-full md:col-span-5">
            <input
              value={form.alias}
              onChange={(e) => setForm({ ...form, alias: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <button
            type="submit"
            className={`${mutation.isIdle ? "bg-primary-400" : "bg-primary-300"} outline-none focus:outline-offset-2 focus:outline-primary-400 px-4 py-2 text-center col-span-full md:col-start-2 md:col-span-5 rounded text-white hover:bg-primary-300 flex gap-2 justify-center`}
          >
            {mutation.isIdle && "Create"}
            {mutation.isPending && (
              <>
                <span className="">Submitting ...</span>
                <span className="animate-spin size-[25px] border-4 border-t-silver-500 rounded-full" />
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
