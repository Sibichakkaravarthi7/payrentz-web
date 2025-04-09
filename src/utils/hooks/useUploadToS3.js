import { useMutation } from "react-query";
import makePostRequest from "../makePostRequest";
import { UPLOAD_S3 } from "@/api/urls/urls";
import toast from "react-hot-toast";

const useUploadToS3 = (key, onSuccess, onError, isDocument = true) => {
  const {
    isLoading: s3IsLoading,
    isError: genOTPIsError,
    error: genOTPError,
    mutate: uploadToS3,
  } = useMutation((body) => makePostRequest(UPLOAD_S3(key, isDocument), body), {
    onSuccess: (res) => {
      onSuccess(res);
    },
    onError: (err) => {
      onError ? onError(err) : undefined;
      toast.error("Error uploading file!");
    },
  });

  return { uploadToS3, s3IsLoading };
};

export default useUploadToS3;
