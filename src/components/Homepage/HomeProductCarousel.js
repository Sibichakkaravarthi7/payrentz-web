"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Text from "@/components/Text/Text";
import ProductBoxView from "../productBoxView/ProductBoxView";
import { SET_COMBO_VIEW_PAGE, SET_PRODUCT_VIEW_PATH } from "@/utils/Constants";
import { usePathname } from "next/navigation";

const HomeProductCarousel = ({
  curSlide = 0,
  list = [],
  className = "",
  title = "",
  isCombo = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(curSlide);

  const Arrow = ({ disabled, onClick, left }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={left ? "Previous slide" : "Next slide"}
        className={`arrow !w-[40px] !h-[40px] md:!w-[60px] md:!h-[60px] ${
          left
            ? "arrow--left md:!left-[-27px] !left-[-10px]"
            : "arrow--right md:!right-[-27px] !right-[-10px]"
        } ${disabled ? "arrow--disabled" : ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          {left ? (
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          ) : (
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
          )}
        </svg>
      </button>
    );
  };

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(max-width: 500px)": {
        loop: true,
        slides: {
          perView: 2,
        },
      },
    },
    slides: {
      perView: 4,
    },
    initial: curSlide,
    slideChanged(slider) {
      setCurrentSlide(slider?.track?.details?.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const handlePrev = useCallback(
    (e) => {
      e.stopPropagation();
      instanceRef.current?.prev();
    },
    [instanceRef]
  );

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation();
      instanceRef.current?.next();
    },
    [instanceRef]
  );
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  return (
    <div className={`mx-auto ${className}`}>
      <div className="navigation-wrapper mt-[25px] md:mt-[37px]">
        {title && (
          <Text
            as="h2"
            className={
              "text-[18px] md:text-[28px] font-extrabold text-center text-appBlue mb-[20px] md:mb-[30px]"
            }
          >
            {title}
          </Text>
        )}
        <div ref={sliderRef} className="keen-slider mx-auto ">
          {list?.map((m, ind) => (
            <div
              key={m?.id || ind}
              className={`keen-slider__slide number-slide${
                ind + 1
              } h-auto relative min-w-[184px] lg:min-w-[323px] `}
            >
              <ProductBoxView
                image={m?.image_detail?.[0]?.file || m?.image}
                tag={m?.tag || "newly added"}
                identity={m?.identity}
                price={m?.rent_12 || m?.rent_6 || m?.rent_3 || m?.rent_1}
                link={
                  isCombo
                    ? SET_COMBO_VIEW_PAGE(
                        `${cleanPathname}`?.replace("//", "/"),
                        m?.slug
                      )
                    : SET_PRODUCT_VIEW_PATH(
                        `${cleanPathname}`?.replace("//", "/"),
                        m?.category_detail?.slug,
                        m?.slug
                      )
                }
                obj={m}
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow left onClick={handlePrev} disabled={currentSlide === 0} />
            <Arrow
              onClick={handleNext}
              disabled={
                currentSlide ===
                instanceRef?.current?.track?.details?.slides?.length - 1
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeProductCarousel;
