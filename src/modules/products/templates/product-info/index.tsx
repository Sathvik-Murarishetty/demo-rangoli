import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Heading, Text } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type ProductInfoProps = {
  product: PricedProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Function to get the unique text based on the collection title
  const getUniqueText = (collectionTitle: string) => {
    switch (collectionTitle) {
      case "Sweets":
        return "Per 1 lb";
      case "Beverages":
        return "Per 1 Pc";
      // Add cases for other collection titles as needed
      default:
        return ""; // Default text if collection title doesn't match any case
    }
  };

  // Get the unique text based on the collection title
  const uniqueText = product.collection
    ? getUniqueText(product.collection.title)
    : "";

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading level="h2" className="text-3xl leading-10 text-ui-fg-base">
          {product.title}
        </Heading>
        {/* Display unique text based on the collection title */}
        <Text className="text-large text-ui-fg-subtle">{uniqueText}</Text>
        <Text className="text-medium text-ui-fg-subtle">
          {product.description}
        </Text>
      </div>
    </div>
  );
};

export default ProductInfo;
