import { Link, useParams } from "react-router-dom"; // Importa Link
import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { ErrorContainer } from "../../components/ErrorContainer";
import { getProductById } from "../../actions/GET/get-product-by-id";

export function ComprarProducto() {
  const { id: productId, locale } = useParams();

  const {
    data: [product] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: ["product", { productId, locale }],
    queryFn: getProductById,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!product) return null;

  console.log({ product });

  const { LL } = useLocaleService();

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        <span className="text-primary-400">{LL?.PAGES?.PRODUCT?.NAME?.()}</span>{" "}
        <span className="text-gray-900">{product.name}</span>
      </h2>
      <p className="text-gray-700 mb-4">
        <span className="text-primary-400">
          {LL?.PAGES?.PRODUCT?.DESCRIPTION?.()}
        </span>{" "}
        <span className="text-gray-900">{product.description}</span>
      </p>
      <div className="text-gray-700 mb-4">
        <span className="text-primary-400">
          {LL?.PAGES?.PRODUCT?.PRICE?.()}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900">
            {product.currency}
          </span>
          <span className="text-xl font-bold text-gray-900">
            <span>{product.price}</span>
          </span>
        </div>
      </div>
      <div className="text-gray-700">
        <span className="text-primary-400">
          {LL?.PAGES?.PRODUCT?.STOCK?.()}
        </span>{" "}
        <span className="text-lg font-semibold text-gray-900">
          <span>{product.stock}</span>
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          to={`./comprar/${productId}`} // Aquí se define la ruta de compra
          className="w-full px-4 py-2 bg-green-500 rounded text-white hover:bg-green-400 transition-colors duration-200 text-center"
        >
          Comprar
        </Link>
      </div>
    </div>
  );
}
