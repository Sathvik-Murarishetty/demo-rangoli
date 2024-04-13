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
    <div className="h-40vw w-screen overflow-hidden">
      <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712983839/Black_Elegant_Minimalist_Profile_LinkedIn_Banner_seha2o.png" alt="Your Image" className="w-full h-full object-cover" />
    </div>
    <div className="flex justify-center py-10">
      <div className="flex justify-between gap-4" style={{ width: '90%' }}>
      <div className="pl-5 pt-10" style={{ width: '30%' }}>
        <div className="w-full m-2">
        <div className="pb-10 pl-10">
            <h1 className="mt-4 text-3xl font-poppins-bold text-gray-800">Categories</h1>
          </div>
          <div>
            <ul className="text-xl font-poppins-bold text-gray-800 pl-5 pb-10">
              <li>Bengali Sweets</li>
              <li>Bakery</li>
              <li>Beverages</li>
              <li>Sweets</li>
              <li>Namkeen</li>
              <li>Snacks</li>
            </ul>
          </div>
          </div>
        </div>
        <div style={{ width: '70%' }}>
          <div className="flex justify-center py-10">
            <h1 className="mt-4 text-5xl font-poppins-bold text-gray-800">Our Best Sellers</h1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '95%', height: 'auto', overflow: 'hidden', marginBottom: '20px' }}>
              <a href={links[currentSlide]} rel="noopener noreferrer">
                <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
              </a>
              <div style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {[0, 1, 2, 3].map((index) => (
                <button key={index} onClick={() => goToSlide(index)} style={{ margin: '0 5px', padding: '10px', backgroundColor: currentSlide === index ? '#333' : '#ccc', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}


export default StoreTemplate
