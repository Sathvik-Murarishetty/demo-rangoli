"use client";

import { Button, Heading } from "@medusajs/ui";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Delicious Dinners",
    value: "5245",
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Experienced Chef",
    value: "60",
  },
  {
    metric: "Our Awards",
    value: "1359",
  },
  {
    metric: "Happy Customers",
    value: "6560",
    postfix: "+",
  },
];
const slides = [
  {
    image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1711485312/1_dkgpc1.png',
  },
  {
    image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1711485314/2_siobkl.png',
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
  <section className="w-full mt-5 flex justify-center">
    <div className="container flex flex-col items-center gap-4 px-4 text-center md:gap-10 md:px-6">
      <div className="space-y-3 p-4">
        <h1 className="text-3xl font-cormorant-garamond-bold sm:text-4xl md:text-5xl">Rangoli Sweets</h1>
        <div className="mt-10 flex justify-center">
          {/* Any additional content you want to add here */}
        </div>
        <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Experience the rich and delightful taste of Indian sweets brought to your doorstep.<br /> Handcrafted with love and tradition.
        </p>
      </div>
    </div>
  </section>
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

  <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  configs={(_, index) => {
                    return {
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    };
                  }}
                />
                {achievement.postfix}
              </h2>
              <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  
</div>
  )
}

export default Hero;
