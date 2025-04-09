"use client";
import { useKeenSlider } from "keen-slider/react";
import React, { useState } from "react";
import TestimonialComponent from "../TestimonialComponent";
import { testimonialsContent } from "@/utils/Constants";

const TestimonialSliderMobile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
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
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
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

  return (
    <div className="testi-slider">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {testimonialsContent?.map((m, ind) => (
            <div
              key={m?.quote}
              className={`keen-slider__slide number-slide${ind} min-w-[320px]`}
            >
              {/* <div className="hidden md:flex justify-between w-full gap-[40px] flex-col"> */}
              <TestimonialComponent
                quote={m?.quote}
                name={m?.name}
                rentingSince={m?.renting_since}
              />
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>

      {loaded && instanceRef.current && (
        <div className="dots mt-[20px]">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestimonialSliderMobile;
