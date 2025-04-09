"use client";
import { GET_PATCH_USER_DATA, POST_REUPLOAD_DOCUMENT } from "@/api/urls/urls";
import { DashboardContext } from "@/components/Dashboard/SmallLayoutComponent";
import UserProfile from "@/components/Dashboard/UserProfile/UserProfile";
import {
  kycOptions,
  kycOptionsForUserDashboard,
  ownHouseDocOptions,
  rentHouseDocOptions,
  selfEmployeeOptions,
} from "@/utils/Constants";
import useEditUserData from "@/utils/hooks/useEditUserData";
import makeGetRequest from "@/utils/makeGetRequest";
import makePostRequest from "@/utils/makePostRequest";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";

export const userDataContext = createContext();

function Page() {
  const [isEditOn, setIsEditOn] = useState(false);
  const [userData, setUserData] = useState();
  const { refetchUserDashboard } = useContext(DashboardContext);

  const [error, setError] = useState();
  const {
    data,
    isLoading: initialIsLoading,
    refetch,
  } = useQuery(
    [GET_PATCH_USER_DATA],
    () => makeGetRequest(GET_PATCH_USER_DATA),
    {
      onSuccess: (res) => {
        if (res?.occupation == "self_employed") {
          res.self_employee_id_type = selfEmployeeOptions?.filter(
            (f) => f?.value == res?.self_employee_id_type
          )?.[0];
        }
        if (res?.residency_type == "own_house") {
          res.own_house_proof_id_type = ownHouseDocOptions?.filter(
            (f) => f?.value == res?.own_house_proof_id_type
          )?.[0];
        }
        if (res?.residency_type == "rental_house") {
          res.rent_house_proof_id_type = rentHouseDocOptions?.filter(
            (f) => f?.value == res?.rent_house_proof_id_type
          )?.[0];
        }
        res.kyc_type = kycOptionsForUserDashboard?.filter(
          (f) => f?.value == res?.kyc_type
        )?.[0];
        setUserData(res);
      },
    }
  );

  const handleUserEditSuccess = (res) => {
    toast.success("Profile Updated Successfully!");
    setIsEditOn(false);
    refetch();
  };
  const handleUserEditError = (err) => {
    console.log(err);
    setIsEditOn(false);
  };

  const handleInputChange = (e, type, inputName) => {
    if (type == "select") {
      setUserData((prv) => ({ ...prv, [inputName]: e?.value }));
    } else {
      const { name, value } = e.target;

      let validatedValue = value;

      // Check if the input is for first name or last name
      if (name === "last_name" || name === "first_name") {
        // Check if the input is a valid alphabetic string
        const isAlphabeticWithSpaces = /^[A-Za-z\s]*$/.test(value);
        // If the input is not alphabetic, don't update the form data
        if (!isAlphabeticWithSpaces && value !== "") {
          return;
        }
        // Otherwise, update the form data
        validatedValue = value;
      }

      setUserData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
    }
    // console.log("eeee", e);
  };

  //Data Validation
  const handleValidation = () => {
    const err = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData?.email)) {
      err.email = { message: "Enter a valid email address" };
    }

    //Google maps validation
    const urlRegex =
      /\b(?:https?|ftp):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]/;
    if (!urlRegex.test(userData?.location_link)) {
      err.location_link = {
        message: "Enter a valid link e.g(https://www.google.com/maps/..)",
      };
    }

    //Phone number validation
    const phoneNumberRegex = /^\+91[1-9][0-9]{9}$/;
    if (!phoneNumberRegex.test(userData?.phone_number)) {
      err.phone_number = {
        message: "Enter a valid phone number (e.g., +91xxxxxxxxxx)",
      };
    }
    if (!phoneNumberRegex.test(userData?.alternative_phone_number)) {
      err.alternative_phone_number = {
        message: "Enter a valid phone number (e.g., +91xxxxxxxxxx)",
      };
    }

    if ([null, undefined, ""]?.includes(userData?.last_name)) {
      err.last_name = { message: "Enter a valid value" };
    }

    //last name Regex
    const nameRegex = /^[A-Za-z\s]*$/;
    if (!nameRegex.test(userData?.last_name)) {
      err.last_name = {
        message: "Enter a name without numbers and characters",
      };
    }

    // Pincode Regex
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(userData?.pincode)) {
      err.pincode = {
        message: "Enter a valid pincode",
      };
    }

    setError(err);
    if (Object.keys(err)?.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const { isLoading, mutate: profilePictureMutate } = useMutation(
    (body) => makePostRequest(POST_REUPLOAD_DOCUMENT, body),
    {
      onSuccess: (res) => {
        toast.success("KYC Document Updated Successfully");
        // console.log("response", res);
        refetch();
        refetchUserDashboard();
      },
      onError: (error) => {
        // console.log("error", error);
        toast.error("Something went wrong");
      },
    }
  );

  const handleSubmit = () => {
    if (handleValidation()) {
      const valToSubmit = {
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        phone_number: userData?.phone_number,
        alternative_phone_number: userData?.alternative_phone_number,
        gender: userData?.gender,
        martial_status: userData?.martial_status,
        floor_number: userData?.floor_number?.value || userData?.floor_number,
        lift_availability:
          String(userData?.lift_availability) == "true" ? true : false,
        address_city: userData?.address_city,
        address_line1: userData?.address_line1,
        address_line2: userData?.address_line2,
        address_state: userData?.address_state,
        pincode: parseInt(userData?.pincode),
        location_link: userData?.location_link,
      };
      // console.log("valToSubmit Final", valToSubmit);
      mutate(valToSubmit);

      profilePictureMutate({
        profile_pic: userData?.profile_pic?.id,
        type: "profile_pic",
      });
      // window.location.reload()
    }
  };

  const { isLoading: userUpdateIsLoading, mutate } = useEditUserData({
    onError: handleUserEditError,
    onSuccess: handleUserEditSuccess,
  });

  const providerValue = {
    userData,
    setUserData,
    error,
    setError,
    handleInputChange,
    isEditOn,
    setIsEditOn,
    refetch,
    mutate,
    isLoading,
    profilePictureMutate,
  };

  return (
    <userDataContext.Provider value={providerValue}>
      <UserProfile
        initialIsLoading={initialIsLoading}
        userData={userData}
        error={error}
        setError={setError}
        isEditOn={isEditOn}
        setIsEditOn={setIsEditOn}
        handleSubmit={handleSubmit}
        userUpdateIsLoading={userUpdateIsLoading}
      />
    </userDataContext.Provider>
  );
}

export default Page;
