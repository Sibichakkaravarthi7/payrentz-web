"use client";
import React from "react";
import Text from "../Text/Text";
import AppImage from "../Image/AppImage";
import AppLink from "../Link/AppLink";
import { Faqman, RightArrow } from "@/Icons";
import AppFaqComponent from "../AppFaqComponent";
import { frequentlyAskedQuestions } from "@/utils/FaqData";

const HomeFAQ = () => {
  return (
    <div className="mt-[50px]">
      <div className="flex gap-[40px]">
        <div className="md:w-[50%] flex flex-col items-center hidden md:flex">
          <div>
            <div>
              <Text
                className={
                  "text-[18px] md:text-[28px] font-extrabold text-center text-appBlue inline"
                }
              >
                Frequently Asked Questions
              </Text>
            </div>
            {/* <Text className={"font-medium text-[16px] mt-[10px]"}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit turpis
            </Text> */}
          </div>
          <div className="mt-[27px]">
            <AppImage
              src={Faqman}
              alt={"FaqMan"}
              loading={"lazy"}
              srcSet={Faqman}
            />
          </div>
        </div>

        <div className="w-full md:w-[50%]">
          <div className="block md:hidden text-center mb-[20px]">
            <Text className={"font-extrabold text-[18px]"} as="h2">
              Frequently Asked Questions
            </Text>
            {/* <Text className={"text-[12px] font-medium mt-[5px]"}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit turpis
            </Text> */}
          </div>
          <div className="bg-[#F6FAFF] rounded-[12px] flex  py-[30px] px-[20px]  md:py-[50px] md:px-[46px] flex-col gap-[20px] ">
            {frequentlyAskedQuestions?.slice(0, 6)?.map((a, ind) => (
              <AppFaqComponent
                key={a?.question}
                id={ind}
                title={a?.question}
                answer={a?.answer}
              />
            ))}
            <AppLink
              className={" text-[14px] md:text-[17px] font-semibold"}
              link={`/faq`}
            >
              <Text className={"inline"}>Read More</Text>
              <AppImage
                className="inline ms-[6px] mt-[-2px]"
                src={RightArrow}
                alt={"RightArrow"}
                loading={"lazy"}
                srcSet={RightArrow}
              />
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFAQ;
