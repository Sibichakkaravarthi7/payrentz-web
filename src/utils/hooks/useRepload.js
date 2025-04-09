import { useMutation } from "react-query";
import makePostRequest from "../makePostRequest";
import { UPLOAD_S3, POST_REUPLOAD_DOCUMENT } from "@/api/urls/urls";
import toast from "react-hot-toast";

const useReupload = (
  key,
  onSuccessUpload,
  onSuccessReupload,
  onErrorUpload,
  onErrorReupload,
  isDocument = true
) => {
  const {
    isLoading: s3IsLoading,
    isError: s3IsError,
    error: s3Error,
    mutate: uploadToS3,
  } = useMutation(
    (body) => makePostRequest(UPLOAD_S3(key, isDocument), body),
    {
      onSuccess: (res) => {
        onSuccessUpload(res);
        // Extract the file ID from the response and pass it to the reupload mutation
        
        profilePictureMutate({
            profile_pic: res?.data?.id,
            type: "profile_pic"
        });
      },
      onError: (err) => {
        onErrorUpload ? onErrorUpload(err) : undefined;
        toast.error("Error uploading file!");
      },
    }
  );

  const {
    isLoading: reuploadIsLoading,
    isError: reuploadIsError,
    error: reuploadError,
    mutate: profilePictureMutate,
  } = useMutation((body) => makePostRequest(POST_REUPLOAD_DOCUMENT, body), {
    onSuccess: (res) => {
      onSuccessReupload(res);
    },
    onError: (error) => {
      onErrorReupload ? onErrorReupload(error) : undefined;
      toast.error("Error reuploading document!");
    },
  });

  return {
    uploadToS3,
    s3IsLoading,
    profilePictureMutate,
    reuploadIsLoading,
  };
};

export default useReupload;
