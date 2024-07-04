import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocaleService } from "../../services/locale";
import { useDarkModeService } from "../../services/dark-mode";
import { getServices } from "../actions/GET/get-services";
import { BankToast } from "../components/BankToast";

export function Services() {
  const toastId = useRef(null);
  const { locale } = useLocaleService();
  const { isDark } = useDarkModeService();

  const {
    data: [services, message] = [],
    error,
    isLoading,
  } = /** @type {import("@tanstack/react-query").UseQueryResult<any, import("../../types").CustomError>} */ (
    useQuery({
      queryKey: ["services", { locale }],
      queryFn: getServices,
    })
  );

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
    return (
      <div className="flex justify-center text-4xl items-center w-full h-full">
        Ups! algo mal ha sucedido
      </div>
    );
  }

  toast.update(toastId.current, {
    render: <BankToast title="Success" statusCode={200} message={[message]} />,
    type: "success",
    isLoading: false,
    autoClose: 5000,
    theme: isDark ? "dark" : "light",
  });

  return (
    <div>
      <h1>Movements</h1>
    </div>
  );
}
