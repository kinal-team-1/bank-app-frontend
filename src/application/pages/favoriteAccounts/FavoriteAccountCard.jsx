import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

// HIGHER ORDER COMPONENT
export const FavoriteAccountCard = searchable(
  ({ HighlightText, account, alias }) => {
    const { LL } = useLocaleService();

    return (
      <div className="border border-gray-200 rounded-md p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          <h3 className="text-primary-400">
            {LL?.PAGES?.FAVORITE_ACCOUNT?.ALIAS?.()}
          </h3>
          <HighlightText>{alias}</HighlightText>
        </h2>
        <p className="text-gray-500">
          <h3 className="text-primary-400">
            {LL?.PAGES?.FAVORITE_ACCOUNT?.ACCOUNT?.()}
          </h3>
          <HighlightText>{account.name}</HighlightText>
        </p>
      </div>
    );
  },
);
