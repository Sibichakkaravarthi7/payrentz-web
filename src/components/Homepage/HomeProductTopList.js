"use client";
import React from "react";
import ProductBoxView from "../productBoxView/ProductBoxView";
import Text from "../Text/Text";
import { SET_PRODUCT_VIEW_PATH, dummyProductsList } from "@/utils/Constants";
import { usePathname } from "next/navigation";

const HomeProductTopList = ({ title, classname = "", list }) => {
  // console.log("listttt", list);
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  return (
    <div className={`mt-[25px] md:mt-[37px] ${classname}`}>
      {title ? (
        <Text
          className={
            "text-[18px] md:text-[28px] font-extrabold text-center text-appBlue mb-[20px] md:mb-[px30]"
          }
        >
          {title}
        </Text>
      ) : null}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[15px] gap-x-[18px] md:gap-x-[40px] ">
        {list?.map((m) => (
          <ProductBoxView
            image={m?.image_detail?.[0]?.file || m?.image}
            tag={m?.tag || "newly added"}
            identity={m?.identity}
            price={m?.rent_12 || m?.rent_6 || m?.rent_3 || m?.rent_1}
            link={SET_PRODUCT_VIEW_PATH(
              `${cleanPathname}`?.replace("//", "/"),
              m?.category_detail?.uuid,
              m?.uuid
            )}
            obj={m}
            key={m?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeProductTopList;
