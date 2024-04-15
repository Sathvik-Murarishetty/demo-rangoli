"use client";

import { Text, Button } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region} from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { addToCart } from "@modules/cart/actions";
import { useEffect, useState } from "react";
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
  const [pricedProduct, setPricedProduct] = useState(null);
  const countryCode = useParams().countryCode as string;
  
  useEffect(() => {
  const fetchProduct = async () => {
    const product = await retrievePricedProductById({
          id: productPreview.id,
          regionId: region.id,
        });
        if (product) {
          setPricedProduct(product);
        } else {
          setPricedProduct(null); // Set to null if product is not found
        }
      };
    
      fetchProduct();
    }, [productPreview.id, region.id]);

  const cheapestPrice = pricedProduct ? getProductPrice({
    product: pricedProduct,
    region,
  }) : null;

  const handleAddToCart = async () => {
    if (!pricedProduct || !pricedProduct.variants.length) return;
  
    setIsAdding(true);
    try {
      const variantId = pricedProduct.variants[0].id;
      await addToCart({
        variantId,
        quantity: 1,
        countryCode,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    setIsAdding(false);
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
              {cheapestPrice && (
                <div>
                  <PreviewPrice price={cheapestPrice} />
                </div>
              )}
            </div>
          </div>
          <Button
            variant="primary"
            className="w-24 h-10 self-end mt-auto"
            onClick={handleAddToCart}
            disabled={!pricedProduct || !pricedProduct.variants.length}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </LocalizedClientLink>
  );
}
