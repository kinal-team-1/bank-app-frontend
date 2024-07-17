import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { ProductCard } from "./ProductCard";
import { getProducts } from "../../actions/GET/get-product";

export function Products() {
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

  console.log({ products }, { hiddenElements });

  return (
    <div className="h-full flex flex-col">
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {products.map((product) => (
          <ProductCard
            onShow={() => {
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.delete(product._id); // Asegúrate de tener una propiedad única de identificación para productos (como _id)
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
