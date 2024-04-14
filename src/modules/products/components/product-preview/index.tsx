import React, { useState, useEffect } from "react";
import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { addToCart } from "@modules/cart/actions";
import { useParams } from "next/navigation";

export default function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [pricedProduct, setPricedProduct] = useState<any>(null);
  const [cheapestPrice, setCheapestPrice] = useState<any>(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [addToCartError, setAddToCartError] = useState("");

  const countryCode = useParams().countryCode as string;

  const handleAddToCart = async () => {
    if (pricedProduct && pricedProduct.variants.length === 1) {
      const variant = pricedProduct.variants[0];
      setIsAdding(true);

      try {
        await addToCart({
          variantId: variant.id,
          quantity: 1,
          countryCode,
        });
      } catch (error) {
        setAddToCartError("Error adding item to cart");
      } finally {
        setIsAdding(false);
      }
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      const fetchData = async () => {
        const fetchedProduct = await retrievePricedProductById({
          id: productPreview.id,
          regionId: region.id,
        });

        if (fetchedProduct) {
          const { cheapestPrice } = getProductPrice({
            product: fetchedProduct,
            region,
          });

          setPricedProduct(fetchedProduct);
          setCheapestPrice(cheapestPrice);
          setDataFetched(true);
        }
      };

      fetchData();
    }
  }, [productPreview, region, dataFetched]);

  if (!pricedProduct) {
    return null;
  }

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
      <div className="border rounded shadow p-2 flex flex-col h-full">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="square"
          isFeatured={isFeatured}
        />
        <div className="flex-grow flex justify-between flex-col">
          <div className="flex txt-compact-medium mt-4 justify-between flex-col">
            <Text className="text-ui-fg-subtle text-large">
              {productPreview.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {pricedProduct.variants.length === 1 && (
                <Text className="text-gray-600">
                  {pricedProduct.variants[0].title}
                </Text>
              )}
              <div>
                {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
              </div>
            </div>
          </div>
          {pricedProduct.variants.length !== 1 && (
            <Button variant="primary" className="w-24 h-10 self-end mt-auto">
              View Item
            </Button>
          )}
          {pricedProduct.variants.length === 1 && (
            <Button
              variant="primary"
              className="w-24 h-10 self-end mt-auto"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>
          )}
          {addToCartError && (
            <div className="text-red-500 mt-2">{addToCartError}</div>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  );
}
