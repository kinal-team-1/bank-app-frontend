import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UISelect } from "../../components/UI/Select";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { useLocaleService } from "../../../services/locale";
import { getCurrencies } from "../../actions/GET/get-currencies";
import { BankToast } from "../../components/BankToast";
import { useDarkModeService } from "../../../services/dark-mode";
import { createTransaction } from "../../actions/POST/post-transaction";

/**
 * @typedef {import("@tanstack/react-query").UseQueryResult<any, import("../../../types").CustomError>} UseQueryResult
 */

export function TransactionForm(){
  const { isDark } = useDarkModeService();
  const { locale } = useLocaleService();
  const selectedCurrency = useRef(null);
  const [form, setForm] = useState({
    account: "",
    currency: "",
    amount: "",
    type: "",
  });

  const { data: [currencies] = [], isLoading, isError, error } =
    /** @type UseQueryResult */
    (
      useQuery({
        queryKey: ["currencies"],
        queryFn: getCurrencies,
      })
    );

  if (isError) {
    toast.error(
      <BankToast
        title={error.message}
        statusCode={error.statusCode}
        message={error.errors}
      />,
      {
        autoClose: 5000,
        closeButton: true,
        theme: isDark ? "dark" : "light",
      },
    );
  }

  const mutation = useMutationWithToast(createTransaction, {
    invalidateQueries: ["transactions"],
  });

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    // wait 3 seconds before being able to submit again
    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  useEffect(() => {
    if (!mutation.isSuccess) return;
    setForm({
      account: "",
      currency: "",
      amount: "",
      type: "",
    });
    selectedCurrency.current = null;
  }, [mutation.isSuccess]);

  return (

  );
}
