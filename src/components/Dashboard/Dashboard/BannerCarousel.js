"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Text from "@/components/Text/Text";
import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import AppLink from "@/components/Link/AppLink";

const BannerCarousel = ({ curSlide, banners }) => {
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
      disabled: banners?.length == 1,
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

  // const isKycBanner = banners?.findIndex((m) => m?.title === "KYC Pending..") !== -1;

  return (
    <div className="mx-auto">
      <div>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider mx-auto">
            {banners?.map((i, ind) => (
              <div
                key={ind}
                className={`keen-slider__slide number-slide${
                  ind + 1
                } h-auto  relative bg-[${i?.bg}]`}
              >
                <div className="grid grid-cols-1  md:flex gap-[10px] md:gap-[26px]">
                  <div className="flex justify-between md:gap-[136px] !w-[98%] md:!w-[90%] items-start md:items-center">
                    <div>
                      <Text className={"text-[#0B1A33] text-[24px] font-bold"}>
                        {i?.title}
                      </Text>
                      <Text className={"font-semibold mt-[10px]"}>
                        {i?.details}
                      </Text>
                    </div>
                    <div className="flex items-end md:mt-[10px]">
                      <AppLink link={i?.buttonAction}>
                        <AppButton
                          text={i?.button}
                          className={
                            "whitespace-nowrap !text-[12px] md:!text-[16px] !font-[500]"
                          }
                          variant={"red"}
                        />
                      </AppLink>
                    </div>
                  </div>
                  <div className="pt-[15px]">
                    <AppImage
                      src={i?.image}
                      srcSet={i?.image}
                      priority={false}
                      loading="lazy"
                      alt="banner-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {loaded && instanceRef.current && (
          <div className="dots-dashboard-banner">
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
                    "dot-dashboard-banner" +
                    (currentSlide === idx ? " active" : "")
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

export default BannerCarousel;
