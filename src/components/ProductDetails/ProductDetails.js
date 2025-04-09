import React from "react";
import Text from "../Text/Text";
import AppFaqComponent from "../AppFaqComponent";
import ProductSpecifications from "./ProductSpecifications";
import WebFaqComponent from "./WebFaqComponent";
import ProductDescription from "./ProductDescription";
import { frequentlyAskedQuestions } from "@/utils/FaqData";

function ProductDetails({ variantDetails }) {
  return (
    <div>
      {/* <div className="items-center hidden lg:flex py-[20px] pl-[10px] border-b-2">
        {productDetails.map((item) => (
          <Text className={"font-semibold text-[#858585] mr-[70px]"}>
            {item.title}
          </Text>
        ))}
      </div> */}
      <div className="ql-editor">
        <ProductDescription
          key={variantDetails?.id}
          details={variantDetails?.description}
        />
      </div>
      {/* <div className="py-[40px] border-b-2 border-[#2B5CAB]">
        <Text
          as="h2"
          className={"font-extrabold text-2xl text-[#2B5CAB] mb-[30px]"}
        >
          Specifications
        </Text>
        {productSpecifications?.map((spec) => (
          <ProductSpecifications
            key={spec?.id}
            id={spec?.id}
            specs={spec?.specs}
            details={spec?.details}
          />
        ))}
      </div> */}
      <div>
        {/* <div className="pt-[20px] md:pt-[40px]">
          <Text
            as="h2"
            className={"font-extrabold text-2xl text-[#2B5CAB] mb-[20px]"}
          >
            Frequently Asked Questions
          </Text> */}
        {/* <div className="hidden lg:flex lg:flex-col">
            {frequentlyAskedQuestions?.slice(0, 4)?.map((items) => (
              <WebFaqComponent
                key={items?.id}
                id={items?.id}
                question={items?.question}
                answer={items?.answer}
              />
            ))}
          </div> */}
        {/* <div className="flex flex-col lg:hidden border-b-2 border-[#2B5CAB] pb-[20px]">
            {frequentlyAskedQuestions?.map((items) => (
              <AppFaqComponent
                key={items?.id}
                id={items?.id}
                title={items?.question}
                answer={items?.answer}
              />
            ))}
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default ProductDetails;
