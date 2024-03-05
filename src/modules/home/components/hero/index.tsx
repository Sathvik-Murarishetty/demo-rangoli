"use client";

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { BiArrowBack } from "react-icons/bi"
import Image from "next/image";
import React, { useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const slides = [
  {
    image: "/image.webp",
    title: "Slide 1 Title",
    description: "Slide 1 Description"
  },
  {
    image: "/image.webp",
    title: "Slide 2 Title",
    description: "Slide 2 Description"
  },
  {
    image: "/image.webp",
    title: "Slide 3 Title",
    description: "Slide 3 Description"
  }
]

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subt">
      <div className='embla mx-auto mt-12 max-w-lg'>
        <div className='embla__viewport h-56 border' ref={emblaRef}>
          <div className='embla__container h-full'>
            {slides.map((slide, index) => (
              <div className='embla__slide flex items-center justify-center' key={index}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={300}
                  height={200}
                  className="object-cover mr-6"
                />
                <div>
                  <Heading className="mb-1">{slide.title}</Heading>
                  <p className="text-sm text-ui-text-secondary">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-3 flex justify-between'>
          <button
            className='w-20 bg-black px-2 py-1 text-sm text-white'
            onClick={scrollPrev}
          >
            Prev
          </button>
          <button
            className='w-20 bg-black px-2 py-1 text-sm text-white'
            onClick={scrollNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
