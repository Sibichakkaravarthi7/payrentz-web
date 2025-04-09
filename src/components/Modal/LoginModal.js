"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import AppImage from "../Image/AppImage";
import { LoginModalPic } from "@/Icons";
import LoginStepsContainer from "../Login/LoginStepsContainer";
import { makeRequest } from "@/utils/makeRequest";
import {
  GET_NEW_USER_DATA_URL,
  GET_USER_TICKETS,
  LOGIN_URL,
  VALIDATE_OTP_URL,
} from "@/api/urls/urls";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";
import useAppStore from "@/Store/Store";
import { cookieAge } from "@/utils/Constants";
import { useMutation, useQueryClient } from "react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { GET_OTP } from "../../api/urls/urls";
import makeGetRequest from "../../utils/makeGetRequest";

const LoginModal = ({ onClose }) => {
  const searchParams = useSearchParams();
  const redirectPhone = searchParams.get("phone");
  const redirectPage = searchParams.get("redirect");
  const redirectsto = searchParams.get("redirectsto");
  const router = useRouter();
  // const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({ phone: redirectPhone || "" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const guest_user_id = getCookie("guest_user_id");
  const { setUserDataAndToken } = useAppStore();
  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
  };

  const saveUserTokenAndData = async (res) => {
    // console.log("res?.data?.user", res?.data?.user);
    queryClient.invalidateQueries({ queryKey: [GET_USER_TICKETS] });
    setUserDataAndToken({
      user_data: res?.data?.user,
      token: res?.data?.token,
      kyc_step_completed: res?.data?.kyc_step_completed,
    });
    setCookie("user_token", res?.data?.token, { maxAge: cookieAge });
    setCookie("user_data", res?.data?.user, { maxAge: cookieAge });
    onClose();
  };

  const { isLoading, mutate } = useMutation(
    (body) => makeGetRequest(GET_OTP(body?.uuid)),
    {
      onSuccess: (res) => {
        console.log(res);
        setStep(1);
      },
      onError: (err) => {},
    }
  );

  // useLayoutEffect(() => {
  //   console.log("before if in useeffect", isOTPSent?.current);
  //   if (redirectPage && redirectPhone && isOTPSent.current == false) {
  //     // setFormData((prv) => ({ ...prv, phone: redirectPhone }));
  //     console.log("After if in useeffect", isOTPSent?.current);
  //     handleValidatePhoneNumber();
  //     isOTPSent.current = true;
  //   }
  //   console.log("After if after useeffect", isOTPSent?.current);
  // }, []);

  const handleIsNewCustomer = async (res) => {
    //If existing customer stop with current
    if (res?.data?.token) {
      await saveUserTokenAndData(res);
    }
    //Collect other data if new customer
    else {
      setStep(2);
    }
  };

  const handleValidatePhoneNumber = () => {
    setLoading(true);
    makeRequest({
      url: LOGIN_URL,
      method: "POST",
      data: {
        phone_number: `+91${formData?.phone}`,
        // recaptcha_token: recaptcha_token
      },
    })
      .then((res) => {
        setLoading(false);

        console.log(res?.data);
        mutate({ uuid: res?.data?.detail });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err?.response?.data?.message || "Invalid mobile number.");
      });
  };

  const handleValidateOTP = () => {
    setLoading(true);
    makeRequest({
      url: VALIDATE_OTP_URL,
      method: "POST",
      data: {
        phone_number: `+91${formData?.phone}`,
        otp: formData?.otp,
        guest_uuid: guest_user_id,
      },
    })
      .then((res) => {
        setLoading(false);
        handleIsNewCustomer(res);

        if (redirectsto) {
          console.log("first", res?.data?.token);
          router.push(`/dashboard/invoices/?key=${res?.data?.token}`);
        }

        if (redirectPage) {
          router.push(redirectPage);
        }
        // deleteCookie("guest_user_id");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err?.response?.data?.data?.detail);
      });
  };

  const handleNewCustomerData = () => {
    setLoading(true);
    makeRequest({
      url: GET_NEW_USER_DATA_URL,
      method: "POST",
      data: {
        phone_number: `+91${formData?.phone}`,
        first_name: formData?.first_name,
        email: formData?.email,
        guest_uuid: guest_user_id,
      },
    })
      .then((res) => {
        setLoading(false);
        saveUserTokenAndData(res);
        // deleteCookie("guest_user_id");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err?.response?.data?.data?.detail);
        toast.error(
          err?.response?.data?.data?.detail || "Something went wrong!"
        );
      });
  };

  return (
    <div className="rounded-[20px] normal-variant-numeric">
      <div className="flex gap-[60px] items-center">
        <AppImage
          height={295}
          width={295}
          className="hidden md:block max-w-[295px]"
          src={LoginModalPic}
          loading="lazy"
        />
        <div className="w-full">
          <LoginStepsContainer
            handleInputChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
            step={step}
            handleValidatePhoneNumber={handleValidatePhoneNumber}
            handleValidateOTP={handleValidateOTP}
            handleNewCustomerData={handleNewCustomerData}
            loading={loading || isLoading}
          />
          {/* <AppButton onClick={handleSubmitForm} text={"Check"} /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
