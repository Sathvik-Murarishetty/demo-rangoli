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
