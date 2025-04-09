"use client";
import React from "react";
import Text from "../Text/Text";
import { ImagePlaceholder } from "@/Icons";
import AppImage from "../Image/AppImage";
import AppLink from "../Link/AppLink";
import { SET_PRODUCT_VIEW_PATH } from "@/utils/Constants";
import { usePathname } from "next/navigation";

const HomeRentByCategory = ({ homePplFav }) => {
  // const catList = [
  //   {
  //     title: "Refrigerators",
  //     img: Refrigerators,
  //     link: "",
  //   },
  //   {
  //     title: "Washing Machines",
  //     img: WashingMachines,
  //     link: "",
  //   },
  //   {
  //     title: "Mattresses",
  //     img: Mattresses,
  //     link: "",
  //   },
  //   {
  //     title: "Cots",
  //     img: Cots,
  //     link: "",
  //   },
  //   {
  //     title: "Air Conditioners",
  //     img: AirConditioners,
  //     link: "",
  //   },
  //   {
  //     title: "Televisions",
  //     img: Televisions,
  //     link: "",
  //   },
  // ];
  // console.log("homePplFavhomePplFav", homePplFav);
  const list = homePplFav?.data?.results;
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  return (
    <div className="">
      {/* <Text
        className={
          "text-[18px] md:text-[28px] font-extrabold text-center text-appBlue my-[18px] md:my-[53px]"
        }
        as="h2"
      >
        Rent by Category
      </Text> */}

      <div className="md:flex md:flex-wrap grid grid-cols-3 justify-center md:justify-center gap-x-[5px] md:gap-x-[61px] gap-y-[17px] mt-[20px] md:mt-[35px]">
        {list?.map((m) => (
          <AppLink
            target={"_blank"}
            className={
              "w-full hover:text-appRed flex flex-wrap flex-col items-center"
            }
            link={SET_PRODUCT_VIEW_PATH(
              `${cleanPathname}`?.replace("//", "/"),
              m?.category_detail?.slug,
              m?.slug
            )}
            key={m.id}
          >
            <div className=" relative flex flex-col justify-center items-center rounded-full w-[83px] h-[83px] md:w-[120px] md:h-[120px]">
              <AppImage
                className="border border-[#DBDBDB] hover:scale-[105%] rounded-full blue-red-shadow transition-all duration-300 w-full w-[83px] h-[83px] md:w-[135px] md:h-[135px] object-cover !h-full"
                src={m?.image_detail?.[0]?.file || ImagePlaceholder}
                height={120}
                width={120}
                priority={true}
                sizes="(max-width: 320px) 83px, (max-width: 768px) 120px, 120px"
                srcSet={m?.image_detail?.[0]?.file || ImagePlaceholder}
                alt="product-image"
              />
            </div>
            <Text
              className={
                "mt-[12px] md:mt-[8px] font-bold text-[12px] md:text-[14px] md:max-w-[180px] max-w-[103px] text-center"
              }
            >
              {m?.identity}
            </Text>
          </AppLink>
        ))}
      </div>
    </div>
  );
};

export default HomeRentByCategory;
