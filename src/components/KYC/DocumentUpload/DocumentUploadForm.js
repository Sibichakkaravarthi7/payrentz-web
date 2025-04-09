"use client";

import React, { useContext, useEffect, useState } from "react";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";
import ProfessionalDocumentsUpload from "./ProfessionalDocumentsUpload";
import ResidencyDocumentUpload from "./ResidencyDocumentUpload";
import BankDetailsVerification from "./BankDetailsVerification";
import PersonalDetailsVerification from "./PersonalDetailsVerification";
import AppButton from "@/components/Button/AppButton";
import toast from "react-hot-toast";
import PanDetailsVerification from "./PanDetailsVerification";

function DocumentUploadForm() {
  const isShowVerified = ["verified", "validated"];
  const [isPanOk, setIsPanOk] = useState(true);
  const [panName, setPanName] = useState("");

  const {
    formData,
    setFormData,
    setStep,
    step,
    error,
    setError,
    mutate,
    isLoading,
  } = useContext(KycContext);

  const [docVerify, setDocVerify] = useState({
    bank: isShowVerified?.includes(formData?.bank_kyc_verified) ? true : false,
    credit_score_status: isShowVerified?.includes(formData?.credit_score_status)
      ? true
      : false,
    kyc_verification_status: isShowVerified?.includes(
      formData?.kyc_verification_status
    )
      ? true
      : false,
  });

  const validateVerification = () => {
    if (!docVerify?.kyc_verification_status) {
      toast.error("Please Verify Personal Kyc Details");
      return false;
    }
    // if (!docVerify?.bank) {
    //   toast.error("Please Verify Bank Details");
    //   return false;
    // }
    return true;
  };

  // console.log(
  //   "formData?.kyc_typeformData?.kyc_type",
  //   formData?.kyc_type == "aadhaar" ? false : true
  // );

  const [showOtherKycs, setShowOtherKycs] = useState(
    isShowVerified?.includes(formData?.kyc_verification_status) &&
      (formData?.kyc_type == "aadhaar" ? false : true)
  );

  const [isRentalAvailable, setIsRentalAvailable] = useState(
    formData?.skip_residency
  );

  const handleValidation = () => {
    const err = {};
    let fieldsToCheck = [];

    //Bank and Pan fields
    const checkList = [
      // "bank_branch",
      // "account_holder_name",
      // "account_number",
      // "ifsc_code",
      "kyc_number",
      // "pan_id",
    ];

    // if (formData?.bank_name == null) {
    //   err.bank_name = { message: "Select a valid value" };
    // }

    // *******************  Profesison  ********************

    // If student, validate these fields
    if (formData?.occupation == "student") {
      const studentsField = [
        "parent_name",
        "parent_phone_number",
        "institute_name",
      ];

      if (!formData?.parent_relationship?.value) {
        err.parent_relationship = { message: "Select a valid value" };
      }

      fieldsToCheck = [...fieldsToCheck, ...studentsField];
    }

    // If working profession, validate these fields
    if (formData?.occupation == "working_professional") {
      const workingProffField = ["company_name", "designation"];

      fieldsToCheck = [...fieldsToCheck, ...workingProffField];
    }

    // ************************************************************

    //******************** Residency ********************

    // If user is from rental house, validate these fields
    // if (formData?.residency_type == "rental_house") {
    //   const rentalHouseFields = ["house_owner_name", "house_owner_mobile"];

    //   fieldsToCheck = [...fieldsToCheck, ...rentalHouseFields];
    // }

    // If user is from own house, validate these fields
    if (formData?.residency_type == "own_house") {
      const rentalHouseFields = ["own_house_proof_id_type"];

      fieldsToCheck = [...fieldsToCheck, ...rentalHouseFields];
    }

    [...fieldsToCheck, ...checkList]?.map((m) => {
      if ([null, "", undefined]?.includes(formData?.[m])) {
        err[m] = { message: "Enter a valid value" };
      }
    });

    if (!isRentalAvailable) {
      ["residency_documents"]?.map((m) => {
        if (formData?.[m]?.length == 0 || formData?.[m]?.length == undefined) {
          err[m] = { message: "This field is mandatory" };
        }
      });
    }

    ["professional_document"]?.map((m) => {
      if (formData?.[m]?.length == 0 || formData?.[m]?.length == undefined) {
        err[m] = { message: "This field is mandatory" };
      }
    });

    setError(err);
    if (Object.keys(err)?.length > 0) {
      return false;
    } else {
      if (validateVerification()) return true;
    }
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const dataToSubmit = {
        // aadhaar_number: formData?.aadhaar_number,
        // pan_number: formData?.pan_number,
        bank_name: formData.bank_name?.value,
        bank_branch: formData?.bank_branch,
        account_holder_name: formData?.account_holder_name,
        account_number: formData?.account_number,
        ifsc_code: formData?.ifsc_code,
        residency_kyc_verified:
          isRentalAvailable == true ? "upload_pending" : "pending",
        skip_residency: isRentalAvailable,
        professional_kyc_verified: "pending",
      };

      if (formData?.occupation == "student") {
        dataToSubmit.parent_name = formData?.parent_name;
        dataToSubmit.parent_relationship = formData?.parent_relationship?.value;
        dataToSubmit.parent_phone_number = `+91${formData?.parent_phone_number}`;
        dataToSubmit.institute_name = formData?.institute_name;
      }

      if (formData?.occupation == "working_professional") {
        dataToSubmit.company_name = formData?.company_name;
        dataToSubmit.designation = formData?.designation;
      }

      if (formData?.occupation == "self_employed") {
        dataToSubmit.self_employee_id_type =
          formData?.self_employee_id_type?.value;
      }

      // if (formData?.residency_type == "rental_house") {
      //   dataToSubmit.house_owner_name = formData?.house_owner_name;
      //   dataToSubmit.house_owner_mobile = `+91${formData?.house_owner_mobile}`;
      // }

      if (formData?.residency_type == "own_house") {
        dataToSubmit.own_house_proof_id_type =
          formData?.own_house_proof_id_type?.value;
      }

      if (formData?.residency_type == "rental_house") {
        dataToSubmit.rent_house_proof_id_type =
          formData?.rent_house_proof_id_type?.value;
      }

      dataToSubmit.professional_document = formData?.professional_document?.map(
        (m) => m?.id
      );
      dataToSubmit.residency_documents = formData?.residency_documents?.map(
        (m) => m?.id
      );

      dataToSubmit.steps_completed = step;

      // console.log("dataToSubmit", dataToSubmit);
      mutate(dataToSubmit);
    }
  };

  useEffect(() => {
    if (Object.keys(error)?.length > 0) {
      const errorElements = document.getElementsByName(Object.keys(error)?.[0]);
      const firstErrorElement = errorElements?.[0];
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [error]);

  // console.log("errrror", error);

  return (
    <div className="fade-in flex-1 !w-full gap-[30px] md:gap-[1px] flex flex-col">
      <PersonalDetailsVerification
        docVerify={docVerify}
        setDocVerify={setDocVerify}
        showOtherKycs={showOtherKycs}
        setShowOtherKycs={setShowOtherKycs}
        error={error}
        setError={setError}
        isPanOk={isPanOk}
        setIsPanOk={setIsPanOk}
        panName={panName}
        setPanName={setPanName}
      /> 
      <PanDetailsVerification
        docVerify={docVerify}
        setDocVerify={setDocVerify}
        showOtherKycs={showOtherKycs}
        setShowOtherKycs={setShowOtherKycs}
        error={error}
        setError={setError}
        isPanOk={isPanOk}
        setIsPanOk={setIsPanOk}
        panName={panName}
        setPanName={setPanName}
      />
      <ProfessionalDocumentsUpload />
      <ResidencyDocumentUpload
        isRentalAvailable={isRentalAvailable}
        setIsRentalAvailable={setIsRentalAvailable}
      />
      <BankDetailsVerification
        docVerify={docVerify}
        setDocVerify={setDocVerify}
      />

      <div className="flex justify-end w-full items-end mt-[62px]">
        <AppButton
          text={"Next"}
          variant={"red"}
          className={"px-[20px]"}
          isLoading={isLoading}
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
}

export default DocumentUploadForm;
