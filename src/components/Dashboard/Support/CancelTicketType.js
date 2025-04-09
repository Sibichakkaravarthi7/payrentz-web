import { ticketCreateContext } from "@/app/dashboard/support/create/page";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import Text from "@/components/Text/Text";
import AppTextarea from "@/components/Textarea/AppTextarea";
import { getCurrentDate } from "@/utils/Constants";
import React, { useContext } from "react";

function CancelTicketType({
  ticketData,
  handleInputChange,
  error,
  handleSelectChange,
}) {
  const { mutate, setCreatedTicketData, createdTicketData } =
    useContext(ticketCreateContext);

  const ticketProductOptions = ticketData?.data?.subscriptions;

  const ticketProductDataOptions = ticketProductOptions?.map((subscription) => {
    const productDetails = subscription?.product_details;

    return {
      identity: productDetails,
      id: subscription?.id,
    };
  });
  return (
    <div>
      <div className="flex flex-col gap-[30px] pt-[30px] pb-[55px]">
        <LabelWrapper label={"Select Product *"}>
          <AppSelect
            options={ticketProductDataOptions}
            placeholder={"--Select--"}
            className={"ticket-select"}
            wrapperClassname={"max-w-[495px]"}
            name="subscription"
            isError={error}
            onChange={(value) => handleSelectChange("subscription", value)}
          />
        </LabelWrapper>
        {/* <LabelWrapper label={"Reason *"}>
          <AppSelect
            placeholder={"--Select--"}
            className={"ticket-select"}
            wrapperClassname={"max-w-[495px]"}
            isError={error}
            // onChange={(value) => handleSelectChange("subscription", value)}
          />
        </LabelWrapper> */}
        <LabelWrapper
          label={"Reason Description *"}
          className={"md:!max-w-[495px]"}
        >
          <AppTextarea
            name="description"
            isError={error}
            onChange={(e) => handleInputChange(e)}
            placeholder={"Enter a description"}
            className="border ticket-input border-[#E6E7E9] min-h-[70px] rounded-[5px]"
          />
        </LabelWrapper>
        <div className="flex">
          <div className="">
            <Text className={"text-[#858585] whitespace-nowrap font-bold"}>
              Schedule Pickup
            </Text>
          </div>
          <div className="ml-[9px] w-full col-span-5 border-[#E6E7E9] border-b-2 mb-[10px]"></div>
        </div>
        <LabelWrapper
          label={"Schedule Date for Pickup *"}
          className={"w-[50%] md:!max-w-[230px]"}
        >
          <AppInput
            type="date"
            placeholder={""}
            wrapperClassName="ticket-input"
            name="schedule_pickup_date"
            value={createdTicketData}
            isError={error}
            min={getCurrentDate()}
            onChange={(e) => handleInputChange(e)}
            className="border ticket-input border-[#E6E7E9] rounded-[5px]"
          />
        </LabelWrapper>
      </div>
    </div>
  );
}

export default CancelTicketType;
