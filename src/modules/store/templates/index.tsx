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
<h1 className="mt-4 text-5xl font-cormorant-garamond-bold text-gray-800">Categories</h1>
</div>
<section style={{ position: 'relative', width: '80%', height: 'auto', overflow: 'hidden', marginBottom: '20px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-80 mx-auto md:w-full">
<div className="relative aspect-w-1 aspect-h-1">
<a href="/collections/sweets">
<img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431826/istockphoto-1054228718-612x612_uumpun.jpg" alt="Sweets" className="w-full h-full object-cover rounded-md shadow-md" />
</a>
<p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Sweets</p>
</div>
<div className="relative aspect-w-1 aspect-h-1">
<a href="/collections/tea-time-snacks">
<img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431983/istockphoto-1225269816-612x612_nlbybj.jpg" alt="Snacks" className="w-full h-full object-cover rounded-md shadow-md" />
</a>
<p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Snacks</p>
</div>
<div className="relative aspect-w-1 aspect-h-1">
<a href="/collections/namkeen">
<img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712432028/spicy_cashew_tr4vej.jpg" alt="Namkeen" className="w-full h-full object-cover rounded-md shadow-md" />
</a>
<p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Namkeen</p>
</div>
<div className="relative aspect-w-1 aspect-h-1">
<a href="/collections/cakes">
<img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431886/cake-1971552_1280_a35lgw.jpg" alt="Cakes" className="w-full h-full object-cover rounded-md shadow-md" />
</a>
<p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Cakes</p>
</div>
<div className="relative aspect-w-1 aspect-h-1">
<a href="/collections/beverages">
<img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431927/pexels-photo-14509267_g7s4u7.jpg" alt="Beverages" className="w-full h-full object-cover rounded-md shadow-md" />
</a>
<p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Beverages</p>
</div>
<div className="relative aspect-w-1 aspect-h-1">
<a href="/collections/bengali-sweets">
<img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712805976/1200-by-1200-images_bbrzf4.jpg" alt="Bengali Sweets" className="w-full h-full object-cover rounded-md shadow-md" />
</a>
<p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Bengali Sweets</p>
</div>
</div>
</section>
<div className="py-10">
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
<div style={{ position: 'relative', width: '70%', height: 'auto', overflow: 'hidden' }}>
<img src={"https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712420326/line_01_aqnpm4.png"} alt="------" style={{ width: '100%', height: '100%' }} />
</div>
</div>
<div className="flex justify-center py-10">
<h1 className="mt-4 text-5xl font-cormorant-garamond-bold text-gray-800">Our Best Sellers</h1>
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
<div style={{ position: 'relative', width: '80%', height: 'auto', overflow: 'hidden', marginBottom: '20px' }}>
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
      
  )
}

export default StoreTemplate
