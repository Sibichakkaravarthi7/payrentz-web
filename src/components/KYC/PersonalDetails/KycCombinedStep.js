import Text from "@/components/Text/Text";
import React, { useContext } from "react";
import Gender from "./Gender";
import MaritalStatus from "./MaritalStatus";
import ResidencyType from "../AddressDetails/ResidencyType";
import ProfessionalDetails from "@/components/Dashboard/UserProfile/ProfessionalDetails";
import Occupation from "../ProfessionalDetails/Occupation";
import RentForWhom from "../AddressDetails/RentForWhom";
import AppButton from "@/components/Button/AppButton";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";
import { isNoValue } from "@/utils/Constants";
import toast from "react-hot-toast";

function KycCombinedStep() {
  const { formData, setStep, isLoading, mutate, setFormData, step } =
    useContext(KycContext);

  const combinedStepsTopBlock = [
    {
      title: "Gender",
      comp: <Gender />,
    },
    {
      title: "Marital Status",
      comp: <MaritalStatus />,
    },
    {
      title: "Residential Status",
      comp: <ResidencyType />,
    },
  ];

  const combinedStepsBottomBlock = [
    {
      title: "Professional Details",
      comp: <Occupation />,
    },
    {
      title: "For Whom do you rent the product?",
      comp: <RentForWhom />,
    },
  ];

  const selectAllFieldsToast = () => {
    toast.error("Please select all the options");
  };

  const validateStep1 = () => {
    const isInvalid = [
      "gender",
      "martial_status",
      "residency_type",
      "occupation",
      "rent_for",
    ]?.some((m) => {
      return isNoValue(formData?.[m]);
    });
    // console.log("isInvalid", isInvalid);
    if (isInvalid) {
      selectAllFieldsToast();
      return false;
    } else {
      return true;
    }
  };

  const handleStepOneSubmit = () => {
    if (validateStep1()) {
      mutate({
        gender: formData?.gender,
        martial_status: formData?.martial_status,
        residency_type: formData?.residency_type,
        residency_documents: [],
        occupation: formData?.occupation,
        professional_document: [],
        rent_for: formData?.rent_for,
        steps_completed: 1,
      });
      // setStep("next");
      console.log("Yes we can go to next step!!!!!");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[6px] mb-[11px]">
        {combinedStepsTopBlock?.map((m) => (
          <div
            key={m?.title}
            className="!border border-transparent hover:border-appRed pl-[13px] pt-[9px] pr-[8px] pb-[20px] hover:bg-[#ED1F28] hover:bg-opacity-10 rounded-[10px] cursor-pointer"
          >
            <div className="flex mb-[20px] md:mb-[30px]">
              <div className="col-span-1">
                <Text
                  className={
                    "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
                  }
                >
                  {m?.title}
                </Text>
              </div>
              <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 md:mb-[10px] mb-[5px]"></div>
            </div>
            <div>{m?.comp}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
        {combinedStepsBottomBlock?.map((m) => (
          <div
            key={m?.title}
            className="!border border-transparent hover:border-appRed pl-[13px] pt-[9px] pr-[8px] pb-[20px] rounded-[10px] hover:bg-[#ED1F28] hover:bg-opacity-10 cursor-pointer"
          >
            <div className="flex mb-[20px] md:mb-[30px]">
              <div className="col-span-1">
                <Text
                  className={
                    "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
                  }
                >
                  {m?.title}
                </Text>
              </div>
              <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 md:mb-[10px] mb-[5px]"></div>
            </div>
            <div>{m?.comp}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full items-end mt-[10px]">
        <AppButton
          text={"Submit"}
          variant={"red"}
          className={"px-[20px]"}
          isLoading={isLoading}
          onClick={() => handleStepOneSubmit()}
        />
      </div>
    </div>
  );
}

export default KycCombinedStep;
