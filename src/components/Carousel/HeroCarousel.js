"use client";
import React from "react";
// import AppImage from "../Image/AppImage";
// import {
//   // HomeBanner1,
//   HomeBanner1New,
//   HomeBanner1NewMobile,
//   // HomeBanner2,
//   HomeBanner2New,
//   HomeBanner2NewMobile,
//   // HomeBanner3,
//   HomeBanner3New,
//   HomeBanner3NewMobile,
//   // WomanHeadPhone,
// } from "@/Icons";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@/utils/hooks/useMediaQuery";
import AppImage from "../Image/AppImage";

const HeroCarousel = () => {
  const isBreakpoint = useMediaQuery(768);

  // const carouselImages = [
  //   {
  //     img: HomeBanner1New,
  //     link: '/product/all'
  //   },
  //   {
  //     img: HomeBanner2New,
  //     link: '/combo'
  //   },
  //   {
  //     img: HomeBanner3New,
  //     link: '/product/all'
  //   },
  // ];

  // const carouselImagesMobile = [
  //   {
  //     img: HomeBanner1NewMobile,
  //     link: '/product/all'
  //   },
  //   {
  //     img: HomeBanner2NewMobile,
  //     link: '/combo'
  //   },
  //   {
  //     img: HomeBanner3NewMobile,
  //     link: '/product/all'
  //   },
  // ];

  return (
    // <div
    //   id="default-carousel"
    //   className="relative w-full"
    //   data-carousel="slide"
    // >
    //   <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
    //     {carouselImages?.map((i) => (
    //       <div
    //         key={i?.img}
    //         className="hidden duration-700 ease-in-out"
    //         data-carousel-item
    //       >
    //         <AppImage
    //           src={i?.img}
    //           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //         />
    //       </div>
    //     ))}
    //   </div>
    //   {/* <AppImage
    //           src={WomanHeadPhone}
    //           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //         /> */}
    //   {/* Slider indicators  */}
    //   <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
    //     <button
    //       type="button"
    //       className="w-3 h-3 rounded-full"
    //       aria-current="true"
    //       aria-label="Slide 1"
    //       data-carousel-slide-to="0"
    //     ></button>
    //     <button
    //       type="button"
    //       className="w-3 h-3 rounded-full"
    //       aria-current="false"
    //       aria-label="Slide 2"
    //       data-carousel-slide-to="1"
    //     ></button>
    //     <button
    //       type="button"
    //       className="w-3 h-3 rounded-full"
    //       aria-current="false"
    //       aria-label="Slide 3"
    //       data-carousel-slide-to="2"
    //     ></button>
    //   </div>
    // </div>
    <div className="md:h-[100%]">
      {/* <Carousel
        className="h-[190px] lg:h-[372px] w-full"
        style={{}}
        leftControl=" "
        rightControl=" "
      >
        {(isBreakpoint ? [] : [])?.map((i, ind) => (
          <Link className="inline-block h-[100%]" key={i?.img} href={i?.link}>
            <AppImage
              height={372}
              width={836}
              src={i?.img}
              className="h-full object-cover w-full"
              alt="carousel-image"
            />
          </Link>
        ))}
      </Carousel> */}
    </div>
  );
};

export default HeroCarousel;
