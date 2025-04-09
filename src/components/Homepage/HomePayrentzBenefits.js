"use client";
import React from "react";
import Text from "../Text/Text";
import AppImage from "../Image/AppImage";
import {
  Del,
  Secure,
  Dollar,
  Rent,
  Service,
  Well,
  RupeeIcon,
  RentatEase,
} from "@/Icons";
import AppLink from "../Link/AppLink";
import { usePathname } from "next/navigation";

const HomePayrentzBenefits = () => {
  const iconsArr = [
    {
      image: RentatEase,
      text: (
        <>
          Rent <span className="font-[800]">@</span> Ease
        </>
      ),
    },
    {
      image: Service,
      text: "Quick Service",
    },
    {
      image: Del,
      text: "Express Delivery",
    },
    {
      image: RupeeIcon,
      text: "Rent Now Pay Later",
    },
    {
      image: Well,
      text: "Well Maintained",
    },
  ];
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  return (
    <div className=" hidden xl:block">
      <AppLink target={"_blank"} link={"/about-us#payrentz-promise"}>
        <div
          className="mt-[34px] md:mt-[42px] bg-[#f3f7ff] flex  
     md:flex-row w-full max-w-[1320px] mx-auto p-[20px] md:py-[26px]
      home-payrentz-benefits items-center gap-y-[20px] gap-x-[40px] lg:gap-x-[119px]
      mb-[30px] md:mb-[48px] justify-center"
        >
          <Text
            className={
              "text-[16px]  md:text-[24px] font-extrabold text-appBlue"
            }
          >
            payrentz promise
          </Text>

          <div className="flex gap-[12px] md:gap-[30px] lg:gap-[50px] flex-wrap md:flex-nowrap justify-center items-baseline">
            {iconsArr?.map((m, ind) => (
              <div
                className={`flex flex-col justify-center gap-[12px] items-center w-[30%] md:w-auto`}
                key={m?.text}
              >
                <AppImage
                  height={42}
                  width={42}
                  src={m?.image}
                  className="w-[42px] h-[42px] md:max-h-[40px]"
                  quality={50}
                  loading={"lazy"}
                  srcSet={m?.image}
                  alt="payrentz-benefits"
                />
                <Text
                  className={"text-[12px] md:text-[14px] font-bold text-center"}
                >
                  {m?.text}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </AppLink>
    </div>
  );
};

export default HomePayrentzBenefits;
