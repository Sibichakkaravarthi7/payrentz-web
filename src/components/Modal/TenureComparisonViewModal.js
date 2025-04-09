import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import AppImage from "../Image/AppImage";
import CloseButton from "../CloseButton";
import MobilePickTenure from "../MobilePickTenure";

const TenureComparisonViewModal = ({
  curSlide,
  tenurePlans,
  getSavingsBasedOnMonthlyPrice,
  selectedTenure,
  setSelectedTenure,
}) => {
  // const [tempSel, setTempSel] = useState(selectedTenure);
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

  // function Arrow(props) {
  //   const disabled = props.disabled ? " arrow--disabled" : "";
  //   return (
  //     <svg
  //       onClick={props.onClick}
  //       className={`arrow ${
  //         props.left ? "arrow--left" : "arrow--right"
  //       } ${disabled}`}
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //     >
  //       {props.left && (
  //         <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
  //       )}
  //       {!props.left && (
  //         <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
  //       )}
  //     </svg>
  //   );
  // }

  return (
    <div className="mx-auto">
      <>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider mx-auto">
            {tenurePlans?.map((i, ind) => (
              <div
                key={i?.tenure}
                className={`keen-slider__slide number-slide${
                  ind + 1
                }  relative`}
              >
                {/* <AppImage
                  layout="fill"
                  className="h-[100%] object-contain !w-[75%] !mx-auto"
                  src={i?.file}
                /> */}
                <MobilePickTenure
                  tenure={i?.tenure}
                  price={i?.price}
                  savings={getSavingsBasedOnMonthlyPrice(i?.price)}
                  closure={i?.early_closure_charges}
                  // relocation={i?.free_relocation}
                  // upgrade={i?.free_upgrade}
                  selectedTenure={selectedTenure}
                  setSelectedTenure={setSelectedTenure}
                  id={i?.id}
                />
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
          <div className="dots">
            {[
              ...Array(
                instanceRef?.current?.track?.details?.slides?.length
              ).keys(),
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
      </>
    </div>
  );
};

export default TenureComparisonViewModal;
