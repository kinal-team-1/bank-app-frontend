import { Link } from "react-router-dom";
import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

export const PurchaseCard = searchable(
  ({ HighlightText, purchaser, productName, quantity, total, currency, id }) => {
    const { LL } = useLocaleService();

    return (
      <div className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          <span className="text-primary-400">
            {LL?.PAGES?.PURCHASE?.PURCHASER?.()}
          </span>{" "}
          <HighlightText className="text-gray-900">{purchaser}</HighlightText>
        </h2>
        <p className="text-gray-700 mb-4">
          <span className="text-primary-400">
            {LL?.PAGES?.PURCHASE?.PRODUCT?.()}
          </span>{" "}
          <HighlightText className="text-gray-900">{productName}</HighlightText>
        </p>
        <div className="text-gray-700 mb-4">
          <span className="text-primary-400">
            {LL?.PAGES?.PURCHASE?.QUANTITY?.()}
          </span>{" "}
          <span className="text-lg font-semibold text-gray-900">
            <HighlightText>{quantity}</HighlightText>
          </span>
        </div>
        <div className="text-gray-700 mb-4">
          <span className="text-primary-400">
            {LL?.PAGES?.PURCHASE?.TOTAL?.()}
          </span>{" "}
          <span className="text-lg font-semibold text-gray-900">
            <HighlightText>{total}</HighlightText> {currency}
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to={`./${id}`} // Asegúrate de ajustar la ruta adecuada para la compra
            className="w-full px-4 py-2 bg-green-500 rounded text-white hover:bg-green-400 transition-colors duration-200 text-center"
          >
            {LL?.PAGES?.PURCHASE?.BUY_NOW?.()}
          </Link>
        </div>
      </div>
    );
  },
);
