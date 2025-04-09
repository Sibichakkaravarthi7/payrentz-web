import { ticketCreateContext } from "@/app/dashboard/support/create/page";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import AppTextarea from "@/components/Textarea/AppTextarea";
import React, { useContext } from "react";

function NameTransferTicketType({
  ticketData,
  error,
  handleInputChange,
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
            placeholder={"Check box for selection of multiple products"}
            options={ticketProductDataOptions}
            className={"ticket-select"}
            name="subscription"
            wrapperClassname={"max-w-[495px]"}
            isError={error}
            onChange={(value) => handleSelectChange("subscription", value)}
          />
        </LabelWrapper>
        <LabelWrapper label={"Transfer To *"} className={"md:!max-w-[495px]"}>
          <AppInput
            type="input"
            placeholder={"Enter Name"}
            name="transfer_customer_first_name"
            value={createdTicketData}
            onChange={(e) => handleInputChange(e)}
            wrapperClassName="ticket-input"
            isError={error}
            className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
          />
        </LabelWrapper>
        <LabelWrapper label={"Phone Number *"} className={"md:!max-w-[495px]"}>
          <AppInput
            type="input"
            placeholder={""}
            name="transfer_customer_phone"
            value={createdTicketData}
            onChange={(e) => handleInputChange(e)}
            wrapperClassName="ticket-input"
            maxLength={10}
            isError={error}
            className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
          />
        </LabelWrapper>
        <LabelWrapper label={"Email ID *"} className={"md:!max-w-[495px]"}>
          <AppInput
            type="input"
            placeholder={""}
            name="transfer_customer_email"
            value={createdTicketData}
            onChange={(e) => handleInputChange(e)}
            wrapperClassName="ticket-input"
            isError={error}
            className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[8px] rounded-[5px]"
          />
        </LabelWrapper>
        <LabelWrapper label={"Reason *"} className={"md:!max-w-[495px]"}>
          <AppTextarea
            name="transfer_customer_reason"
            isError={error}
            onChange={(e) => handleInputChange(e)}
            placeholder={"Enter a description"}
            className="border ticket-input border-[#E6E7E9] min-h-[70px] rounded-[5px]"
          />
        </LabelWrapper>
      </div>
    </div>
  );
}

export default NameTransferTicketType;
