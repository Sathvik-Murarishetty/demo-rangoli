import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { useIntersection } from "@lib/hooks/use-in-view";
import { addToCart } from "@modules/cart/actions";
import Divider from "@modules/common/components/divider";
import { isEqual } from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
}) {
  const { countryCode } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);
  const [pricedProduct, setPricedProduct] = useState<PricedProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await retrievePricedProductById({
          id: productPreview.id,
          regionId: region.id,
        });
        setPricedProduct(product);
      } catch (error) {
        console.error("Error fetching priced product:", error);
      }
    };
    fetchData();
  }, [productPreview, region]);

  useEffect(() => {
    if (pricedProduct) {
      const hasSingleVariant = pricedProduct.variants.length === 1;
      if (hasSingleVariant) {
        setSelectedVariantId(pricedProduct.variants[0].id);
      }
    }
  }, [pricedProduct]);

  const handleAddToCart = async () => {
    if (!selectedVariantId || !countryCode) return;
    setIsAdding(true);
    await addToCart({
      variantId: selectedVariantId,
      quantity: 1,
      countryCode,
    });
    setIsAdding(false);
  };

  const hasSingleVariant = pricedProduct && pricedProduct.variants.length === 1;

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
                  {pricedProduct?.variants[0].title}
                </Text>
              )}
              <div>
                {pricedProduct && cheapestPrice && <PreviewPrice price={cheapestPrice} />}
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
