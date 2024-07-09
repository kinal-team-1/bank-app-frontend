import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useLocaleService } from "../../services/locale";
import { useDarkModeService } from "../../services/dark-mode";
import { BankToast } from "../components/BankToast";

/**
 * @typedef {import("@tanstack/react-query").UseMutationResult<any, import("../../types").CustomError, any>} UseMutationResult
 */

export function useMutationWithToast(mutationFn, options = {}) {
  const toastId = useRef(null);
  const { LL } = useLocaleService();
  const { isDark } = useDarkModeService();
  const queryClient = useQueryClient();

  const mutation =
    /** @type UseMutationResult */
    (
      useMutation({
        mutationFn,
        ...options,
        onMutate: (variables) => {
          toastId.current = toast.loading("Loading...", {
            theme: isDark ? "dark" : "light",
          });

          if (options.onMutate) {
            options.onMutate(variables);
          }
        },
        onError: (error, variables, context) => {
          if (toastId.current) {
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

          if (options.onError) {
            options.onError(error, variables, context);
          }
        },
        onSuccess: (data, variables, context) => {
          if (toastId.current) {
            const [, message, status] = data;

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

          if (options.onSuccess) {
            options.onSuccess(data, variables, context);
          }

          // Optionally invalidate queries here or do other side effects
          if (options.invalidateQueries) {
            queryClient.invalidateQueries({
              queryKey: options.invalidateQueries,
            });
          }
        },
        onSettled: (data, error, variables, context) => {
          if (!toastId.current) return;

          if (toastId.current) {
            toastId.current = null;
          }

          if (options.onSettled) {
            options.onSettled(data, error, variables, context);
          }
        },
      })
    );

  return mutation;
}
