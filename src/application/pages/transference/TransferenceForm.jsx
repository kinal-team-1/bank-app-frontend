import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { postTransference } from "../../actions/POST/post-transference";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { UISelect } from "../../components/UI/Select";
import { getCurrencies } from "../../actions/GET/get-currencies";
import { useAuthService } from "../../../services/auth";
import { getAccountsByUserId } from "../../actions/GET/get-accounts-by-user-id";
import { BankToast } from "../../components/BankToast";
import { useDarkModeService } from "../../../services/dark-mode";
import { Switch } from "../../components/UI/Switch";
import { FavoriteAccountsSelect } from "./SelectFavoriteAccount";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../../types").CustomError>} UseQueryResult
 */

export function TransferenceForm() {
  const { isDark } = useDarkModeService();
  const { user: userLogged } = useAuthService();
  const { locale } = useParams();
  const [isFavoriteAccountsOpen, setIsFavoriteAccountsOpen] = useState(false);
  const selectedCurrency = useRef(null);
  const selectedOriginAccount = useRef(null);
  const selectedDestinyAccount = useRef(null);
  const [form, setForm] = useState({
    account_given: "",
    account_reciver: "",
    quantity: "",
    currency: "",
    description: "",
  });

  const [
    {
      data: [currencies] = [],
      isLoading: isCurrenciesLoading,
      isError: isCurrencyError,
      error: currencyError,
    },
    {
      data: [accounts] = [],
      isLoading: isAccountsLoading,
      isError: isAccountsError,
      error: accountsError,
    },
  ] =
    /** @type UseQueryResult[] */
    (
      useQueries({
        queries: [
          {
            queryKey: ["currencies", { locale }],
            queryFn: getCurrencies,
          },
          {
            // eslint-disable-next-line no-underscore-dangle
            queryKey: ["accounts", { locale, userId: userLogged._id }],
            queryFn: getAccountsByUserId,
          },
        ],
      })
    );

  if (isCurrencyError || isAccountsError) {
    // show toaster when error loading currencies
    toast.error(
      <BankToast
        title={(accountsError || currencyError).message}
        statusCode={(accountsError || currencyError).statusCode}
        message={(accountsError || currencyError).errors}
      />,
      {
        autoClose: 5000,
        closeButton: true,
        theme: isDark ? "dark" : "light",
      },
    );
  }

  const mutation = useMutationWithToast(postTransference, {
    invalidateQueries: ["transferences"],
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
      account_given: "",
      account_reciver: "",
      quantity: "",
      currency: "",
      description: "",
    });
    selectedCurrency.current = null;
    selectedOriginAccount.current = null;
  }, [mutation.isSuccess]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, account_reciver: "" }));

    selectedDestinyAccount.current = null;
  }, [isFavoriteAccountsOpen]);

  return (
    <div className="flex flex-col gap-10 py-5 px-5 h-full overflow-y-scroll">
      <h1 className="text-5xl w-full text-center">Transference Form</h1>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-6 gap-4 w-full lg:w-[600px] items-start"
          onSubmit={(e) => {
            e.preventDefault();
            // prevent multiple submits
            if (!mutation.isIdle) return;
            mutation.mutate({ transference: form, locale });
          }}
        >
          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Cuenta de origen
          </label>
          <div className="col-span-full md:col-span-5">
            <UISelect
              value={selectedOriginAccount.current}
              onChange={(e) => {
                setForm({ ...form, account_given: e.value });
                selectedOriginAccount.current = e;
              }}
              options={(isAccountsLoading || isAccountsError
                ? []
                : accounts
              ).map((account) => {
                return {
                  label: account.name,
                  // eslint-disable-next-line no-underscore-dangle
                  value: account._id,
                };
              })}
            />
          </div>

          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Usar favoritos
          </label>
          <div className="col-span-full md:col-span-5">
            <Switch
              checked={isFavoriteAccountsOpen}
              onChange={() => {
                setIsFavoriteAccountsOpen((prev) => !prev);
              }}
              color={isDark ? "#3B3F51" : "#D1D5DB"}
            />
          </div>

          {isFavoriteAccountsOpen && (
            <>
              <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
                Usar favoritos
              </label>
              <div className="col-span-full md:col-span-5">
                <FavoriteAccountsSelect
                  ownerAccountId={selectedOriginAccount.current}
                  onCreate={() => {
                    setIsFavoriteAccountsOpen(false);
                  }}
                  accountSelected={selectedDestinyAccount.current}
                  onChange={(e) => {
                    console.log("klasjdkasdj");
                    selectedDestinyAccount.current = e;
                    setForm({ ...form, account_reciver: e.value });
                  }}
                />
              </div>
            </>
          )}

          {!isFavoriteAccountsOpen && (
            <>
              <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
                Cuenta de destino
              </label>
              <div className="col-span-full md:col-span-5">
                <input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  value={form.account_reciver}
                  onChange={(e) =>
                    setForm({ ...form, account_reciver: e.target.value })
                  }
                  type="text"
                  className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
                />
              </div>
            </>
          )}
          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Quantity
          </label>
          <div className="col-span-full md:col-span-5">
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
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
              options={(isCurrenciesLoading || isCurrencyError
                ? []
                : currencies
              ).map((currency) => {
                return {
                  label: currency.symbol,
                  // eslint-disable-next-line no-underscore-dangle
                  value: currency._id,
                };
              })}
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