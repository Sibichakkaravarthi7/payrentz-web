import { GET_PATCH_USER_DATA, PATCH_USER_DATA } from "@/api/urls/urls";
import React from "react";
import { useMutation, useQuery } from "react-query";
import makeGetRequest from "../makeGetRequest";
import makePatchRequest from "../makePatchRequest";
import toast from "react-hot-toast";

const useEditUserData = ({ onSuccess, onError }) => {
  const { isLoading, mutate } = useMutation(
    (body) => makePatchRequest(PATCH_USER_DATA, body),
    {
      onSuccess: (res) => {
        onSuccess && onSuccess(res);
      },
      onError: (error) => {
        console.log("Error", error);
        onError && onError(error);
        const firstErrKey = Object.keys(error?.response?.data?.data)?.[0];
        toast.error(error?.response?.data?.data?.[firstErrKey]?.[0] || "Something went wrong");
      },
    }
  );

  return { isLoading, mutate };
};

export default useEditUserData;
