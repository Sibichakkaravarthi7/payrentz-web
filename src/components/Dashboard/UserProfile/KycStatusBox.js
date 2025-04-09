import Text from "@/components/Text/Text";
import React from "react";

const KycStatusBox = ({ status }) => {
  const kycStatusArr = {
    reupload: {
      key: "reupload",
      display: "Re-upload Pending",
      color: "red",
    },
    verified: {
      key: "verified",
      display: "Verified",
      color: "green",
    },
    pending: {
      key: "pending",
      display: "Under Review",
      color: "yellow",
    },
    validated: {
      key: "pending",
      display: "Under Review",
      color: "yellow",
    },
    upload_pending: {
      key: "upload_pending",
      display: "Upload Pending",
      color: "yellow",
    },
  };

  // console.log("status", status);
  return (
    <div className="flex items-end justify-end">
      <div className="flex gap-[10px] items-center">
        <Text className={"text-[#858585]"}>Status :</Text>
        <Text
          className={`font-semibold ${kycStatusArr?.[status]?.color}-app-tag`}
        >
          {kycStatusArr?.[status]?.display}
        </Text>
      </div>
    </div>
  );
};

export default KycStatusBox;
