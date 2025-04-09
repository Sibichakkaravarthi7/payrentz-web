import React, { useContext, useEffect, useState } from "react";
import AppButton from "../Button/AppButton";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";
import useAppStore from "@/Store/Store";
import { convertToPrice } from "@/utils/Constants";
import { trackAddPaymentInfo } from "../Thirdparty/GoogleEventTracker";

const CartStepButton = ({ setStep, step }) => {
  const [isUserLogging, setIsUserLogging] = useState(false);
  const {
    summaryData,
    cartData,
    accessoriesData,
    updateUserIsLoading,
    mutateUserData,
    formData,
    setError,
    triggerPayment,
    isMakePaymentLoading,
  } = useContext(CartContext);
  const { user_data, openLoginModal } = useAppStore();

  //Use Effect to automatically take the user to 2nd step post logging in via "Continue" btn click
  useEffect(() => {
    if (user_data?.first_name && isUserLogging) {
      setStep(2);
    }
  }, [user_data]);

  const handleStep1 = () => {
    // console.log("checkkk", user_data?.first_name)
    if (user_data?.first_name) {
      setStep((prv) => prv + 1);
    } else {
      setIsUserLogging(true);
      openLoginModal();
    }
  };

  const handleStep2 = () => {
    setStep(3);
  };

  const handleStep3 = () => {
    if (handleValidateStep3Form()) {
      const dataToPost = {
        floor_number:
          formData?.lift_availability == "no"
            ? formData?.floor_number > 3
              ? 0
              : Math.max(0, formData?.floor_number)
            : formData?.floor_number,
        address_city: formData?.address_city,
        address_line1: formData?.address_line1,
        address_line2: formData?.address_line2,
        address_state: formData?.address_state,
        pincode: formData?.pincode,
        lift_availability: formData?.lift_availability === "yes",
      };
      mutateUserData(dataToPost);
    } else {
      console.log("has error");
    }
  };

  const handleStep4 = () => {
    setStep(5);
  };

  const handleValidateStep3Form = () => {
    const errorVar = {};
    const fields = [
      "floor_number",
      "address_line1",
      "address_line2",
      "address_city",
      "address_state",
      "pincode",
    ];
    // console.log("formData", formData);
    fields?.map((m) => {
      if ([null, ""]?.includes(formData?.[m])) {
        errorVar[m] = { message: "Enter a valid value" };
      }
    });
    setError(errorVar);
    if (Object.keys(errorVar)?.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleContinue = () => {
    if (step == 1) handleStep1();
    if (step == 2) handleStep2();
    if (step == 3) handleStep3();
    // if (step == 4) handleStep3();
  };

  const handleTrackForPaymentInfo = () => {
    trackAddPaymentInfo(cartData?.data, accessoriesData?.data?.results);
  };

  const isBtnDisabled = cartData?.data?.length == 0;
  return (
    <>
      {step != 1 && step != 4 ? (
        // {step != 1 ? (
        <AppButton
          className={
            "w-full md:mt-[16px] md:mt-[20px] !py-[15px] md:!py-[17px]"
          }
          wrapperClassName={"flex-[1]"}
          variant="redOutline"
          text={"Back"}
          onClick={() => setStep((prv) => prv - 1)}
          disabled={step === 1}
        />
      ) : null}
      <AppButton
        className={
          "w-full md:mt-[16px] md:mt-[20px] !py-[15px] md:!py-[17px] cart-button"
        }
        wrapperClassName={"flex-[1]"}
        variant="red"
        text={
          step == 4
            ? `Pay ${convertToPrice(summaryData?.data?.total_payable)}`
            : "Continue"
        }
        onClick={() => {
          if (step == 4) {
            handleTrackForPaymentInfo();
            triggerPayment({});
          } else {
            handleContinue();
          }
        }}
        disabled={isBtnDisabled}
        isLoading={updateUserIsLoading || isMakePaymentLoading}
      />
    </>
  );
};

export default CartStepButton;
