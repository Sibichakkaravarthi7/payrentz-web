"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Text from "@/components/Text/Text";
import { convertToPrice } from "@/utils/Constants";

const InvoiceCarousel = ({ curSlide, invoices }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(curSlide);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: curSlide,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
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
        function stopSlider() {}
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          if (invoices?.length === 1) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
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
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
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

  return (
    <div className="mx-auto">
      <>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider mx-auto">
            {invoices?.map((i, ind) => (
              <div
                key={i?.subCategory}
                className={`keen-slider__slide number-slide${
                  ind + 1
                } h-auto  relative`}
              >
                <div className="flex justify-between md:justify-normal md:gap-[68px]">
                  <div className="">
                    <Text className={"text-[#2B5CAB] font-medium"}>
                      {i?.invoiceId}
                    </Text>
                    <Text
                      className={
                        "text-[#858585] mt-[14px] text-[12px] font-normal"
                      }
                    >
                      Raised on: {i?.createdOn}
                    </Text>
                  </div>
                  <div className="">
                    <Text className={"text-[#1D1D1D] text-[14px] font-[700]"}>
                      Total: {convertToPrice(i?.totalAmount)}
                    </Text>
                    <Text
                      className={
                        "mt-[19px] text-[#858585] text-[12px] font-normal"
                      }
                    >
                      Due Date: {i?.dueDate}
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
              ...Array(instanceRef?.current?.track?.details?.slides?.length).keys(),
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

export default InvoiceCarousel;
