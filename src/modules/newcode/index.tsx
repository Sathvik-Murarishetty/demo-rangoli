"use client";

import { Button, Heading } from "@medusajs/ui";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import AchievementsSection from "../achievements";

const slides = [
  {
    image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712929268/1_slykie.png',
  },
  {
    image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712929265/2_ihqatn.png',
  },
  {
    image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712929266/3_yktgl9.png',
  },
  {
    image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712929266/4_bfvqjf.png',
  },
];


const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])
  
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
<div className="w-full relative">
  <div className='embla mx-auto relative'>
    <div className='embla__viewport' ref={emblaRef}>
      <div className='embla__container h-full'>
        {slides.map((slide, index) => (
          <div className='embla__slide flex flex-col items-center justify-center' key={index}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
    <div className='absolute top-1/2 transform -translate-y-1/2 left-0 ml-4'>
      <ChevronLeft size={48} onClick={scrollPrev} color="grey" />
    </div>
    <div className='absolute top-1/2 transform -translate-y-1/2 right-0 mr-4'>
      <ChevronRight size={48} onClick={scrollNext} color="grey" />
    </div>
  </div>
</div>

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
  
  <div className="flex justify-center py-20">
    <div className="max-w-6xl w-full px-4">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm uppercase font-cormorant-garamond-bold tracking-wider text-gray-500">• Our Story •</h3>
          <h1 className="mt-4 text-5xl font-cormorant-garamond-bold text-gray-800">The Legacy Of Rangoli Sweets</h1>
          <p className="mt-6 text-lg text-gray-700">
            When opening Rangoli, we set out to create an elegant Indian restaurant that offered artistic, creative versions of Northern and coastal Indian dishes. Our name, “Rangoli,” is drawn from a popular Indian style of art featuring patterns and designs in rich, jewel-like colors.
            <br />
            Our restaurant is decorated in these vibrant hues, with Sanskrit script gracing the walls. Our interior welcomes you with private dining alcoves and fresh orchids on each table. Our attentive, gracious service invites you to linger and enjoy your dining experience.
          </p>
        </div>
        <div className="flex items-center">
          <img
            alt="The process of making sweets"
            className="w-full h-auto object-cover"
            height="400"
            src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1711692061/rangoli_awydsf.jpg"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
        </div>
      </div>
    </div>
  </div>

  <AchievementsSection />

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: '70%', height: 'auto', overflow: 'hidden' }}>
        <img src={"https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712420326/line_01_aqnpm4.png"} alt="------" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
<div className="flex justify-center py-10">
    <h1 className="mt-4 text-5xl font-cormorant-garamond-bold text-gray-800">Shop by Category</h1>
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

<div className="flex justify-center">
  <div className="p-10 rounded-xl">
    <iframe
      src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25372.200567792454!2d-121.99970499999999!3d37.353751!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5f0a2e0bd7d%3A0x5b6ae1a6d05d2ce2!2sRangoli%20Sweets!5e0!3m2!1sen!2sus!4v1712841261125!5m2!1sen!2sus"}
      width="900" // Setting width to 70%
      height="300" // You can adjust the height as needed
      style={{ border: "0" }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

  
</div>
  )
}

export default Hero;
