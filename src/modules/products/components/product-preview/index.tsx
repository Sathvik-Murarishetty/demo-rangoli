import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [variant, setVariant] = useState<any>(null);
  const [inStock, setInStock] = useState<boolean>(false);
  const countryCode = useParams().countryCode as string;

  useEffect(() => {
    // Perform any necessary initialization here
  }, []);

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null;

    setIsAdding(true);

    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode,
    });

    setIsAdding(false);
  };

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
      <div>
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="square"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle">{productPreview.title}</Text>
          <div className="flex items-center gap-x-2">
            {/* Render price component here if needed */}
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!inStock || !variant}
            variant="primary"
            className="w-full h-10"
            isLoading={isAdding}
          >
            {!variant
              ? "Select variant"
              : !inStock
              ? "Out of stock"
              : "Add to cart"}
          </Button>
        </div>
      </div>
    </LocalizedClientLink>
  );
}
