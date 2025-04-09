"use client";
import React, { useState } from "react";
import AppImage from "../Image/AppImage";
// import { productImages } from "@/utils/Constants";
import AppModal from "../Modal/AppModal";
import useModal from "@/utils/hooks/useModal";
import ProductImageViewModal from "../Modal/ProductImageViewModal";

function ProductImages({ variantDetails }) {
  const [curSlide, setCurSlide] = useState(1);
  const { isOpen, onClose, onOpen } = useModal();

  const handleImageClick = (ind) => {
    setCurSlide(ind);
    onOpen();
  };
  // console.log("variant d", variantDetails);

  return (
    <div>
      <div className="grid-cols-2 hidden md:grid mt-[30px] gap-[20px]">
        {variantDetails?.image_detail?.slice(0, 4)?.map((item, ind) => {
          return (
            <div
              key={item?.file}
              className="border lg:max-w-[326px] md:w-[250px] md:h-[250px] lg:h-[290px] border-[#DBDBDB] rounded-[5px] relative !w-full"
            >
              {variantDetails?.image_detail?.length > 4 && ind == 3 ? (
                <div
                  onClick={() => handleImageClick(ind)}
                  className="flex absolute top-0 bottom-0 w-full bg-[#00000008] text-[#ffffffbd] z-[1] cursor-pointer text-[110px] font-[500] items-center justify-center"
                >
                  {`+${variantDetails?.image_detail?.length - 3}`}
                </div>
              ) : (
                <></>
              )}
              <AppImage
                onClick={() => handleImageClick(ind)}
                // width={300}
                // height={300}
                layout="fill"
                src={item?.file}
                alt={item?.file}
                loading="lazy"
                className=" rounded-[5px] cursor-pointer  max-w-[326px] max-h-[326px] mx-auto object-cover"
              />
            </div>
          );
        })}
      </div>
      <AppModal
        maxWidth="100vw"
        className="modal-image-view p-[0px] md:pt-[0px] bg-white bg-opacity-90"
        bodyClassName="py-[0px] px-[0px] bg-white relative"
        isOpen={isOpen}
        onClose={onClose}
        dismissible={true}
      >
        <ProductImageViewModal
          curSlide={curSlide}
          onClose={() => onClose()}
          images={variantDetails?.image_detail}
        />
      </AppModal>
    </div>
  );
}

export default ProductImages;
