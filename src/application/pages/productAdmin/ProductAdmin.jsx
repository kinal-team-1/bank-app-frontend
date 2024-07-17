import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"; // Importa Link
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { ProductAdminCard } from "./ProductAdminCard";
import { getProducts } from "../../actions/GET/get-product";

export function ProductsAdmin() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { locale } = useParams();
  const [params] = useSearchParams();

  const {
    data: [products] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: ["products", { locale, params }],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!products) return null;

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="py-2 flex justify-end md:px-4">
        <Link
          to="./create"
          className="px-4 py-2 bg-primary-400 rounded text-white hover:bg-primary-300"
        >
          Crear
        </Link>
      </div>
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {products.map((product) => (
          <ProductAdminCard
            onShow={() => {
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.delete(product._id);
                return new Set(prev);
              });
            }}
            onHide={() =>
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.add(product._id);
                return new Set(prev);
              })
            }
            /* eslint-disable-next-line no-underscore-dangle */
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            currency={product.currency}
            stock={product.stock}
            // eslint-disable-next-line no-underscore-dangle
            id={product._id}
          />
        ))}
      </div>
      {hiddenElements.size === products.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
