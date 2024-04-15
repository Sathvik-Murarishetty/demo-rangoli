"use client";

import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region, PricedProduct } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { addToCart } from "@modules/cart/actions"
import { useEffect, useState } from "react"

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
  const [pricedProduct, setPricedProduct] = useState<PricedProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await retrievePricedProductById({
        id: productPreview.id,
        regionId: region.id,
      });
      setPricedProduct(product);
    };

    fetchProduct();
  }, [productPreview.id, region.id]);

  const handleAddToCart = async () => {
    if (!pricedProduct || !pricedProduct.variants.length) return;

    setIsAdding(true);
    try {
      // Assuming you want to add the first variant to the cart
      await addToCart({
        variantId: pricedProduct.variants[0].id,
        quantity: 1,
        countryCode: region.country_code,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    setIsAdding(false);
  }

  if (!pricedProduct) {
    return null;
  }

  const cheapestPrice = getProductPrice({
    product: pricedProduct,
    region,
  });

  const hasSingleVariant = pricedProduct.variants.length === 1;

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
              {hasSingleVariant && (
                <Text className="text-gray-600">
                  {pricedProduct.variants[0].title}
                </Text>
              )}
              <div>
                {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
              </div>
            </div>
          </div>
          {!hasSingleVariant && (
            <Button variant="primary" className="w-24 h-10 self-end mt-auto">
              View Item
            </Button>
          )}
          {hasSingleVariant && (
            <Button variant="primary" className="w-24 h-10 self-end mt-auto" onClick={handleAddToCart}>
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  );
}
