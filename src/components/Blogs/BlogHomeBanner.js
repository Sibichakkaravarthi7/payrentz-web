"use client";
import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import AppLink from "../Link/AppLink";
import { SET_BLOGS_VIEW_PAGE } from "@/utils/Constants";
import AppButton from "../Button/AppButton";

const BlogHomeBanner = ({ data }) => {
  return (
    <AppLink
      link={SET_BLOGS_VIEW_PAGE(data?.slug)}
      className="flex justify-center mt-[50px]  pb-[30px] relative cursor-pointer min-h-[250px] lg:min-h-[650px] "
    >
      <AppImage
        width={1024}
        height={600}
        className={
          "w-[100%] max-h-[255px] lg:min-h-[637px] lg:max-h-[650px] rounded-lg "
        }
        src={data?.banner_image?.file}
        alt="blog-image"
        loading="lazy"
      />
      <div
        className=" flex flex-col gap-2 lg:gap-5 bg-white shadow-xl lg:min-h-[250px] lg:max-w-[800px] w-[70%] lg:w-[100%] absolute bottom-[0px] left-[25px]  lg:left-[100px] 
    rounded-[15px] py-[15px] px-[10px] lg:py-[35px] lg:px-[25px] "
      >
        <div className="bg-[#2B5CAB] w-fit p-[5px] px-[10px] text-white text-[10px] lg:text-lg rounded-md font-semibold ">
          {data?.category?.identity}
        </div>
        <Text as="h1" className={"text-[18px] lg:text-[34px] font-bold "}>
          {data?.title}{" "}
        </Text>
        <div className="flex justify-between w-[100%]">
          <div className="flex gap-2 lg:gap-3 items-center ">
            <Text
              className={
                "text-[#867b7b] text-[10px] lg:text-[14px] font-semibold tracking-wider "
              }
            >
              {data?.author}
            </Text>
            <Text
              className={
                "text-[#867b7b] text-[10px] lg:text-[14px] font-medium "
              }
            >
              {data?.created?.split("T")?.[0]}
            </Text>
          </div>
          <div>
            <AppButton
              variant={"red"}
              text={"Read More"}
              className={"mx-auto mt-[20px]"}
            />
          </div>
        </div>
      </div>
    </AppLink>
  );
};

export default BlogHomeBanner;
