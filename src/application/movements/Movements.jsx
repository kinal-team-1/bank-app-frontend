import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import "react-toastify/dist/ReactToastify.css";

export function Movements() {
  const {
    data: {
      data: transactions,
      message,
      errors,
      isControlledError,
      status,
    } = {},
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/service?limit=-1`);
      const value = await response.json();
      console.log(value);

      if (!response.ok && response.status < 500) {
        return { ...value, isControlledError: true, status: response.status };
      }

      return value;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isControlledError) {
    if (status === 400) {
      toast(errors.join("\n"), { type: "error", toastId: "service-error" });
    }

    return null;
  }

  return (
    <div>
      <h1>Movements</h1>
    </div>
  );
}
