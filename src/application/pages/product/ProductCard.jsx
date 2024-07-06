import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

// HIGHER ORDER COMPONENT
export const ProductCard = searchable(
  ({ HighlightText, name, description, price, currency }) => {
    const { LL } = useLocaleService();

    return (
      <div className="border border-gray-200 rounded-md p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          <span className="text-primary-400">
            {LL?.PAGES?.PRODUCT?.NAME?.()}
          </span>
          <HighlightText>{name}</HighlightText>
        </h2>
        <p className="text-gray-500">
          <span className="text-primary-400">
            {LL?.PAGES?.PRODUCT?.DESCRIPTION?.()}
          </span>
          <HighlightText>{description}</HighlightText>
        </p>
        <p className="text-gray-500">
          <span className="text-primary-400">
            {LL?.PAGES?.PRODUCT?.PRICE?.()}
          </span>
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
