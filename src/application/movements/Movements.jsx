import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { getServices } from "../actions/GET/get-services";
import { BankToast } from "../components/BankToast";

export function Movements() {
  const toastId = useRef(null);

  const {
    data: [services, message] = [],
    error,
    isLoading,
  } = /** @type {import("@tanstack/react-query").UseQueryResult<any, import("../../types").CustomError>} */ (
    useQuery({
      queryKey: ["services"],
      queryFn: getServices,
    })
  );

  useEffect(() => {
    if (!isLoading && toastId.current) {
      toastId.current = null;
    }
  }, [isLoading]);

  if (isLoading && !toastId.current) {
    toastId.current = toast.loading("Loading...");
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
    });
    return (
      <div className="justify-center text-4xl items-center">
        Ups! algo mal ha sucedido
      </div>
    );
  }

  toast.update(toastId.current, {
    render: <BankToast title="Success" statusCode={200} message={[message]} />,
    type: "success",
    isLoading: false,
    autoClose: 5000,
  });

  return (
    <div>
      <h1>Movements</h1>
    </div>
  );
}
