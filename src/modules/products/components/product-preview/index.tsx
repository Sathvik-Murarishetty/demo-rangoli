"use client"

import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product);

  if (!pricedProduct) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  });

  const hasSingleVariant = pricedProduct.variants.length === 1;

  const [isAdding, setIsAdding] = useState(false); // State for handling loading state of "Add to Cart" button
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined); // State for storing the selected variant ID

  const handleAddToCart = async () => {
    if (!selectedVariantId) return null; // Check if a variant is selected

    setIsAdding(true); // Set loading state to true

    // Add the selected variant to the cart
    await addToCart({
      variantId: selectedVariantId,
      quantity: 1,
      countryCode: region.countryCode,
    });

    setIsAdding(false); // Set loading state back to false
  };

  useEffect(() => {
    // If there's only one variant, select it automatically
    if (hasSingleVariant) {
      setSelectedVariantId(pricedProduct.variants[0].id);
    }
  }, [hasSingleVariant, pricedProduct.variants]);

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
            <Button
              variant="primary"
              className="w-24 h-10 self-end mt-auto"
            >
              View
            </Button>
          )}
          {hasSingleVariant && (
            <Button
              variant="primary"
              className="w-24 h-10 self-end mt-auto"
              onClick={handleAddToCart}
              isLoading={isAdding}
            >
              Cart
            </Button>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  );
}
