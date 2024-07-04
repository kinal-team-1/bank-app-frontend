import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocaleService } from "../../services/locale";
import { useDarkModeService } from "../../services/dark-mode";
import { getServices } from "../actions/GET/get-services";
import { BankToast } from "../components/BankToast";
import { ErrorContainer } from "../components/ErrorContainer";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../types").CustomError>} UseQueryResult
 */

export function Services() {
  const toastId = useRef(null);
  const { locale, LL } = useLocaleService();
  const { isDark } = useDarkModeService();

  const {
    data: [services, message, status] = [],
    error,
    isLoading,
  } = /** @type UseQueryResult */ (
    useQuery({
      queryKey: ["services", { locale }],
      queryFn: getServices,
    })
  );

  console.log(error);
  useEffect(() => {
    if (!isLoading && toastId.current) {
      toastId.current = null;
    }
  }, [isLoading]);

  if (isLoading && !toastId.current) {
    toastId.current = toast.loading("Loading...", {
      theme: isDark ? "dark" : "light",
    });
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    toast.update(toastId.current, {
      render: (
        <BankToast
          title={error.message}
          statusCode={error.statusCode}
          message={error.errors}
        />
      ),
      type: "error",
      isLoading: false,
      autoClose: 5000,
      closeButton: true,
      theme: isDark ? "dark" : "light",
    });
    return <ErrorContainer />;
  }

  toast.update(toastId.current, {
    render: (
      <BankToast
        title={LL.TOAST.SUCCESS()}
        statusCode={status}
        message={[message]}
      />
    ),
    type: "success",
    isLoading: false,
    autoClose: 5000,
    theme: isDark ? "dark" : "light",
  });

  if (!services) return null;

  if (services.length === 0) {
    return <div>No services found</div>;
  }

  return (
    <div>
      {services.map((service) => (
        // here are gonna be the cards rendered
        <div>Hey</div>
      ))}
    </div>
  );
}
