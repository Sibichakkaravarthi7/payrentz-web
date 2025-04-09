"use client";
import { useKeenSlider } from "keen-slider/react";
import React, { useState } from "react";
import TestimonialComponent from "../TestimonialComponent";
import { testimonialsContent } from "@/utils/Constants";

const TestimonialSlider = () => {
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
    <div className="testi-slider ">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider ">
          {testimonialsContent?.map((q, ind) => (
            <div
              key={q?.quote}
              className={`keen-slider__slide number-slide${ind} lg:min-w-[680px]`}
            >
              <div className="hidden md:flex justify-between w-full  gap-[40px] flex-col">
                <TestimonialComponent
                  quote={q?.quote}
                  name={q?.name}
                  rentingSince={q?.renting_since}
                />
              </div>
            </div>
          ))}
        </div>
        {/* {loaded && instanceRef.current && (
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
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )} */}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots absolute mt-[10px] right-[16%]">
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

export default TestimonialSlider;
