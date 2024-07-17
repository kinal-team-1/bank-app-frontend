import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getPayouts } from "../../actions/GET/get-payout";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { PayoutCard } from "./payoutCard";
import { useAuthService } from "../../../services/auth";

export function Payout() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { locale } = useParams();
  const [params] = useSearchParams();
  const { user: userLogged } = useAuthService();
  const {
    data: [payouts] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["payouts", { locale, params, userId: userLogged._id }],
    queryFn: getPayouts,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!payouts) return null;

  console.log({ payouts }, { hiddenElements });

  return (
    <div className="h-full flex flex-col">
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {payouts.map((payout) => (
          <PayoutCard
            onShow={() => {
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.delete(payout._id);
                return new Set(prev);
              });
            }}
            onHide={() =>
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.add(payout._id);
                return new Set(prev);
              })
            }
            /* eslint-disable-next-line no-underscore-dangle */
            key={payout._id}
            email={payout.email}
            username={payout.username}
            password={payout.password}
            name={payout.name}
            // eslint-disable-next-line no-underscore-dangle
            id={payouts._id}
          />
        ))}
      </div>
      {hiddenElements.size === payouts.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
