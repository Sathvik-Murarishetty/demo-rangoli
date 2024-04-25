import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"
import { Product } from "@medusajs/medusa"
import { Metadata } from "next"
import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react";
import BestSellers from "@modules/home/components/best-sellers";

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 6)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {

  const images = [
    'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712633012/WhatsApp_Image_2024-04-09_at_08.52.50_jslmza.jpg',
    'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712633012/WhatsApp_Image_2024-04-09_at_08.52.17_1_oczoxz.jpg',
    'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712633013/WhatsApp_Image_2024-04-09_at_08.52.16_tkxkq0.jpg',
    'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712633012/WhatsApp_Image_2024-04-09_at_08.52.17_wapqmc.jpg'
  ];

  const links = [
    '/products/mysore-pak',
    '/products/motichoor',
    '/products/kalakand',
    '/products/kaju-katlii'
  ];

  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <div className="bg-orange-50">
      <div className="h-40vw w-screen overflow-hidden">
        <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712983839/Black_Elegant_Minimalist_Profile_LinkedIn_Banner_seha2o.png" alt="Your Image" className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-center py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row" style={{ width: '90%' }}>
          <div className="pl-5 pt-10" style={{ width: '30%' }}>
            <div className="w-full m-2 sticky top-0">
              <div className="pb-10 pl-5">
                <h1 className="mt-4 text-3xl font-poppins-bold text-gray-800">Categories</h1>
              </div>
              <div>
                <ul className="text-xl font-poppins-bold text-gray-800 pl-5 pb-10">
                  <li><a href="/collections/sweets">Sweets</a></li>
                  <li><a href="/collections/snacks">Snacks</a></li>
                  <li><a href="/collections/bengali-sweets">Bengali Sweets</a></li>
                  <li><a href="/collections/bakery">Bakery</a></li>
                  <li><a href="/collections/namkeen">Namkeen</a></li>
                  <li><a href="/collections/beverages">Beverages</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="custom-div">
            <div className="flex justify-center py-10">
              <h1 className="mt-4 text-5xl font-poppins-bold text-gray-800">Our Best Sellers</h1>
            </div>
            <BestSellers />
            <div>
              <ul className="flex flex-col gap-x-6">
                <FeaturedProducts collections={collections} region={region} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
