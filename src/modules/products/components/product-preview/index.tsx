"use client";

import { useState, useEffect } from "react";
import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { addToCart } from "@modules/cart/actions";

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

  const handleAddToCart = async () => {
    if (pricedProduct && pricedProduct.variants.length === 1) {
      const variant = pricedProduct.variants[0];
      setIsAdding(true);

      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode,
      });

      setIsAdding(false);
    }
  };

  useEffect(() => {
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
      }
    };

    fetchData();
  }, [productPreview, region]);

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
            <Button
              variant="primary"
              className="w-24 h-10 self-end mt-auto"
            >
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
        </div>
      </div>
    </LocalizedClientLink>
  );
}
