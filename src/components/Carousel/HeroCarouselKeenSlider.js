"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { HomeBanner1, HomeBanner2, HomeBanner3 } from "@/Icons";
import Link from "next/link";
import AppImage from "../Image/AppImage";
import { usePathname } from "next/navigation";

const HeroCarouselKeenSlider = ({ curSlide }) => {
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
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
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
      link: `/${cleanPathname}`?.replace("//", "/") + "/product/all",
    },
    {
      img: HomeBanner2,
      link: `/${cleanPathname}`?.replace("//", "/") + "/combo",
    },
    {
      img: HomeBanner3,
      link: `/${cleanPathname}`?.replace("//", "/") + "/product/all",
    },
  ];

  // const isKycBanner = banners?.findIndex((m) => m?.title === "KYC Pending..") !== -1;

  return (
    <div className="mx-auto hidden xl:block">
      <div>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider mx-auto  h-full">
            {carouselImages?.map((i, ind) => (
              <div
                key={ind}
                className={`keen-slider__slide  number-slide${
                  ind + 1
                } h-auto min-w-[400px]  lg:min-w-[863px]   relative bg-[${
                  i?.bg
                }]`}
              >
                <Link className="inline-block  " key={i?.img} href={i?.link}>
                  <AppImage
                    height={372}
                    src={i?.img}
                    srcSet={i?.img}
                    className=" h-full object-cover w-full rounded-[10px] overflow:hidden   xl:max-w-[863px] md:h-[320px] lg:h-[372px]  "
                    alt={`carousel-image ${ind}`}
                    priority={ind === 0}
                    loading={ind === 0 ? "eager" : "lazy"} // Lazy load other images
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

export default HeroCarouselKeenSlider;
