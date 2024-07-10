import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getServices } from "../../actions/GET/get-services";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { locale } = useParams();
  const [params] = useSearchParams();
  const {
    data: [services] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: ["services", { locale, params }],
    queryFn: getServices,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!services) return null;

  console.log({ services }, { hiddenElements });

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {services.map((service) => (
          <ServiceCard
            onShow={() => {
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.delete(service._id);
                return new Set(prev);
              });
            }}
            onHide={() =>
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.add(service._id);
                return new Set(prev);
              })
            }
            /* eslint-disable-next-line no-underscore-dangle */
            key={service._id}
            name={service.name}
            description={service.description}
            price={service.price}
            currency={service.currency.key}
            id={service._id}
          />
        ))}
      </div>
      {hiddenElements.size === services.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
