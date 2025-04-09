"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { HomeBanner1, HomeBanner2, HomeBanner3 } from "@/Icons";
import Link from "next/link";
import AppImage from "../Image/AppImage";

const HeroCarouselKeenSliderMobile = ({ curSlide }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(curSlide);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      // initial: curSlide,
      slideChanged(slider) {
        setCurrentSlide(slider?.track?.details?.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider?.on("created", () => {
          slider?.container?.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider?.container?.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  function Arrow(props) {
    // const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow !w-[40px] !h-[40px] md:!w-[60px] md:!h-[60px] ${
          props.left
            ? "arrow-banner-left md:!left-[-27px] !left-[-10px]"
            : "arrow-banner-right md:!right-[-27px] !right-[-10px]"
        } `}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  const carouselImages = [
    {
      img: HomeBanner1,
      link: "/product/all",
    },
    {
      img: HomeBanner2,
      link: "/combo",
    },
    {
      img: HomeBanner3,
      link: "/product/all",
    },
  ];

  // const isKycBanner = banners?.findIndex((m) => m?.title === "KYC Pending..") !== -1;

  return (
    <div className="mx-auto block xl:hidden ">
      <div className=" min-h-[170px] ">
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider mx-auto ">
            {carouselImages?.map((i, ind) => (
              <div
                key={ind}
                className={`keen-slider__slide  number-slide${ind + 1}    `}
              >
                <Link className="inline-block  " key={i?.img} href={i?.link}>
                  <AppImage
                    width={350}
                    height={160}
                    src={i?.img}
                    srcSet={i?.img}
                    className="  object-cover w-full h-full  rounded-[10px]  "
                    alt={`carousel-image ${ind}`}
                    sizes="(max-width: 320px) 280px, (max-width: 375px) 340px, (max-width: 420px) 390px, 720px"
                    priority={true}
                  />
                </Link>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef?.current?.track?.details?.slides?.length - 1
                }
              />
            </>
          )}
        </div>
        {loaded && instanceRef.current && (
          <div className="dots-home-banner">
            {[
              ...Array(
                instanceRef?.current?.track?.details?.slides?.length
              )?.keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={
                    "dot-home-banner" + (currentSlide === idx ? " active" : "")
                  }
                ></button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCarouselKeenSliderMobile;
