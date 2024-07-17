import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"; // Importa Link
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { ServicesAdminCard } from "./ServiceAdminCard";
import { getServices } from "../../actions/GET/get-services";

export function ServicesAdmin() {
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
      <div className="py-2 flex justify-end md:px-4">
        <Link
          to="./create"
          className="px-4 py-2 bg-primary-400 rounded text-white hover:bg-primary-300"
        >
          Crear
        </Link>
      </div>
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {services.map((service) => (
          <ServicesAdminCard
            onShow={() => {
              setHiddenElements((prev) => {
                prev.delete(service.id);
                return new Set(prev);
              });
            }}
            onHide={() =>
              setHiddenElements((prev) => {
                prev.add(service.id);
                return new Set(prev);
              })
            }
            // eslint-disable-next-line no-underscore-dangle
            key={service._id}
            name={service.name}
            description={service.description}
            price={service.price}
            currency={service.currency}
            // eslint-disable-next-line no-underscore-dangle
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
