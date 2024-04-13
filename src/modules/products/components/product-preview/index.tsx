import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
    <div className="shadow-lg p-3 rounded-lg bg-white">
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
<div className="flex txt-compact-medium mt-4 justify-between flex-col">
  <Text className="text-ui-fg-subtle text-large">{productPreview.title}</Text>
  <div className="flex items-center gap-x-2">
    {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
  </div>
</div>
      </LocalizedClientLink>
    </div>
      </div>
  )
}
