"use client";
import React, { createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "react-query";
import axios from "axios";
import { VERIFY_RECAPTCHA } from "@/api/urls/urls";

const GoogleReCaptcha = ({ setCaptchaValue, error, setCaptchaErr }) => {
  const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "uat";

  const recaptcha_site_key = isProd
    ? "6LfTER0qAAAAAA40PrjOkd6DkAWWy_2dMIjlC-oz"
    : "6LdfEh0qAAAAAILcTtQdnQao2zETjctGUkKCNkw1";
  const recaptcha_secret_key = isProd
    ? "6LfTER0qAAAAAK4VVu0-S2iK-DZdBRVqNSHMCUVh"
    : "6LdfEh0qAAAAAKt7qZwKsC7AKBSszUC9tx_0WfZC";

  const recaptchaRef = createRef();

  const { isLoading, mutate: verifyCaptcha } = useMutation(
    async (body) =>
      await axios({
        url: VERIFY_RECAPTCHA(body?.secret_key, body?.captcha),
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      }),
    {
      onSuccess: async (response) => {
        const res = await response.json();
        // console.log("Verify resss", res);
      },
      onError: (err) => {
        console.log("error in verifying captcha with exception:-", err);
      },
    }
  );

  const asyncScriptOnLoad = () => {
    console.log("Google recaptcha loaded just fine");
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaErr("");
    const body = {
      secret_key: recaptcha_secret_key,
      captcha: value,
    };
    verifyCaptcha(body);
  };

  return (
    <div className="flex flex-col items-start">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={recaptcha_site_key}
        asyncScriptOnLoad={asyncScriptOnLoad}
        onChange={handleCaptchaChange}
      />
      {error && <p className="text-[#ff3333] text-xs mt-[1px]">{error}</p>}
    </div>
  );
};

export default GoogleReCaptcha;
