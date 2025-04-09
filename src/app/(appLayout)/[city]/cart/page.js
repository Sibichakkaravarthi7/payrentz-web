"use client";
import useAppStore from "@/Store/Store";
import {
  GET_ADDED_CART_ACCESSORY_LIST,
  GET_CART_ACCESSORY_LIST,
  GET_CART_ITEMS_URL,
  GET_CART_SUMMARY,
  GET_PATCH_USER_DATA,
  MODIFY_VARIANT_TO_CART_URL,
  PATCH_USER_DATA,
  POST_VERIFY_PAYMENT,
} from "@/api/urls/urls";
import CartOrderSummary from "@/components/Cart/CartOrderSummary";
import CartSteps from "@/components/Cart/CartSteps";
import MobileCartSummary from "@/components/Cart/MobileCartSummary";
import AppContainer from "@/components/Container/AppContainer";
import {
  trackAddShippingInfo,
  trackBeginCheckoutEvent,
  trackPurchaseEvent,
} from "@/components/Thirdparty/GoogleEventTracker";
import useCartPayment from "@/utils/hooks/useCartPayment";
import makeGetRequest from "@/utils/makeGetRequest";
import makePatchRequest from "@/utils/makePatchRequest";
import makePostRequest from "@/utils/makePostRequest";
import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const CartContext = createContext();

const Page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [error, setError] = useState();
  const [accessoriesToCart, setAccessorieToCart] = useState(false);
  const userToken = getCookie("user_token");
  const { kyc_step_completed, summaryEnabled, setSummaryEnabled } =
    useAppStore();
  const isKycCompleted = kyc_step_completed == 8;
  const queryClient = useQueryClient();

  const [couponState, setCouponState] = useState(undefined);
  const coupon_number = getCookie("coupon_number");

  const {
    data,
    isLoading: cartIsLoading,
    refetch: refetchCart,
  } = useQuery(
    [GET_CART_ITEMS_URL],
    () => {
      const guestId = getCookie("guest_user_id");
      return makeGetRequest(GET_CART_ITEMS_URL, {
        guest_uuid: guestId,
      });
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: [GET_CART_SUMMARY],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const transRef = useRef(null);

  const { isLoading: isMakeVerifyPaymentLoading, mutate: verifyApi } =
    useMutation(
      (body) => {
        transRef.current = body;
        return makePostRequest(POST_VERIFY_PAYMENT(body?.uuid), body?.payload);
      },
      {
        onSuccess: (res) => {
          const { current } = transRef;
          trackPurchaseEvent(data?.data, current);
          // console.log("Verify resss", res);
        },
      }
    );

  const { triggerPayment, isLoading: isMakePaymentLoading } = useCartPayment({
    verifyApi: verifyApi,
    isKycCompleted: parseInt(kyc_step_completed) == 4 ? true : false,
  });

  // console.log("isKycCompleted", kyc_step_completed, isKycCompleted);

  const { isLoading: isGetUserDataLoading, refetch } = useQuery(
    [GET_PATCH_USER_DATA],
    () => makeGetRequest(GET_PATCH_USER_DATA),
    {
      onSuccess: (res) => {
        setFormData(res);
      },
      onError: (err) => {
        console.log(err);
      },
      enabled: step == 3,
    }
  );

  const { isLoading, mutate } = useMutation(
    (body) => makePatchRequest(PATCH_USER_DATA, body),
    {
      onSuccess: (res) => {
        setStep(4);
      },
      onError: (err) => {
        if (step == 3) {
          toast.error(
            err?.response?.data?.data?.error ||
              "Currently not serviced" ||
              "Something went wrong!"
          );
          return;
        } else {
          toast.error("Something went wrong!");
        }
      },
    }
  );

  const {
    isLoading: isCartAccessoriesDataLoading,
    data: accessoriesData,
    refetch: refetchAccessories,
  } = useQuery(
    [GET_CART_ACCESSORY_LIST],
    () => makeGetRequest(GET_CART_ACCESSORY_LIST, {})
    // {
    //   onSuccess: (res) => {
    //     console.log("acessoryyyyyyyyyyyyyyyyy dataaaaaa", res);
    //   },
    // }
  );

  const { data: summaryData, refetch: summaryRefetch } = useQuery(
    [GET_CART_SUMMARY],
    () => {
      const guestId = getCookie("guest_user_id");
      return makeGetRequest(GET_CART_SUMMARY, {
        guest_uuid: guestId,
        applied_coupon_id: couponState ? couponState : "",
      });
    },
    {
      // onSuccess: (res) => {
      //   console.log("summary data", res);
      // },
      enabled: summaryEnabled,
    }
  );

  useEffect(() => {
    if (step === 3) {
      trackBeginCheckoutEvent(data?.data, accessoriesData?.data?.results);
    }
    if (step === 4) {
      trackAddShippingInfo(data?.data, accessoriesData?.data?.results);
    }
  }, [step]);

  const contextValue = {
    step,
    setStep,
    cartData: data,
    cartIsLoading,
    refetchCart,
    formData,
    setFormData,
    error,
    setError,
    updateUserIsLoading: isLoading || isGetUserDataLoading,
    mutateUserData: mutate,
    triggerPayment,
    isMakePaymentLoading,
    accessoriesData,
    isCartAccessoriesDataLoading,
    accessoriesToCart,
    setAccessorieToCart,
    summaryData,
    refetchAccessories,
    summaryRefetch,
  };

  useEffect(() => {
    setCouponState(coupon_number);
  }, [coupon_number]);

  useEffect(() => {
    setSummaryEnabled(true);
  }, [couponState]);
  useEffect(() => {
    summaryRefetch();
    refetchAccessories();
  }, [step]);
  return (
    // <Layout>
    <div className="relative">
      <CartContext.Provider value={contextValue}>
        <AppContainer>
          <div className="flex gap-[16px] md:gap-[20px] mt-[20px] md:mt-[30px]">
            <div className="flex-1">
              <CartSteps step={step} setStep={setStep} />
            </div>

            {/* order summary */}
            <div className="basis-[450px] hidden md:block self-start sticky md:top-[150px]">
              <CartOrderSummary />
            </div>
          </div>
        </AppContainer>

        {/* Mobile Cart */}
        <MobileCartSummary step={step} setStep={setStep} />
      </CartContext.Provider>
    </div>
    // </Layout>
  );
};

export default Page;
