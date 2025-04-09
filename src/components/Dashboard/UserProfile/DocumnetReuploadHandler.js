import { POST_REUPLOAD_DOCUMENT } from "@/api/urls/urls";
import { userDataContext } from "@/app/dashboard/user-profile/page";
import AppButton from "@/components/Button/AppButton";
import AppUpload from "@/components/FileUpload/AppUpload";
import LabelWrapper from "@/components/Login/LabelWrapper";
import Text from "@/components/Text/Text";
import makePostRequest from "@/utils/makePostRequest";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { DashboardContext } from "../SmallLayoutComponent";

const DocumnetReuploadHandler = ({ keyToSet, folderName }) => {
  const { refetch } = useContext(userDataContext);
  const { refetchUserDashboard } = useContext(DashboardContext);
  const [img, setImg] = useState([]);

  // console.log("imggg", img);

  const { isLoading, mutate } = useMutation(
    (body) => makePostRequest(POST_REUPLOAD_DOCUMENT, body),
    {
      onSuccess: (res) => {
        toast.success("KYC Document Updated Successfully");
        // console.log("response", res);
        refetch();
        refetchUserDashboard();
      },
      onError: (error) => {
        console.log("error", error);
        toast.error("Something went wrong");
      },
    }
  );

  return (
    <div className="w-full md:w-[49%] flex-col md:flex-row flex items-end gap-[20px]">
      <LabelWrapper
        label={"Document Re-upload Required!*"}
        labelClassName={
          "!text-[16px] !font-medium text-appRed !font-[700] w-full"
        }
        className={"w-full h-[100%]"}
      >
        <AppUpload
          keyToSet={keyToSet}
          folderName={folderName}
          state={img}
          setState={setImg}
          // isError={error}
        />
      </LabelWrapper>
      <AppButton
        onClick={() =>
          mutate({
            type: keyToSet,
            [keyToSet]: img?.[keyToSet]?.map((m) => m?.id),
          })
        }
        isLoading={isLoading}
        disabled={img?.length == 0}
        variant={"red"}
        text={"Submit"}
        className={"!text-[16px]"}
        wrapperClassName={"self-start md:self-end"}
      />
    </div>
  );
};

export default DocumnetReuploadHandler;
