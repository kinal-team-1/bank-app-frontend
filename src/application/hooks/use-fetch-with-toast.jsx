import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocaleService } from "../../services/locale";
import { useDarkModeService } from "../../services/dark-mode";
import { BankToast } from "../components/BankToast";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../types").CustomError>} UseQueryResult
 */

export function useFetchWithToast({ queryKey, queryFn }, options = {}) {
  const toastId = useRef(null);
  const { locale, LL } = useLocaleService();
  const { isDark } = useDarkModeService();
  const queryClient = useQueryClient();

  const query =
    /** @type UseQueryResult */
    (
      useQuery({
        queryKey,
        queryFn,
        ...options,
      })
    );

  const { data, error, isLoading } = query;

  // Handle loading state
  useEffect(() => {
    if (isLoading && !toastId.current) {
      toastId.current = toast.loading("Loading...", {
        theme: isDark ? "dark" : "light",
      });
    }
  }, [isLoading, toastId.current]);

  // Handle error state
  useEffect(() => {
    if (error && toastId.current) {
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
    }
  }, [error, toastId.current]);

  // Handle success state
  useEffect(() => {
    if (data && !isLoading && toastId.current) {
      const [, message, status] = data;

      if (!toastId.current) return;

      toast.update(toastId.current, {
        render: (
          <BankToast
            title={LL?.TOAST?.SUCCESS()}
            statusCode={status}
            message={[message]}
          />
        ),
        type: "success",
        isLoading: false,
        autoClose: 5000,
        theme: isDark ? "dark" : "light",
      });
    }
  }, [data, isLoading, toastId.current]);

  // Clear toast when loading finishes
  useEffect(() => {
    if (!isLoading && toastId.current) {
      toastId.current = null;
    }
  }, [isLoading, toastId.current]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      queryClient.cancelQueries({ queryKey: [queryKey, { locale }] });
    };
  }, [queryKey[0], locale]);

  return query;
}
