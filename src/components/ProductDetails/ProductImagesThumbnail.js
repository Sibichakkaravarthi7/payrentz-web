import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import AppImage from "../Image/AppImage";
import {
  copyIcon,
  facebookIcon,
  ImagePlaceholder,
  shareIcon,
  WhatsappIcon,
  xIcon,
} from "@/Icons";
import Text from "@/components/Text/Text";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import toast from "react-hot-toast";

const ProductImagesThumbnail = ({ curSlide, images }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(curSlide);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
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
    // const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow-product ${
          props.left ? "arrow--left" : "arrow--right"
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

  // console.log("currentSlide", currentSlide);
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = window.location.href;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
    setIsOpen(false); // Close menu after copying
  };

  return (
    <div className="mx-auto">
      <>
        <div className="flex justify-end items-end pt-[30px] relative">
          <AppImage
            className="w-[25px] cursor-pointer"
            src={shareIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="absolute right-[-25px] z-[9] top-[50px] mt-2 w-40 bg-white border rounded shadow-md p-2">
              <WhatsappShareButton url={decodeURIComponent(shareUrl)}>
                <div className="p-2 flex items-center w-35 hover:bg-gray-100  cursor-pointer w-[140px]">
                  <AppImage src={WhatsappIcon} className={"w-[26px]"} />
                  <Text className={"pl-[7px] text-[14px] text-left"}>
                    Whatsapp
                  </Text>
                </div>
              </WhatsappShareButton>
              <FacebookShareButton url={decodeURIComponent(shareUrl)}>
                <div className="p-2 flex items-center w-35 hover:bg-gray-100  cursor-pointer w-[140px] border-t">
                  <AppImage src={facebookIcon} className={"w-[26px]"} />
                  <Text className={"pl-[7px] text-[14px] text-left"}>
                    Facebook
                  </Text>
                </div>
              </FacebookShareButton>
              <TwitterShareButton url={decodeURIComponent(shareUrl)}>
                <div className="p-2 flex items-center  w-35 hover:bg-gray-100  cursor-pointer w-[140px] border-t">
                  <AppImage src={xIcon} className={"w-[24px]"} />
                  <Text className={"pl-[7px] text-[14px]  text-left"}>X</Text>
                </div>
              </TwitterShareButton>

              <div
                className="p-2 flex items-center  hover:bg-gray-100 cursor-pointer border-t "
                onClick={handleCopyLink}
              >
                <AppImage src={copyIcon} className={"w-[20px]"} />
                <Text className={"pl-[7px] text-[14px] text-left"}>
                  Copy Link
                </Text>
              </div>
            </div>
          )}
        </div>
        <div className="navigation-wrapper w-[670px] py-[10px]">
          <div ref={sliderRef} className="keen-slider mx-auto min-h-[370px] ">
            {images?.length > 0 ? (
              images?.map((i, ind) => (
                <div
                  key={i?.file}
                  className={`keen-slider__slide number-slide${
                    ind + 1
                  } w-[570px]   h-[570px] relative`}
                >
                  <AppImage
                    layout="fill"
                    className="!w-[570px] !h-[570px] !mx-auto"
                    src={i?.file}
                  />
                </div>
              ))
            ) : (
              <AppImage
                layout="intrinsic"
                className="!w-[570px] !h-[570px] !mx-auto"
                src={ImagePlaceholder}
              />
            )}
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
          {images?.length > 0 ? (
            images?.map((m, ind) => (
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
                />
              </div>
            ))
          ) : (
            <AppImage
              layout="fill"
              className="!mx-auto !w-[80px] !h-[80px]"
              src={ImagePlaceholder}
            />
          )}
        </div>
      </>
    </div>
  );
};

export default ProductImagesThumbnail;
