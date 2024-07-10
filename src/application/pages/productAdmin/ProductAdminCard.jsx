import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { deleteByProductId } from "../../actions/DELETE/delete-product-by-id";

export const ProductAdminCard = searchable(
  ({ HighlightText, name, description, price, currency, stock, id }) => {
    const { locale } = useParams();
    const { LL } = useLocaleService();
    const mutation = useMutationWithToast(deleteByProductId, {
      invalidateQueries: ["products"],
    });

    useEffect(() => {
      if (!mutation.isError) return;

      setTimeout(() => {
        mutation.reset();
      }, 3000);
    }, [mutation.isError]);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!mutation.isIdle) return;

          mutation.mutate({ productId: id, locale });
        }}
        className="flex flex-col justify-between border border-gray-200 rounded-md p-4 shadow-sm"
      >
        <div className="">
          <h2 className="text-lg font-semibold">
            <h3 className="text-primary-400">{LL?.PAGES?.PRODUCT?.NAME?.()}</h3>
            <HighlightText>{name}</HighlightText>
          </h2>
          <p className="text-gray-500">
            <h3 className="text-primary-400">
              {LL?.PAGES?.PRODUCT?.DESCRIPTION?.()}
            </h3>
            <HighlightText>{description}</HighlightText>
          </p>
          <div className="text-gray-500">
            <h3 className="text-primary-400">
              {LL?.PAGES?.PRODUCT?.PRICE?.()}
            </h3>
            <div className="flex gap-2">
              <span className="text-lg font-semibold text-gray-900">
                {currency}
              </span>
              <span className="text-xl font-bold text-gray-900">
                <HighlightText>{price}</HighlightText>
              </span>
            </div>
          </div>
          <div className="text-gray-500">
            <h3 className="text-primary-400">
              {LL?.PAGES?.PRODUCT?.STOCK?.()}
            </h3>
            <span className="text-lg font-semibold text-gray-900">
              <HighlightText>{stock}</HighlightText>
            </span>
          </div>
        </div>
        <button
          type="submit"
          className={`${mutation.isIdle ? "bg-primary-400" : "bg-primary-300"} w-full rounded py-2 items-end hover:bg-primary-300`}
        >
          {mutation.isIdle && <span>Eliminar</span>}
          {mutation.isPending && (
            <>
              <span>Eliminando ...</span>
              <span className="animate-spin size-[25px] border-4 border-t-silver-500 rounded-full" />
            </>
          )}
          {mutation.isError && <span>Error</span>}
        </button>
      </form>
    );
  },
);
