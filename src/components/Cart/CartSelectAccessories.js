import React, { useContext, useState } from "react";
import ProductBoxView from "../productBoxView/ProductBoxView";
import Text from "../Text/Text";
import AppButton from "../Button/AppButton";
import { TickCircleIcon } from "@/Icons";
import AppImage from "../Image/AppImage";
import {
  GET_CART_ACCESSORY_LIST,
  GET_CART_COUNT,
  GET_CART_ITEMS_URL,
  GET_CART_SUMMARY,
  MODIFY_VARIANT_TO_CART_URL,
} from "@/api/urls/urls";
import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "@/utils/makeRequest";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";
import { getUserAuthHeader } from "@/utils/Constants";
import toast from "react-hot-toast";
import makePostRequest from "@/utils/makePostRequest";
import LoaderLayout from "../Layout/LoaderLayout";
import QuantityButton from "./QuantityButton";

const CartSelectAccessories = ({
  obj,
  accessories,
  setAccessories,
  refetch,
}) => {
  const [error, setError] = useState(null);
  const isSelected = accessories?.some((item) => item?.id === obj?.id);

  const guest_id = getCookie("guest_user_id");
  const queryClient = useQueryClient();
  const {
    accessoriesData,
    setAccessoriesToCart,
    accessoriesToCart,
    cartData,
    isCartAccessoriesDataLoading,
  } = useContext(CartContext);

  const { mutate: accessoryMutate, isLoading: isSelectedAccessoryLoading } =
    useMutation((body) => makePostRequest(MODIFY_VARIANT_TO_CART_URL, body), {
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: [GET_CART_ACCESSORY_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [GET_CART_SUMMARY],
        });
        // toast.success("Added to Cart!");
        // console.log("accessory adding", res);
      },
      onError: (err) => {
        toast.error("errror!!");
      },
    });

  const isAdded = obj?.is_in_cart;
  // console.log("is addedd", obj?.is_in_cart);

  const handleSelect = (obj) => {
    if (isSelected) {
      setAccessories(accessories?.filter((item) => item?.id !== obj?.id));
    } else {
      // console.log("obj", obj);
      setAccessories((prev) => [...prev, obj]);
    }
    accessoryMutate({
      guest_uuid: guest_id,
      change: isAdded ? "delete" : "add",
      tenure: 1,
      type: "accessories",
      uuid: obj?.uuid,
    });
  };

  // console.log("acessorrrrrriiiiissss", accessories);
  // console.log("isSelected isAdded", isSelected, isAdded);

  return (
    <div className="max-w-[270px] rounded-[5px] pt-0 md:pt-[5px] pb-[16px] px-[9px] relative ">
      <ProductBoxView
        image={obj?.image_detail?.[0]?.file || obj?.image}
        tag={obj?.tag || "newly added"}
        identity={obj?.identity}
        price={obj?.rent_1 || obj?.rent_12 || obj?.price_with_gst}
        link={""}
        obj={obj}
        key={obj?.id}
        isAccessories
        dontShowMonth
      />
      <Text
        className={
          "text-[#858585] font-[700] text-[8px] md:text-[11px]  pt-[0px] md:pt-[2px] pb-[8px] md:pb-[10px]"
        }
      >
        {obj?.commonly_brought}
      </Text>

      {isAdded ? (
        <div className="relative z-[9] flex flex-col gap-[6px] md:gap-[10px] justify-center">
          <div className="flex items-center md:mt-0 mt-[-20px] justify-between">
            <Text
              className={
                "text-appBlue font-semibold !text-[11px] md:!text-[15px]"
              }
            >
              Quantity
            </Text>
            <QuantityButton
              isAccessories={true}
              accessoryUuid={obj?.uuid}
              refetch={refetch}
              quantity={obj?.quantity}
            />
          </div>
          <AppButton
            wrapperClassName={"relative z-[9]"}
            className={
              "!text-[11px] md:!text-[15px] w-full h-[25px] md:h-[35px] !text-[10px] md:!text-[15px]"
            }
            variant={"blue"}
            text={isAdded ? "Remove from Cart" : "Add To Cart"}
            onClick={() => handleSelect(obj)}
            isLoading={isSelectedAccessoryLoading}
          />
        </div>
      ) : (
        <>
          <AppButton
            wrapperClassName={"relative z-[9]"}
            className={
              "!text-[11px] md:!text-[15px] w-full h-[25px] md:h-[35px] !text-[10px] md:!text-[15px]"
            }
            variant={"blue"}
            text={isAdded ? "Remove from Cart" : "Add To Cart"}
            onClick={() => handleSelect(obj)}
            isLoading={isSelectedAccessoryLoading}
          />
        </>
      )}

      {isAdded ? (
        <div className="bg-[#DFE9FD] opacity-[0.75] absolute top-0 left-0 right-0 bottom-0 rounded-[5px] border border-appBlue cart-accessories-selected">
          <div className="flex flex-col items-center mt-[-20px] md:mt-0 justify-center h-full relative z-[9]">
            <AppImage
              src={TickCircleIcon}
              loading="lazy"
              alt="tick-circle-icon"
            />
            <Text className="text-appBlue text-[16px] md:text-[20px] font-[700]">
              Added To Cart
            </Text>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartSelectAccessories;
