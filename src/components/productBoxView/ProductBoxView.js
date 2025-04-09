import React from "react";
import AppImage from "../Image/AppImage";
import ProductTag from "../ProductTag";
import Text from "../Text/Text";
import AppLink from "../Link/AppLink";
import { ImagePlaceholder } from "@/Icons";

const ProductBoxView = ({
  obj,
  dontShowMonth = false,
  isAccessories = false,
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
        className={` max-w-[295px] flex flex-col cursor-pointer p-[5px] rounded-[10px] ${
          isAccessories ? "" : "product-box"
        }`}
      >
        <div
          className={`h-[134px] ${
            isAccessories ? "md:h-[250px]" : " md:h-[262px]"
          } relative`}
        >
          <AppImage
            layout="fill"
            src={image || ImagePlaceholder}
            srcSet={image || ImagePlaceholder}
            className=" rounded-[10px] border border-[#DBDBDB] object-cover "
            loading="lazy"
            alt={identity}
          />
        </div>

        <div
          className={`mb-[5px] ${
            isAccessories ? "md:my-[7px]" : "md:my-[10px]"
          }`}
        >
          <ProductTag isAccessories={isAccessories} text={tag} />
        </div>
        <Text
          text={identity}
          className={`text-ellipsis overflow-hidden ${
            isAccessories
              ? "text-[8px] md:text-[15px]"
              : "text-[10px] md:text-[18px]"
          } font-bold capitalize whitespace-pre md:mb-[1px]`}
        />
        <div>
          <Text
            className={`font-extrabold inline ${
              isAccessories
                ? "text-[12px] md:text-[20px]"
                : "text-[14px] md:text-[24px]"
            }`}
            text={`₹${price || 0}`}
          />
          {!dontShowMonth ? (
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

export default ProductBoxView;
