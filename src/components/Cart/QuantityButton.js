import React, { useState } from "react";
import Text from "../Text/Text";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import makePutRequest from "@/utils/makePutRequest";
import { GET_CART_SUMMARY, MODIFY_QUANTITY_FOR_CART_ITEM_URL, MODIFY_VARIANT_TO_CART_URL } from "@/api/urls/urls";
import { ClipLoader } from "react-spinners";
import makePostRequest from "@/utils/makePostRequest";

const QuantityButton = ({ quantity = 1, variantUuid, accessoryUuid, refetch, isAccessories = false,cartItem }) => {
  const guestUuid = getCookie("guest_user_id");
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    (body) =>
      makePostRequest(MODIFY_VARIANT_TO_CART_URL, body),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: [GET_CART_SUMMARY],
        });
        refetch();
        // console.log(res);
      },
    },
  );

  // console.log("quantityquantity", cartItem)

  return (
    <div className="flex items-center gap-[5px] md:gap-[9px]">
      <button
        disabled={quantity === 1}
        onClick={() =>
          mutate({
            guest_uuid: guestUuid,
            change: "remove",
            type: isAccessories ? "accessories" : cartItem?.type == "Combo" ? "combo" : "variant",
            uuid: isAccessories ? accessoryUuid : cartItem?.type == "Combo" ? cartItem?.uuid : variantUuid,
          })
        }
        className={` ${quantity == 1 ? "disabled-quantity-btn" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <g clip-path="url(#clip0_1136_2136)">
            <path
              d="M7.5 0C3.36483 0 0 3.36425 0 7.5C0 11.6358 3.36483 15 7.5 15C11.6358 15 15 11.6358 15 7.5C15 3.36425 11.6352 0 7.5 0ZM7.5 13.8381C4.00503 13.8381 1.16188 10.995 1.16188 7.5C1.16188 4.00503 4.00503 1.16188 7.5 1.16188C10.995 1.16188 13.8381 4.00503 13.8381 7.5C13.8381 10.995 10.995 13.8381 7.5 13.8381Z"
              fill="#2D2D2D"
            />
            <path
              d="M10.4521 7.03906H4.61675C4.29464 7.03906 4.0332 7.30579 4.0332 7.63442C4.0332 7.96305 4.29464 8.22978 4.61675 8.22978H10.4521C10.7743 8.22978 11.0357 7.96305 11.0357 7.63442C11.0357 7.30579 10.7743 7.03906 10.4521 7.03906Z"
              fill="#2D2D2D"
            />
          </g>
          <defs>
            <clipPath id="clip0_1136_2136">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <Text
        className={
          "rounded-[5px] border border-[#DBDBDB] w-[27px] md:w-[40px] text-center py-[6px] md:py-[7px] text-[12px] md:text-[16px] font-[600]"
        }
      >
        {isLoading ? <ClipLoader size={"12px"} color={"#2B5CAB"} /> : quantity}
      </Text>

      <button
        onClick={() =>
          mutate({
            guest_uuid: guestUuid,
            change: "add-quantity",
            type: isAccessories ? "accessories" :  cartItem?.type == "Combo" ? "combo" : "variant",
            uuid: isAccessories ? accessoryUuid :  cartItem?.type == "Combo" ? cartItem?.uuid : variantUuid,
          })
        }
        disabled={quantity >= 3 || isLoading}
        className={` ${quantity === 3 ? "disabled-quantity-btn" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <g clip-path="url(#clip0_1136_2140)">
            <path
              d="M7.5 0C3.36425 0 0 3.36425 0 7.5C0 11.6358 3.36425 15 7.5 15C11.6358 15 15 11.6352 15 7.5C15 3.36483 11.6358 0 7.5 0ZM7.5 13.8381C4.00562 13.8381 1.16188 10.995 1.16188 7.5C1.16188 4.00503 4.00562 1.16188 7.5 1.16188C10.9944 1.16188 13.8381 4.00503 13.8381 7.5C13.8381 10.995 10.995 13.8381 7.5 13.8381Z"
              fill="#2D2D2D"
            />
            <path
              d="M10.406 6.86566H8.08226V4.54189C8.08226 4.22121 7.82258 3.96094 7.50131 3.96094C7.18004 3.96094 6.92035 4.22121 6.92035 4.54189V6.86566H4.59658C4.27531 6.86566 4.01562 7.12594 4.01562 7.44662C4.01562 7.7673 4.27531 8.02758 4.59658 8.02758H6.92035V10.3513C6.92035 10.672 7.18004 10.9323 7.50131 10.9323C7.82258 10.9323 8.08226 10.672 8.08226 10.3513V8.02758H10.406C10.7273 8.02758 10.987 7.7673 10.987 7.44662C10.987 7.12594 10.7273 6.86566 10.406 6.86566Z"
              fill="#2D2D2D"
            />
          </g>
          <defs>
            <clipPath id="clip0_1136_2140">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default QuantityButton;
