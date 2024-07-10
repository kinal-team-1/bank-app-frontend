import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { PurchaseCard } from "./PurchaseCard";
import { getPurchases } from "../../actions/GET/get-purchases";

export function Purchases() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { locale } = useParams();
  const [params] = useSearchParams();

  const {
    data: [purchase] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: ["purchases", { locale, params }],
    queryFn: getPurchases,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!purchase) return null;

  console.log({ purchases }, { hiddenElements });

  return (
    <div className="h-full flex flex-col">
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {purchases.map((purchase) => (
          <PurchaseCard
            onShow={() => {
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.delete(purchase._id);
                return new Set(prev);
              });
            }}
            onHide={() =>
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.add(purchase._id);
                return new Set(prev);
              })
            }
            /* eslint-disable-next-line no-underscore-dangle */
            key={purchase._id}
            purchaser={purchase.purchaser.name}
            productName={purchase.product.name}
            quantity={purchase.quantity}
            total={purchase.total}
            currency={purchase.currency.name}
            // eslint-disable-next-line no-underscore-dangle
            id={purchase._id}
          />
        ))}
      </div>
      {hiddenElements.size === purchases.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
