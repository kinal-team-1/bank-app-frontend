import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

export const ProductCard = searchable(
  ({ HighlightText, name, description, price, currency, stock }) => {
    const { LL } = useLocaleService();

    return (
      <div className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          <span className="text-primary-400">
            {LL?.PAGES?.PRODUCT?.NAME?.()}
          </span>{" "}
          <HighlightText className="text-gray-900">{name}</HighlightText>
        </h2>
        <p className="text-gray-700 mb-4">
          <span className="text-primary-400">
            {LL?.PAGES?.PRODUCT?.DESCRIPTION?.()}
          </span>{" "}
          <HighlightText className="text-gray-900">{description}</HighlightText>
        </p>
        <div className="text-gray-700 mb-4">
          <span className="text-primary-400">
            {LL?.PAGES?.PRODUCT?.PRICE?.()}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900">
              {currency}
            </span>
            <span className="text-xl font-bold text-gray-900">
              <HighlightText>{price}</HighlightText>
            </span>
          </div>
        </div>
        <div className="text-gray-700">
          <span className="text-primary-400">
            {LL?.PAGES?.PRODUCT?.STOCK?.()}
          </span>{" "}
          <span className="text-lg font-semibold text-gray-900">
            <HighlightText>{stock}</HighlightText>
          </span>
        </div>
      </div>
    );
  },
);
