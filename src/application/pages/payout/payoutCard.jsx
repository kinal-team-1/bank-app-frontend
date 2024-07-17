import { useParams } from "react-router-dom";
import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

// HIGHER ORDER COMPONENT
export const PayoutCard = searchable(
  ({ HighlightText, service, total, debited_account, id }) => {
    const { locale } = useParams();
    const { LL } = useLocaleService();
    // const mutation = useMutationWithToast(deleteUser, {
    //   invalidateQueries: ["payouts"],
    // });

    // useEffect(() => {
    //   if (!mutation.isError) return;

    //   setTimeout(() => {
    //     mutation.reset();
    //   }, 3000);
    // }, [mutation.isError]);

    return (
      <div className="flex flex-col justify-between border border-gray-200 rounded-md p-4 shadow-sm">
        <div className="">
          <h2 className="text-lg font-semibold">
            <h3 className="text-primary-400">
              {LL?.PAGES?.PAYOUT?.SERVICE?.()}
            </h3>
            <HighlightText>{service}</HighlightText>
          </h2>
          <p className="text-gray-500">
            <h3 className="text-primary-400">{LL?.PAGES?.PAYOUT?.TOTAL?.()}</h3>
            <HighlightText>{total}</HighlightText>
          </p>
          <div className="text-gray-500">
            <h3 className="text-primary-400">
              {LL?.PAGES?.PAYOUT?.DEBITED_ACCOUNT?.()}
            </h3>
            <span className="text-lg font-semibold text-gray-900">
              <HighlightText>{debited_account}</HighlightText>
            </span>
          </div>
        </div>
        {/* <button
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
        </button> */}
      </div>
    );
  },
);
