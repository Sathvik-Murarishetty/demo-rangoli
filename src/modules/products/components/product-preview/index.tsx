"use client";

import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
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

  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {

    setIsAdding(true)

    await addToCart({
      variantId: variants[0].id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
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
              View Item
            </Button>
          )}
          {hasSingleVariant && (
            <Button variant="primary" className="w-24 h-10 self-end mt-auto">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  );
}


