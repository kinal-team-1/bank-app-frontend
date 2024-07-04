import { useParams } from "react-router-dom";
import { getServices } from "../actions/GET/get-services";
import { ErrorContainer } from "../components/ErrorContainer";
import { useFetchWithToast } from "../hooks/use-fetch-with-toast";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../types").CustomError>} UseQueryResult
 */

export function Services() {
  const { locale } = useParams();
  const {
    data: [services] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: ["services", { locale }],
    queryFn: getServices,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!services) return null;

  if (services.length === 0) {
    return <div>No services found</div>;
  }

  return (
    <div>
      {services.map(() => (
        // here are gonna be the cards rendered
        <div>Hey</div>
      ))}
    </div>
  );
}
