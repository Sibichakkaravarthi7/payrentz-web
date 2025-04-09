import React from "react";
import Text from "../Text/Text";
import AppButton from "../Button/AppButton";
import AppImage from "../Image/AppImage";
import { ImagePlaceholder, Laptop1 } from "@/Icons";
import makePostRequest from "@/utils/makePostRequest";
import { useMutation, useQueryClient } from "react-query";
import { GET_CART_COUNT, MODIFY_VARIANT_TO_CART_URL } from "@/api/urls/urls";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { trackRemoveFromCart } from "../Thirdparty/GoogleEventTracker";

const ConformRemovefromCartModal = ({
  onClose,
  selectedVariant,
  refetchCart,
}) => {
  // console.log("cart variant", selectedVariant)
  const varUuid = selectedVariant?.uuid;
  const guestUuid = getCookie("guest_user_id");
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    (body) => makePostRequest(MODIFY_VARIANT_TO_CART_URL, body),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: [GET_CART_COUNT] });
        refetchCart();
        onClose();
        toast.success("Item removed from cart");
      },
    }
  );

  return (
    <div className=" ">
      <div className=" flex gap-[25px]">
        <div className="w-full max-w-[75px] md:max-w-[109px] h-[76px] md:h-[104px] relative border border-[#DBDBDB] rounded-[5px]">
          <AppImage
            className="rounded-[5px]"
            src={selectedVariant?.image || ImagePlaceholder}
            layout="fill"
            loading="lazy"
          />
        </div>
        <div className="py-[10px] flex flex-col">
          <Text
            className={"text-[12px] md:text-[18px] font-bold"}
          >{`Are you sure want to remove the product from cart?`}</Text>
          <div className="flex  gap-[10px] md:mt-[18px] mt-[10px]">
            <AppButton
              className={
                "!text-[10px] md:!text-[12px] !py-[3px] md:h-[30px] h-[20px]"
              }
              onClick={() => onClose()}
              text={"Cancel"}
              variant={"red"}
            />
            <AppButton
              className={
                "!text-[10px] md:!text-[12px] !py-[3px] md:h-[30px] h-[20px]"
              }
              variant={"redOutline"}
              text={"Remove"}
              isLoading={isLoading}
              color="#2B5CAB"
              onClick={() => {
                trackRemoveFromCart(selectedVariant);
                mutate({
                  guest_uuid: guestUuid,
                  change: "delete",
                  uuid: varUuid,
                  type: selectedVariant?.type?.toLowerCase(),
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformRemovefromCartModal;
