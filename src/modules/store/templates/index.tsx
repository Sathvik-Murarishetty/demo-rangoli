"use client";

import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import React, { useCallback, useEffect, useState } from "react";


import PaginatedProducts from "./paginated-products"
import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"


const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

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
  const pageNumber = page ? parseInt(page) : 1

const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <div className="bg-orange-50">
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </div>
      
  )
}

export default StoreTemplate
