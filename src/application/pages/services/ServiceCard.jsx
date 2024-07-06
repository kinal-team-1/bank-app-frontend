import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

// HIGHER ORDER COMPONENT
export const ServiceCard = searchable(
  ({ HighlightText, name, description, price, currency }) => {
    const { LL } = useLocaleService();

    return (
      <div className="border border-gray-200 rounded-md p-4 shadow-sm">
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
            <span>{currency}</span>
            <span>
              <HighlightText>{price}</HighlightText>
            </span>
          </div>
        </p>
      </div>
    );
  },
);
