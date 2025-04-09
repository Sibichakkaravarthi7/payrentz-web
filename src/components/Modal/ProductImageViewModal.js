import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import AppImage from "../Image/AppImage";
import CloseButton from "../CloseButton";

const ProductImageViewModal = ({ curSlide, images, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(curSlide);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: curSlide,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  function ThumbnailPlugin(mainRef) {
    return (slider) => {
      function removeActive() {
        slider.slides.forEach((slide) => {
          slide.classList.remove("active");
        });
      }
      function addActive(idx) {
        slider.slides[idx].classList.add("active");
      }

      function addClickEvents() {
        slider.slides.forEach((slide, idx) => {
          slide.addEventListener("click", () => {
            if (mainRef.current) mainRef.current.moveToIdx(idx);
          });
        });
      }

      slider.on("created", () => {
        if (!mainRef.current) return;
        addActive(slider.track.details.rel);
        addClickEvents();
        mainRef.current.on("animationStarted", (main) => {
          removeActive();
          const next = main.animator.targetIdx || 0;
          addActive(main.track.absToRel(next));
          slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
        });
      });
    };
  }

  const [thumbnailRef] = useKeenSlider(
    {
      initial: curSlide,
      slides: {
        perView: images?.length + 10,
        spacing: 0,
      },
    },
    [ThumbnailPlugin(instanceRef)]
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

  // console.log("currentSlide", currentSlide);

  return (
    <div className="mx-auto">
      <CloseButton
        onClick={() => onClose()}
        className={"absolute top-[20px] right-[20px] z-[9]"}
      />
      <>
        <div className="navigation-wrapper py-[10px]">
          <div ref={sliderRef} className="keen-slider mx-auto">
            {images?.map((i, ind) => (
              <div
                key={i?.file}
                className={`keen-slider__slide number-slide${
                  ind + 1
                } h-[75vh]  relative`}
              >
                <AppImage
                  layout="fill"
                  className="h-[100%] object-contain !w-[55%] !mx-auto"
                  src={i?.file}
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
        <div
          ref={thumbnailRef}
          className="keen-slider flex gap-[20px] items-center justify-center h-[80px] w-[80px] thumbnail pb-[10px]"
        >
          {images?.map((m, ind) => (
            <div
              key={m?.file}
              className={`rounded-[5px]  keen-slider__slide number-slide border cursor-pointer ${
                currentSlide == ind ? "border-[2px] border-appBlue" : ""
              }`}
            >
              <AppImage
                layout="fill"
                className="!mx-auto !w-[80px] !h-[80px]"
                src={m?.file}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* {loaded && instanceRef.current && (
          <div className="dots">
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
        )} */}
      </>
    </div>
  );
};

export default ProductImageViewModal;
