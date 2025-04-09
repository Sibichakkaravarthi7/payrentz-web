"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import AppImage from "../Image/AppImage";

const AboutImageCarousel = ({ curSlide, list, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(curSlide);
  function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow !w-[40px] !h-[40px] md:!w-[60px] md:!h-[60px] ${
          props.left
            ? "arrow--left md:!left-[-27px] !left-[-10px]"
            : "arrow--right md:!right-[-27px] !right-[-10px]"
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

  // console.log("list of products", list);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(max-width: 500px)": {
          loop: true,
          slides: {
            perView: 2,
            spacing: 10,
          },
        },
      },
      slides: {
        perView: 3.8,
        spacing: 30,
      },
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

  return (
    <div className={`mx-auto ${className}`}>
      <>
        <div className="navigation-wrapper mt-[25px] md:mt-[37px]">
          <div ref={sliderRef} className="keen-slider mx-auto">
            {list?.map((m, ind) => (
              <div
                key={ind}
                className={`keen-slider__slide number-slide${
                  ind + 1
                } h-auto relative`}
              >
                <AppImage
                  src={m?.img}
                  alt={m?.alt}
                  className={"md:h-[400px] h-[200px]  w-[300px] rounded-[10px]"}
                  loading="lazy"
                />
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
      </>
    </div>
  );
};

export default AboutImageCarousel;
