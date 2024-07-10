import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { useAuthService } from "../../../services/auth";
import { getAccountsByUserId } from "../../actions/GET/get-accounts-by-user-id";
import { AccountCard } from "./AccountCard";

export function Accounts() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { user } = useAuthService();
  const { locale } = useParams();
  const [params] = useSearchParams();
  const {
    data: [accounts] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["accounts", { locale, params, userId: user._id }],
    queryFn: getAccountsByUserId,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!accounts) return null;

  console.log({ favoriteAccounts: accounts }, { hiddenElements });

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="py-2 flex justify-end md:px-4">
        <Link
          to="./create"
          className="px-4 py-2 bg-primary-400 rounded text-white hover:bg-primary-300"
        >
          Crear
        </Link>
      </div>
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {accounts.map((account) => (
          <AccountCard
            onShow={() => {
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.delete(account._id);
                return new Set(prev);
              });
            }}
            onHide={() =>
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.add(account._id);
                return new Set(prev);
              })
            }
            // eslint-disable-next-line no-underscore-dangle
            key={account._id}
            currency={account.currency}
            balance={account.balance}
            name={account.name}
          />
        ))}
      </div>
      {hiddenElements.size === accounts.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
