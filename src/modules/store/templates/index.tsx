"use client";

import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import React, { useCallback, useEffect, useState } from "react";

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
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

  return (
    <div className="bg-orange-50">
      <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sortBy || "created_at"} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  </div>
      
  )
}

export default StoreTemplate
