"use client";

import { Button, Heading } from "@medusajs/ui";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";

const slides = [
    {
        image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712633012/WhatsApp_Image_2024-04-09_at_08.52.50_jslmza.jpg',
        link: '/products/mysore-pak',
    },
    {
        image: 'https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712633012/WhatsApp_Image_2024-04-09_at_08.52.17_1_oczoxz.jpg',
        link: '/products/motichoor',
    },
];

const Slider = () => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="flex justify-center items-center w-70vh">
            <div className='embla mx-auto relative'>
                <div className='embla__viewport' ref={emblaRef}>
                    <div className='embla__container h-full'>
                        {slides.map((slide, index) => (
                            <a href={slide.link} key={index} className='embla__slide flex flex-col items-center justify-center'>
                                <img
                                    src={slide.image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full object-cover"
                                />
                            </a>
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
    )
}

export default Slider;
