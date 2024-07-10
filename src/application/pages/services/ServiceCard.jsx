import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { useAuthService } from "../../../services/auth";
import { createPayout } from "../../actions/POST/create-puchase";

// HIGHER ORDER COMPONENT
export const ServiceCard = searchable(
  ({ HighlightText, name, description, price, currency, id }) => {
    const { locale } = useParams();
    const { LL } = useLocaleService();
    const { user: userLogged } = useAuthService();
    const mutation = useMutationWithToast(createPayout, {
      invalidateQueries: ["services"],
    });

    useEffect(() => {
      if (!mutation.isError || mutation.isSuccess) return;

      setTimeout(() => {
        mutation.reset();
      }, 3000);
    }, [mutation.isSuccess, mutation.isError]);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!mutation.isIdle) return;

          mutation.mutate({
            payout: {
              service: id,
              total: price,
              debited_account: userLogged.main_account,
            },
            locale,
          });
        }}
        className="border border-gray-200 rounded-md p-4 shadow-sm"
      >
        <h2 className="text-lg font-semibold">
          <h3 className="text-primary-400">{LL?.PAGES?.SERVICE?.NAME?.()}</h3>
          <HighlightText>{name}</HighlightText>
        </h2>
        <p className="text-gray-500">
          <h3 className="text-primary-400">
            {LL?.PAGES?.SERVICE?.DESCRIPTION?.()}
          </h3>
          <HighlightText>{description}</HighlightText>
        </p>
        <p className="text-gray-500">
          <h3 className="text-primary-400">{LL?.PAGES?.SERVICE?.PRICE?.()}</h3>
          <div className="flex gap-2">
            <span>{currency.key}</span>
            <span>
              <HighlightText>{price}</HighlightText>
            </span>
          </div>
        </p>
        <button
          type="submit"
          className={`${mutation.isIdle ? "bg-green-500" : "bg-green-300"} w-full rounded py-2 items-end hover:bg-green-300`}
        >
          {mutation.isIdle && <span>Comprar</span>}
          {mutation.isPending && (
            <>
              <span>Comprando</span>
              <span className="animate-spin size-[25px] border-4 border-t-silver-500 rounded-full" />
            </>
          )}
          {mutation.isError && <span>Error</span>}
        </button>
      </form>
    );
  },
);
