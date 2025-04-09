import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import { AirConditioners, BlogSample } from "@/Icons";
import AppLink from "../Link/AppLink";

const BlogCard = ({ image, tag, title, name, date, link }) => {
  return (
    <AppLink
      link={link}
      className=" flex flex-col gap-3 lg:gap-5 bg-white min-h-[380px] lg:min-h-[430px] max-w-[600px]  rounded-xl p-[20px] w-[100%] lg:w-[400px] border-2 border-slate-300 "
    >
      <div className="min-h-[190px] ">
        <AppImage
          src={image}
          width={600}
          height={20}
          className="min-h-[190px] max-h-[190px]"
          alt="blog-image"
          loading="lazy"
        />
      </div>
      <div className="bg-[#2B5CAB] w-fit p-[5px] px-[8px] lg:p-[5px] lg:px-[10px] rounded-md ">
        <Text
          className={"text-[12px] md:text-[14px] text-white font-semibold "}
        >
          {tag}
        </Text>
      </div>
      <div className="overflow-scroll min-h-[100px] max-h-[100px]">
        <Text as="h2" className={"text-[20px] md:text-[24px] font-bold "}>
          {title}
        </Text>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center w-[70%] ">
          <Text
            className={
              "text-[#867b7b] text-[14px] font-semibold tracking-wider "
            }
          >
            {name}
          </Text>
          <Text className={"text-[#867b7b] text-[14px] font-medium "}>
            {date}
          </Text>
        </div>
        <div className="flex justify-end  gap-[3px] md:gap-[20px] w-[30%]">
          <Text className={"text-[#2B5CAB] text-[19px] font-bold "}>
            {"Read More"}
          </Text>
        </div>
      </div>
    </AppLink>
  );
};

export default BlogCard;
