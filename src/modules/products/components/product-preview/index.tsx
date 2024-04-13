import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";

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

  const handleAddToCart = () => {
    // Handle adding product to the cart here
    console.log("Product added to cart:", productPreview.title);
  };

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
      <div className="border rounded shadow p-2">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="square"
          isFeatured={isFeatured}
        />
        <div className="flex justify-between">
          <div className="flex txt-compact-medium mt-4 justify-between flex-col">
            <Text className="text-ui-fg-subtle text-large">
              {productPreview.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            variant="primary"
            className="w-full h-10"
            isLoading={false} // You need to set isLoading to true when adding to cart
          >
            Cart
          </Button>
        </div>
      </div>
    </LocalizedClientLink>
  );
}
