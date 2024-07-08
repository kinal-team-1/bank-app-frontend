import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getFavoriteAccounts } from "../../actions/GET/get-favorite-accounts";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { FavoriteAccountCard } from "./FavoriteAccountCard";

export function FavoriteAccounts() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { locale } = useParams();
  const [params] = useSearchParams();
  const {
    data: [favoriteAccounts] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: [
      "favorite-accounts",
      { locale, params, userId: "6688d000cf82a5bb663e69e1" },
    ],
    queryFn: getFavoriteAccounts,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!favoriteAccounts) return null;

  console.log({ favoriteAccounts }, { hiddenElements });

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
        {favoriteAccounts.map((account) => (
          <FavoriteAccountCard
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
            account={account.account}
            alias={account.alias}
          />
        ))}
      </div>
      {hiddenElements.size === favoriteAccounts.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
