import { useQueries } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTransactionsByUserId } from "../../actions/GET/get-transactions-by-user-id";
import { getTransferencesByUserId } from "../../actions/GET/get-transferences-by-user-id";
import { getPayoutsByUserId } from "../../actions/GET/get-payouts-by-user-id";
import { getPurchasesByUserId } from "../../actions/GET/get-purchases-by-user-id";
import { BankToast } from "../../components/BankToast";
import { useDarkModeService } from "../../../services/dark-mode";
import { useAuthService } from "../../../services/auth";

function mergeAndSort(transactions, transferences, payouts, purchases) {
  // Add a 'type' property to each item in the arrays
  // eslint-disable-next-line no-param-reassign
  transactions.forEach((item) => (item.type = "transaction"));
  // eslint-disable-next-line no-param-reassign
  transferences.forEach((item) => (item.type = "transference"));
  // eslint-disable-next-line no-param-reassign
  payouts.forEach((item) => (item.type = "payout"));
  // eslint-disable-next-line no-param-reassign
  purchases.forEach((item) => (item.type = "purchase"));

  // Merge all arrays into one
  const merged = [...transactions, ...transferences, ...payouts, ...purchases];

  // Sort the merged array by 'created_at' in descending order (recent to oldest)
  merged.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return merged;
}

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../../types").CustomError>} UseQueryResult
 */

export function Movements() {
  // const [hiddenELements, setHiddenElements] = useState([]);
  const { isDark } = useDarkModeService();
  const { locale } = useParams();
  const { user: userLogged } = useAuthService();
  const [params] = useSearchParams();
  const [
    {
      data: [transactions] = [],
      isLoading: transactionsIsLoading,
      error: transactionsError,
    },
    {
      data: [transferences] = [],
      isLoading: transferencesIsLoading,
      error: transferencesError,
    },
    { data: [payouts] = [], isLoading: payoutsIsLoading, error: payoutsError },
    {
      data: [purchases] = [],
      isLoading: purchasesIsLoading,
      error: purchasesError,
    },
  ] =
    /** @type UseQueryResult[] */
    (
      useQueries({
        queries: [
          {
            queryKey: [
              "transactions",
              // eslint-disable-next-line no-underscore-dangle
              { locale, params, userId: userLogged._id },
            ],
            queryFn: getTransactionsByUserId,
          },
          {
            queryKey: [
              "transferences",
              // eslint-disable-next-line no-underscore-dangle
              { locale, params, userId: userLogged._id },
            ],
            queryFn: getTransferencesByUserId,
          },
          {
            // eslint-disable-next-line no-underscore-dangle
            queryKey: ["payouts", { locale, params, userId: userLogged._id }],
            queryFn: getPayoutsByUserId,
          },
          {
            // eslint-disable-next-line no-underscore-dangle
            queryKey: ["purchases", { locale, params, userId: userLogged._id }],
            queryFn: getPurchasesByUserId,
          },
        ],
      })
    );

  if (
    transactionsIsLoading ||
    transferencesIsLoading ||
    payoutsIsLoading ||
    purchasesIsLoading
  ) {
    return <div>Loading...</div>;
  }

  if (
    transactionsError ||
    transferencesError ||
    payoutsError ||
    purchasesError
  ) {
    console.log({ transactions, transferences, payouts, purchases });
    const errors = [
      transactionsError,
      transferencesError,
      payoutsError,
      purchasesError,
    ].filter(Boolean);

    errors.forEach((error) => {
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
      return <div>Something wrong happened</div>;
    });
  }

  if (!transactions || !transferences || !payouts || !purchases) {
    return <div>ups</div>;
  }

  const components = mergeAndSort(
    transactions,
    transferences,
    payouts,
    purchases,
  );
  return (
    <div className="flex flex-col gap-5">
      <Links />
      {components.map((component) => {
        if (component.type === "transference") {
          return <TransferenceCard />;
        }
        if (component.type === "transaction") {
          return <TransactionCard />;
        }

        if (component.type === "payout") {
          return <PayoutCard />;
        }

        return <PurchaseCard />;
      })}
    </div>
  );
}

// TODO convert to searchable
function TransactionCard() {
  return <div>hola</div>;
}

function PayoutCard() {
  return <div>hola</div>;
}

function PurchaseCard() {
  return <div>hola</div>;
}

function TransferenceCard() {
  return <div>hola</div>;
}

function Links() {
  return (
    <div className="flex gap-3 w-full border justify-around rounded-full">
      {/* TABS FOR EACH ENTITY */}
      <Link
        className="px-3 py-2 rounded hover:text-primary-400"
        to="./transactions"
      >
        Transactions
      </Link>
      <Link
        className="px-3 py-2 rounded hover:text-primary-400"
        to="./transferences"
      >
        transferences
      </Link>
      <Link className="px-3 py-2 rounded hover:text-primary-400" to="./payouts">
        payouts
      </Link>
      <Link
        className="px-3 py-2 rounded hover:text-primary-400"
        to="./purchases"
      >
        purchases
      </Link>
    </div>
  );
}
