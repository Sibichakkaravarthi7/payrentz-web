"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Text from "@/components/Text/Text";

const SubscriptionCarousel = ({ curSlide, subscriptions }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(curSlide);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: curSlide,
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
          if(subscriptions?.length === 1) return;
          timeout = setTimeout(() => {
            slider?.next();
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


  const modifyStatus = (s) => {
    if (s == "assign_pending") return "Product yet to be assigned";

    return s?.replaceAll("_", " ");
  };

  return (
    <div className="mx-auto">
      <>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider mx-auto">
            {subscriptions?.map((i, ind) => (
              <div
                key={i?.subCategory}
                className={`keen-slider__slide number-slide${
                  ind + 1
                } h-auto  relative`}
              >
                <div className="md:flex grid grid-cols-1 justify-between">
                  <div className="">
                    <Text className={"text-[#2B5CAB] font-medium"}>
                      {i?.category}
                    </Text>
                    <Text
                      className={
                        "text-[#858585] mt-[10px] text-[10px] font-normal"
                      }
                    >
                      {i?.subCategory}
                    </Text>
                  </div>
                  <div className="flex items-end">
                    <Text
                      className={
                        "text-[#858585] mt-[10px] md:mt-0 text-[10px] font-normal capitalize"
                      }
                    >
                      {modifyStatus(i?.subscriptionStatus)}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {loaded && instanceRef.current && (
          <div className="dots-dashboard">
            {[
              ...Array(instanceRef?.current?.track?.details?.slides?.length)?.keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={
                    "dot-dashboard" + (currentSlide === idx ? " active" : "")
                  }
                ></button>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default SubscriptionCarousel;
