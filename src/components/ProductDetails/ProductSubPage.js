"use client";
import React, { useEffect } from "react";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import ProductSelection from "./ProductSelection";
import AppContainer from "../Container/AppContainer";
import ProductCarousel from "./ProductCarousel";
import Text from "../Text/Text";
import WebFaqComponent from "./WebFaqComponent";
import AppFaqComponent from "../AppFaqComponent";
import { frequentlyAskedQuestions } from "@/utils/FaqData";
import ProductImagesWithThumbNail from "./ProductImagesWithThumbnail";
import { trackViewItemEvent } from "../Thirdparty/GoogleEventTracker";
import AppImage from "@/components/Image/AppImage";
import { shareIconMobile } from "@/Icons";

function ProductSubPage({ variantDetail, seoTag }) {
  // console.log("variant", variantDetail);

  useEffect(() => {
    if (typeof window) {
      trackViewItemEvent(variantDetail);
    }
  }, []);

  const handleShare = async () => {
    const lastSegment = window.location.href.split("/").filter(Boolean).pop();

    if (navigator.share) {
      try {
        await navigator.share({
          // title: "Check this out!",
          text: `I think you’d love this product on Payrentz. Try renting ${lastSegment}. Rent now `,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };
  return (
    <div>
      <AppContainer>
        <div className="hidden lg:flex gap-[30px]">
          <div className="lg:max-w-[670px] md:max-w-[670px] w-full">
            {/* <ProductImages variantDetails={variantDetail} /> */}
            <ProductImagesWithThumbNail variantDetails={variantDetail} />
            <ProductDetails variantDetails={variantDetail} />
          </div>
          <div className=" lg:sticky lg:top-[0px] self-start flex-[1] lg:w-[620px] md:w-[590px]">
            <ProductSelection variantDetail={variantDetail} seoTag={seoTag} />
          </div>
        </div>
      </AppContainer>
      <div className="flex flex-col lg:hidden">
        <div className="col-span-1">
          <div className="bg-[#F3F7FF]">
            {/* For mobile */}
            <div className="pt-[14px] pr-[20px] pl-[19px]">
              <div className="flex justify-end items-end pr-[5px] pt-[10px]">
                <AppImage
                  onClick={handleShare}
                  className="w-[25px] h-[25px] cursor-pointer "
                  src={shareIconMobile}
                  alt="Share"
                />
              </div>
              <ProductCarousel variantDetails={variantDetail} />
            </div>
            <ProductSelection variantDetail={variantDetail} />
          </div>
          <AppContainer>
            <ProductDetails variantDetails={variantDetail} />
            <div className="">
              {/* <Text
            as="h2"
            className={"font-extrabold text-2xl text-[#2B5CAB] mb-[20px]"}
          >
            Frequently Asked Questions
          </Text> */}
              {/* <div className="hidden lg:flex lg:flex-col">
            {frequentlyAskedQuestions?.map((items) => (
              <WebFaqComponent
                key={items?.id}
                id={items?.id}
                question={items?.question}
                answer={items?.answer}
              />
            ))}
          </div> */}
              {/* <div className="flex flex-col lg:hidden border-b-2 border-[#2B5CAB] pb-[20px]">
            {frequentlyAskedQuestions?.slice(0, 4)?.map((items) => (
              <AppFaqComponent
                key={items?.id}
                id={items?.id}
                title={items?.question}
                answer={items?.answer}
              />
            ))}
          </div> */}
            </div>
          </AppContainer>
        </div>
      </div>
    </div>
  );
}

export default ProductSubPage;
