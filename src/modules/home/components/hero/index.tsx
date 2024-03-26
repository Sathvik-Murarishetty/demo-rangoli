"use client";

import { Button, Heading } from "@medusajs/ui";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";

interface Achievement {
  metric: string;
  value: string;
  postfix?: string;
  prefix?: string;
}

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const achievementsList = [
  {
    metric: "DELICOUS DINNERS",
    value: "5245",
    postfix: "+",
  },
  {
    metric: "EXPERIENCED CHEF",
    value: "60",
    postfix: "+",
  },
  {
    metric: "OUR AWARDS",
    value: "1359",
    postfix: "+",
  },
  {
    metric: "HAPPY CUSTOMERS",
    value: "6560",
    postfix: "+",
  },
];

const slides = [
  {
    image: 'https://img.freepik.com/free-photo/top-view-delicious-chocolate-orange-table_23-2148395057.jpg',
  },
  {
    image: 'https://img.freepik.com/free-photo/delicious-indian-dessert-with-copy-space_23-2149312352.jpg',
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

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="statBox" style={{ borderRadius: '10px', border: '1px solid var(--color-dark-60)', padding: '16px', minWidth: '100px', width: '100%', textAlign: 'center' }}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

  return (
    <div>
      <div>
      <div className="w-full relative">
        <div className='embla mx-auto relative'>
          <div className='embla__viewport border' ref={emblaRef}>
            <div className='embla__container h-full'>
              {slides.map((slide, index) => (
                <div className='embla__slide flex flex-col items-center justify-center mb-10' key={index}>
                  <Image
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    width={1000}
                    height={500}
                    className="object-cover mr-6"
                  />
                  <div className="mt-2">
                    <Button onClick={() => console.log("Shop Now")}><ShoppingCart />Order Now</Button>
                  </div>
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
        <section className="w-full">
          <div className="container flex flex-col items-center gap-4 px-4 text-center md:gap-10 md:px-6">
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="40%"
              src="/placeholder.svg"
              width="100%"
            />
            <div className="space-y-3 p-4">
              <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm dark:bg-amber-800">
                Authentic Indian Sweets
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rangoli Sweets</h1>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience the rich and delightful taste of Indian sweets brought to your doorstep. Handcrafted with
                love and tradition.
              </p>
            </div>
          </div>
        </section>
      <div className="bg-[#D35400] text-white text-center py-4 flex justify-center items-center space-x-8">
          <span className="uppercase tracking-widest">Beyond Authentic</span>
          <StarIcon className="h-6 w-6 text-white" />
          <div className="text-white" />
          <span className="uppercase tracking-widest">Premium Ingredients</span>
          <StarIcon className="h-6 w-6 text-white" />
          <div className="text-white" />
          <span className="uppercase tracking-widest">Meticulously Processed</span>
        </div>
      </div>
      <div className="flex justify-center py-16">
        <div className="max-w-6xl w-full px-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500">• Our Story •</h3>
              <h1 className="mt-4 text-5xl font-bold text-gray-800">The Legacy Of Rangoli Sweets</h1>
              <p className="mt-6 text-lg text-gray-700">
                When opening Rangoli, we set out to create an elegant Indian restaurant that offered artistic, creative
                versions of Northern and coastal Indian dishes. Our name, “Rangoli,” is drawn from a popular Indian
                style of art featuring patterns and designs in rich, jewel-like colors.
                <br />
                Our restaurant is decorated in these vibrant hues, with Sanskrit script gracing the walls. Our interior
                welcomes you with private dining alcoves and fresh orchids on each table. Our attentive, gracious
                service invites you to linger and enjoy your dining experience.
              </p>
            </div>
            <div>
              <img
                alt="The process of making sweets"
                className="w-full h-auto object-cover"
                height="400"
                src="/placeholder.svg"
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
      <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
          {achievementsList.map((achievement, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
              >
                <h2 className="text-black text-4xl font-bold flex flex-row">
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={parseInt(achievement.value)}
                    locale="en-US"
                    className="text-black text-4xl font-bold"
                    transitions={(index) => ({
                      type: "spring",
                      duration: index + 0.3,
                    })}
                    fontStyle={{
                      fontSize: 40,
                      color: "black",
                    }}
                  />
                  {achievement.postfix}
                </h2>
                <p className="text-black text-base">{achievement.metric}</p>
              </div>
            );
          })}
        </div>
      </div>
      <section className="promotion" style={{ display: 'grid', gridTemplateColumns: '50% 1fr', gap: '30px', marginBottom: '30px', padding: '80px',}}>
        <div className="textBox" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
          <h3 className="text-4xl font-bold text-black mb-4">Offer!!</h3>
          <p>
            Get ready for an experience like never before with our Deals! Every
            purchase comes with exclusive offers. Do not miss out! 🎁🛒 COUPON CODE: XXXXXX
          </p>

          <ul className="stats" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(4, 100px)' }}>
            <StatBox label="Days" value={time.days} />
            <StatBox label="Hours" value={time.hours} />
            <StatBox label="Minutes" value={time.minutes} />
            <StatBox label="Seconds" value={time.seconds} />
          </ul>
        </div>
      </section>
    </div>
    )
}

function StarIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default Hero;
