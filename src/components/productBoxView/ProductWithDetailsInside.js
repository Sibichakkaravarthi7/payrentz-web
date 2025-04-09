import React from "react";
import AppImage from "../Image/AppImage";
import ProductTag from "../ProductTag";
import Text from "../Text/Text";
import Link from "next/link";
import AppLink from "../Link/AppLink";
import { ImagePlaceholder } from "@/Icons";

const ProductWithDetailsInside = ({
  obj,
  dontShowMonth = false,
  isAccessories = false,
  index,
  image,
  tag,
  identity,
  price,
  category,
  link,
}) => {
  // const { image, tag, identity, price_per_month, category, slug } = obj;
  return (
    <AppLink disabled={isAccessories} link={link} target="_blank">
      <div
        className={`max-w-[425px] relative flex flex-col cursor-pointer p-[5px] rounded-[10px] ${
          isAccessories ? "" : "product-box"
        }`}
      >
        <div
          className={` h-[134px] ${
            isAccessories ? "md:h-[250px]" : " md:h-[262px]"
          }`}
        >
          <AppImage
            src={image || ImagePlaceholder}
            className=" rounded-[10px] border opacity-90 border-[#DBDBDB] object-cover"
            priority={index < 4}
            layout="intrinsic"
          />
        </div>

        <div className="transition duration-300 ease-in-out duration-100 !bg-[#00000061] hover:!bg-[#00000072] w-full h-full absolute flex justify-center items-center top-0 left-0 rounded-[10px]">
          {/* <div
          className={`mb-[5px] ${
            isAccessories ? "md:my-[7px]" : "md:my-[10px]"
          }`}
        >
          <ProductTag isAccessories={isAccessories} text={tag} />
        </div> */}
          <Text
            text={identity}
            className={`text-ellipsis text-[#ffffff] overflow-hidden ${
              isAccessories
                ? "text-[8px] md:text-[15px]"
                : "text-[12px] md:text-[25px]"
            } font-bold capitalize whitespace-pre md:mb-[1px]`}
          />
          <div>
            {/* <Text
            className={`font-extrabold inline ${
              isAccessories
                ? "text-[12px] md:text-[20px]"
                : "text-[14px] md:text-[24px]"
            }`}
            text={`₹${price || 0}`}
          /> */}
          </div>
          {dontShowMonth ? (
            <Text
              className={`text-[10px] text-lightGray md:text-[16px] font-medium inline`}
              text="/month"
            />
          ) : null}
        </div>
      </div>
    </AppLink>
  );
};

export default ProductWithDetailsInside;
