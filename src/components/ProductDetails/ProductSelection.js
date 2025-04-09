"use client";
import React, { useEffect, useState } from "react";
import TenureDetails from "./TenureDetails";
import Charges from "./Charges";
import AddvantagesIcons from "./AddvantagesIcons";
import Link from "next/link";
import Text from "../Text/Text";
import AppInput from "../Input/AppInput";
import AppButton from "../Button/AppButton";
import AppModal from "../Modal/AppModal";
import useModal from "@/utils/hooks/useModal";
import PickTenureModal from "../Modal/PickTenureModal";
import toast from "react-hot-toast";
import { makeRequest } from "@/utils/makeRequest";
import {
  GET_CART_COUNT,
  GET_CART_SUMMARY,
  GET_VARIANT_CHECK,
  MODIFY_VARIANT_TO_CART_URL,
} from "@/api/urls/urls";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { SET_VARIANT_VIEW_PATH, getUserAuthHeader } from "@/utils/Constants";
import { useQuery, useQueryClient } from "react-query";
import useAppStore from "@/Store/Store";
import makePostRequest from "@/utils/makePostRequest";
import AppLoader from "../Loader/AppLoader";
import {
  Accept,
  BlueTickIcon,
  CancelIcon,
  CancelRedIcon,
  TickCircleIcon,
  TickIcon,
} from "@/Icons";
import AppImage from "../Image/AppImage";
import { trackAddToCartEvent } from "../Thirdparty/GoogleEventTracker";
import { usePathname } from "next/navigation";

