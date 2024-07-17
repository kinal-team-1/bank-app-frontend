import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

export const AccountCard = searchable(
  ({ HighlightText, name, currency, balance }) => {
    const { LL } = useLocaleService();

    return (
      <div className="border border-gray-200 rounded-md p-4 shadow-sm flex flex-col gap-3">
        <h2 className="text-lg font-semibold">
          <h3 className="text-primary-400">{LL?.PAGES?.ACCOUNT?.NAME?.()}</h3>
          <HighlightText>{name}</HighlightText>
        </h2>
        <h3 className="text-primary-400">{LL?.PAGES?.ACCOUNT?.BALANCE?.()}</h3>
        <div className="flex gap-5">
          <span>
            <HighlightText>{currency.key}</HighlightText>
          </span>
          <span>
            <HighlightText>{balance}</HighlightText>
          </span>
        </div>
      </div>
    );
  },
);
