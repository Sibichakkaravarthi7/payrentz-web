import { KycContext } from '@/app/(kycLayout)/kyc/layout';
import AppUpload from '@/components/FileUpload/AppUpload';
import AppInput from '@/components/Input/AppInput';
import LabelWrapper from '@/components/Login/LabelWrapper';
import AppSelect from '@/components/Select/AppSelect';
import Text from '@/components/Text/Text';
import React, { useContext } from 'react'
import {
  ownHouseDocOptions,
  rentHouseDocOptions,
} from "@/utils/Constants";
import AppLabel from '@/components/Label/AppLabel';

function ResidencyDocumentUpload({isRentalAvailable, setIsRentalAvailable}) {
  const {
    formData,
    setFormData,
    error,
    setError,
    mutate,
    isLoading,
  } = useContext(KycContext);

  const handleInputChange = (e) => {
    setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
  };

  // console.log("set rental agreement", isRentalAvailable);

  return (
    <div>
      <div className="flex mb-[20px] md:mb-[30px] mt-[20px] md:mt-[40px]">
        <div className="col-span-1">
          <Text
            className={
              "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
            }
          >
            Residential Details
          </Text>
        </div>
        <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 md:mb-[10px] mb-[5px]"></div>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-x-[20px] gap-y-[5px] md:gap-y-[20px] md:gap-x-[46px] md:grid-cols-6 items-center">
        {formData?.residency_type == "own_house" ? (
          <div className="col-span-4 md:col-span-2 w-full">
            <LabelWrapper className={"w-full"}>
            <AppSelect
              name={"own_house_proof_id_type"}
              label={"Support Document *"}
              labelClassName={"!z-[6]"}
              classNamePrefix={"kyc-select"}
              placeholder={"Select Document"}
              onChange={(e) =>
                setFormData((prv) => ({
                  ...prv,
                  own_house_proof_id_type: e,
                }))
              }
              value={formData}
              isError={error}
              className={"!text-[16px] z-[5]"}
              dontAlterOptions
              options={
                formData?.residency_type == "rental_house"
                  ? rentHouseDocOptions
                  : ownHouseDocOptions
              }
            />
            </LabelWrapper>
          </div>
        ) : (
          <div className="col-span-4 md:col-span-2 w-full">
            <LabelWrapper className={"w-full"}>
            <AppSelect
              name={"rent_house_proof_id_type"}
              label={"Support Document *"}
              labelClassName={"!z-[6]"}
              classNamePrefix={"kyc-select"}
              placeholder={"Select Document"}
              onChange={(e) =>
                setFormData((prv) => ({
                  ...prv,
                  rent_house_proof_id_type: e,
                }))
              }
              value={formData}
              isError={error}
              className={"!text-[16px] z-[5]"}
              dontAlterOptions
              options={
                formData?.residency_type == "rental_house"
                  ? rentHouseDocOptions
                  : ownHouseDocOptions
              }
            />
            </LabelWrapper>
          </div>
          // <Text
          //   className={"col-span-2 flex text-[12px] mb-[10px] md:mb-0 md:text-[16px] items-end font-medium text-[#1D1D1D]"}
          // >
          //   Rental Agreement/Utility Bills/Others
          // </Text>
        )}
        <div className="col-span-4 flex flex-col md:flex-row items-start gap-[20px] md:gap-0 md:items-center">
          <div className="col-span-2 md:min-w-[370px] min-w-[340px]">
            <AppUpload
              keyToSet={"residency_documents"}
              folderName={"residency-kyc"}
              state={formData}
              setState={setFormData}
              isError={error}
              disabled={formData?.residency_documents?.length > 0 || isRentalAvailable}
            />
          </div>
        </div>
        {
          formData?.residency_type == "rental_house" ? (
            <div className="flex gap-[20px] mt-[20px] items-center">
          <AppInput
            disabled={formData?.residency_documents?.length > 0}
            type="checkbox"
            name=""
            isError={error}
            id="no_rental_agreement"
            wrapperClassName="!w-fit"
            className="!w-[20px] ml-[11px] h-[20px]"
            onChange={(e) => {
              // setFormData((p) => ({ ...p, kyc_number: "" }));
              setIsRentalAvailable(e?.target?.checked);
            }}
            checked={isRentalAvailable}
          />
          <AppLabel
            text={"I do not possess a rental agreement or address proof now, but I undertake to submit it within 30 days. "}
            htmlFor={"no_rental_agreement"}
            className={
              `md:whitespace-nowrap font-medium cursor-pointer text-[14px] md:!text-[16px] ml-[0px] ${formData?.residency_documents?.length > 0 ? "text-[#858585]" : ""}`
            }
          />
        </div>
          ) : null
        }
      </div>
      {/* {formData?.residency_type == "rental_house" ? (
        <div className="flex flex-col md:flex-row w-full gap-[20px] md:gap-[45px] mt-[25px]">
          <LabelWrapper
            className={"w-full max-w-[355px] relative"}
            label={"House Owner Name *"}
            labelClassName={"document-label-position !pb-[0px]"}
          >
            <AppInput
              name="house_owner_name"
              placeholder="Enter House Owner Name"
              className="app-form-input app-input py-[12px]"
              onChange={(e) => handleInputChange(e)}
              isError={error}
              value={formData}
            />
          </LabelWrapper>
          <LabelWrapper
            className={"w-full max-w-[355px] relative"}
            label={"House Owner Phone Number *"}
            labelClassName={"document-label-position !pb-[0px]"}
          >
            <AppInput
              name="house_owner_mobile"
              placeholder="Enter House Owner Phone Number"
              className="app-form-input py-[12px]"
              onChange={(e) => handleInputChange(e)}
              isError={error}
              value={formData}
              maxLength={10}
            />
          </LabelWrapper>
        </div>
      ) : null} */}
    </div>
  )
}

export default ResidencyDocumentUpload;
