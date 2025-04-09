import React, { useState } from "react";
import ProductBoxView from "../productBoxView/ProductBoxView";
import Text from "../Text/Text";
import AppButton from "../Button/AppButton";
import LoaderLayout from "../Layout/LoaderLayout";
import AppImage from "../Image/AppImage";
import { TickCircleIcon } from "@/Icons";
import { getCookie } from "cookies-next";
import { MODIFY_VARIANT_TO_CART_URL } from "@/api/urls/urls";
import { getUserAuthHeader } from "@/utils/Constants";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

function CartAddedAccessories({ obj, accessories, setAccessories }) {
  const [error, setError] = useState(null);
  const isAdded = accessories?.some((item) => item?.id === obj?.id);
  const queryClient = useQueryClient();

  // const removeAndAddToCart = (uuid, obj) => {
  //     const guest_id = getCookie("guest_user_id");

  //     makeRequest({
  //       url: MODIFY_VARIANT_TO_CART_URL(uuid),
  //       method: "POST",
  //       headers: getUserAuthHeader(),
  //       data: {
  //         guest_uuid: guest_id,
  //         change: isAdded ? "remove" : "add",
  //         tenure: 1,
  //       },
  //     })
  //       .then(async (res) => {
  //         queryClient.invalidateQueries({
  //           queryKey: [GET_CART_ITEMS_URL],
  //         });
  //         if (isAdded) {
  //           setAccessories(accessories?.filter((item) => item?.id !== obj?.id));
  //         } else {
  //           console.log("obj", obj);
  //           toast.success("Added to Cart!");
  //           setAccessories((prev) => [...prev, obj]);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("error", err);
  //         toast.error("Something went wrong!");
  //         setError(err);
  //       });
  //   };
  return (
    <div className="max-w-[270px] rounded-[5px] pt-0 md:pt-[5px] pb-[16px] px-[9px] relative  ">
      <ProductBoxView
        image={obj?.image_detail?.[0]?.file || obj?.image}
        tag={obj?.tag || "newly added"}
        identity={obj?.identity}
        price={obj?.rent_1 || obj?.rent_12 || obj?.price}
        link={""}
        obj={obj}
        key={obj?.id}
        isAccessories
      />
      <Text
        className={
          "text-[#858585] font-[700] text-[8px] md:text-[11px]  pt-[0px] md:pt-[2px] pb-[8px] md:pb-[10px]"
        }
      >
        {obj?.commonly_brought}
      </Text>
      <AppButton
        wrapperClassName={"relative z-[9]"}
        className={
          "!text-[11px] md:!text-[15px] w-full h-[25px] md:h-[35px] !text-[10px] md:!text-[15px]"
        }
        variant={"blue"}
        text={isAdded ? "Add To Cart" : "Remove From Cart"}
        onClick={() => {}}
      />
      <div className="bg-[#DFE9FD] opacity-[0.75] absolute top-0 left-0 right-0 bottom-0 rounded-[5px] border border-appBlue cart-accessories-selected">
        <div className="flex flex-col items-center justify-center h-full relative z-[9]">
          <AppImage
            src={TickCircleIcon}
            alt="tick-circle-icon"
            loading="lazy"
          />
          <Text className="text-appBlue text-[16px] md:text-[20px] font-[700]">
            Added To Cart
          </Text>
        </div>
      </div>
    </div>
  );
}

export default CartAddedAccessories;
