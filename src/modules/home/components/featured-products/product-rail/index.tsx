import React from 'react';
import { Region } from '@medusajs/medusa';
import { Text } from '@medusajs/ui';
import InteractiveLink from '@modules/common/components/interactive-link';
import ProductPreview from '@modules/products/components/product-preview';
import { ProductCollectionWithPreviews } from 'types/global';

export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews;
  region: Region;
}) {
  const { products } = collection;

  if (!products) {
    return null;
  }

  // Extract only the first three products from the collection
  const firstThreeProducts = products.slice(0, 3);

  return (
    <div className="content-container py-6 small:py-12">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {firstThreeProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview productPreview={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  );
}
