import React from "react";
import { PricedProduct, PricedVariant } from "@medusajs/medusa/dist/types/pricing";
import { clx } from "@medusajs/ui";
import { getProductPrice } from "@lib/util/get-product-price";
import { RegionInfo } from "types/global";

type ProductPriceProps = {
  product: PricedProduct;
  variant?: PricedVariant;
  region: RegionInfo;
  collectionId: string; // New prop for collection ID
};

const ProductPrice: React.FC<ProductPriceProps> = ({
  product,
  variant,
  region,
  collectionId,
}) => {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    region,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />;
  }

  // Customized display text based on collection_id
  let displayText = "";
  switch (collectionId) {
    case "pcol_01HV5H5JKVNH4VDBV81N71ZF8M":
      displayText = "per 1 lb";
      break;
    case "collection_id_2":
      displayText = "Custom text for Collection ID 2";
      break;
    // Add cases for other collection IDs as needed
    default:
      displayText = "nopeee"; // No custom text for other collection IDs
      break;
  }

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx("text-xl-semi", {
          "text-ui-fg-interactive": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && "From "}
        {selectedPrice.calculated_price}
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span className="line-through">
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-ui-fg-interactive">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
      {/* Render customized text based on collection_id */}
      {displayText && <span>{displayText}</span>}
    </div>
  );
};

export default ProductPrice;