function ProductSelection({ variantDetail, seoTag = "" }) {
  const category = variantDetail?.category_detail;
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0];
  const tenureAvailableMonths = [12, 6, 3, 1]?.find(
    (item) => variantDetail?.[`tenure_${item}`]
  );
  const selectedDepositAmount = [12, 6, 3, 1]?.find(
    (item) => variantDetail?.[`deposit_${item}`]
  );
  // console.log("tenure available", tenureAvailableMonths);
  const [selectedTenure, setSelectedTenure] = useState(tenureAvailableMonths);
  // console.log("selected tenure", selectedTenure);
  const { isOpen, onOpen, onClose } = useModal();
  const [loading, setLoading] = useState({
    rentNow: false,
    addToCart: false,
  });
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [isPincodeAvail, setIsPincodeAvail] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const router = useRouter();
  const { pincode } = useAppStore();

  const postAddToCart = (uuid, navigateToCart = false) => {
    setLoading({
      rentNow: navigateToCart ? true : false,
      addToCart: navigateToCart ? false : true,
    });
    const guest_id = getCookie("guest_user_id");

    makeRequest({
      url: MODIFY_VARIANT_TO_CART_URL,
      method: "POST",
      headers: getUserAuthHeader(),
      data: {
        guest_uuid: guest_id,
        change: "add",
        tenure: selectedTenure,
        type: variantDetail?.data_type,
        uuid: uuid,
      },
    })
      .then(async (res) => {
        if (typeof window) {
          trackAddToCartEvent(
            selectedDepositAmount + parseInt(variantDetail?.handling_charge),
            selectedDepositAmount,
            variantDetail
          );
        }
        queryClient.invalidateQueries({ queryKey: [GET_CART_COUNT] });
        queryClient.invalidateQueries({ queryKey: [GET_CART_SUMMARY] });
        if (navigateToCart) router.push(`/${cleanPathname}/cart`);
        setLoading({
          rentNow: false,
          addToCart: false,
        });
        setIsAddedToCart(true);
        toast.success("Added to Cart!");
      })
      .catch((err) => {
        setLoading({
          rentNow: false,
          addToCart: false,
        });
        console.log("error", err);
        toast.error("Something went wrong!");
        setError(err);
      });
  };
  // console.log("pincode", pincode);

  const { data: deliveryCheck, isLoading } = useQuery(
    [GET_VARIANT_CHECK, pincode, variantDetail?.uuid],
    () =>
      makePostRequest(GET_VARIANT_CHECK, {
        pincode: pincode,
        uuid: variantDetail?.uuid,
      }),
    {
      onSuccess: (clg) => {
        console.log(clg);
      },
      onError: (err) => {
        console.log(err);
      },
      enabled: isPincodeAvail,
    }
  );
  // console.log("pincode", pincode);
  // console.log("variantDetail", variantDetail?.uuid);
  // console.log("deliveryCheck", deliveryCheck?.data);
  // console.log("pincode",pincode == "");

  // console.log("deliveryCheck?.data", deliveryCheck?.data, isLoading);
  useEffect(() => {
    if (pincode != "") {
      setIsPincodeAvail(true);
    }
  }, [pincode]);
  return (
    <div className="mt-[30px] lg:w-[620px] md:w-[590px]">
      <div className="py-[15px] px-[20px]">
        <Text className={"text-[24px] md:text-[32px] font-extrabold"}>
          {variantDetail?.identity}
        </Text>
        {seoTag && (
          <Text
            as="h1"
            className={"text-[18px] pt-[5px] md:text-[18px] font-normal"}
          >
            {seoTag}
          </Text>
        )}
      </div>
      <div className="w-auto px-[20px] md:px-[20px] rounded-[10px] bg-[#F3F7FF]">
        <div className="flex justify-between md:justify-end py-[20px]">
          <Text className={"md:hidden text-[18px] font-bold"}>Pick Tenure</Text>
          <div
            onClick={() => onOpen()}
            className="text-[14px] font-bold text-[#2B5CAB] underline cursor-pointer"
          >
            Compare Tenure
          </div>
        </div>
        <TenureDetails
          selectedTenure={selectedTenure}
          setSelectedTenure={setSelectedTenure}
          variantDetail={variantDetail}
        />
        <Charges
          selectedTenure={selectedTenure}
          variantDetail={variantDetail}
        />
        <AddvantagesIcons />
      </div>
      {/* <div className="px-[20px] bg-[#FFFFFF] py-[16px] md:py-[0px] md:px-[5px] mt-0 md:mt-[30px]">
        <Text className={"text-[#858585] text-[15px]"}>
          Enter your PIN code to check availability of product in your location
        </Text>
        <div className="flex items-center mt-[10px] gap-[10px]">
          <AppInput
            type="input"
            name="pincode"
            wrapperClassName="!max-w-[201px] md:!max-w-[245px]"
            className="border border-[#E6E7E9] w-full  rounded-[5px] p-[12px] md:!py-[10px] md:!px-[13px]"
            placeholder={"600001"}
          />
          <AppButton
            text={"Check availabilty"}
            className={
              " whitespace-nowrap md:!text-[16px] !text-[12px] md:!py-[6px] md:!px-[20px]"
            }
            variant={"blackOutline"}
          />
        </div>
      </div> */}
      {deliveryCheck?.data != false && (
        <div>
          <div className="hidden md:flex mt-[30px] w-full gap-[0px] md:gap-[10px] px-[5px] ">
            <AppButton
              isLoading={loading?.rentNow || isLoading || pincode == ""}
              text={"Rent Now"}
              className={"px-[40px] py-[20px] w-full border border-appRed"}
              wrapperClassName={"flex-[1]"}
              variant={"red"}
              onClick={() => postAddToCart(variantDetail?.uuid, true)}
            />
            <AppButton
              color="#ED1F28"
              isLoading={loading?.addToCart || isLoading || pincode == ""}
              text={isAddedToCart ? "Explore" : "Add To Cart"}
              className={"px-[40px] py-[20px] w-full flex-[1]"}
              wrapperClassName={"flex-[1]"}
              variant={"redOutline"}
              onClick={() =>
                isAddedToCart
                  ? variantDetail?.data_type == "combo"
                    ? router.push("/combo")
                    : router.push(SET_VARIANT_VIEW_PATH(category?.slug))
                  : postAddToCart(variantDetail?.uuid)
              }
            />
          </div>
        </div>
      )}
      {deliveryCheck?.data != undefined ? (
        deliveryCheck?.data ? (
          <div className="px-6 py-3 md:p-5 flex items-center gap-3">
            <AppImage
              className="max-h-[20px] max-w-[20px] "
              src={Accept}
              loading="lazy"
            />{" "}
            <Text className={"font-semibold"}>
              Deliverable for this pincode.
            </Text>
          </div>
        ) : (
          <div className="px-6 py-3 md:p-5 flex items-center gap-3">
            <AppImage
              className="min-h-[20px] min-w-[20px]"
              src={CancelRedIcon}
              loading="lazy"
            />{" "}
            <Text className={"font-semibold"}>
              {" "}
              Not deliverable for this pincode.
            </Text>
          </div>
        )
      ) : (
        ""
      )}

      {/* Button for mobile view */}
      {deliveryCheck?.data != false && (
        <div className="flex w-full md:hidden fixed bottom-0 z-[9]">
          <AppButton
            isLoading={loading?.rentNow || isLoading}
            text={"Rent Now"}
            className={
              "!px-[52px] !py-[20px] !text-[18px] whitespace-nowrap w-full border !rounded-none border-appRed"
            }
            wrapperClassName={"flex-[1]"}
            variant={"red"}
            onClick={() => postAddToCart(variantDetail?.uuid, true)}
          />
          <AppButton
            color="#ED1F28"
            isLoading={loading?.addToCart || isLoading}
            text={isAddedToCart ? "Explore" : "Add To Cart"}
            className={
              "!px-[52px] !py-[20px] !text-[18px] whitespace-nowrap !rounded-none w-full flex-[1]"
            }
            wrapperClassName={"flex-[1]"}
            variant={"redOutline"}
            onClick={() =>
              isAddedToCart
                ? SET_VARIANT_VIEW_PATH(category?.slug)
                : postAddToCart(variantDetail?.uuid)
            }
          />
        </div>
      )}
      <AppModal
        className="pick-tenure-modal p-[20px] pt-[50%] md:pt-[0px]"
        bodyClassName="py-[30px] px-[15px] md:py-[63px] md:px-[46px]"
        isOpen={isOpen}
        onClose={onClose}
        dismissible={true}
      >
        <PickTenureModal
          selectedTenure={selectedTenure}
          setSelectedTenure={setSelectedTenure}
          variantDetail={variantDetail}
          onClose={onClose}
        />
      </AppModal>
    </div>
  );
}

export default ProductSelection;
