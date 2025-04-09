import { ticketCreateContext } from "@/app/dashboard/support/create/page";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import AppTextarea from "@/components/Textarea/AppTextarea";
import { getCurrentDate } from "@/utils/Constants";
import { Textarea } from "flowbite-react";
import React, { useContext } from "react";

function ServiceTicketType({
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
  // const productOptions = ticketData?.data?.subscriptions?.map((item, ind) => ({identity: item?.product_detail, id: ind}))
  const serviceTypeOptions = ticketData?.data?.service_type?.map((item) => ({
    identity: item,
    id: item,
  }));
  // console.log("product options", ticketProductDataOptions);
  return (
    <div>
      <div className="flex flex-col gap-[30px] pt-[30px] pb-[55px]">
        <LabelWrapper label={"Select Product *"}>
          <AppSelect
            name={"subscription"}
            options={ticketProductDataOptions}
            placeholder={"--Select--"}
            className={"ticket-select"}
            wrapperClassname={"max-w-[495px]"}
            isError={error}
            onChange={(value) => handleSelectChange("subscription", value)}
          />
        </LabelWrapper>
        <LabelWrapper label={"Select Service Type *"}>
          <AppSelect
            name={"service_type"}
            placeholder={"--Select--"}
            options={serviceTypeOptions}
            isError={error}
            className={"ticket-select"}
            wrapperClassname={"max-w-[495px]"}
            onChange={(value) =>
              handleSelectChange("service_type", value)
            }
          />
        </LabelWrapper>
        <LabelWrapper
          label={"Problem Description *"}
          className={"md:!max-w-[495px]"}
        >
          <AppTextarea
            name="description"
            isError={error}
            onChange={(e) => handleInputChange(e)}
            placeholder={"Enter a description"}
            className="border ticket-input border-[#E6E7E9] min-h-[70px] rounded-[5px]"
            />
          {/* <AppInput
            type="textarea"
            wrapperClassName="ticket-input"
            name="description"
            value={createdTicketData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="border ticket-input border-[#E6E7E9] min-h-[70px] rounded-[5px]"
          /> */}
        </LabelWrapper>
        <LabelWrapper
          label={"Schedule Date for Maintenance *"}
          className={"w-[50%] whitespace-nowrap md:!max-w-[220px]"}
        >
          <AppInput
            type="date"
            placeholder={""}
            name="schedule_date"
            value={createdTicketData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            min={getCurrentDate()}
            wrapperClassName="ticket-input"
            className="border ticket-input border-[#E6E7E9] rounded-[5px]"
          />
        </LabelWrapper>
      </div>
    </div>
  );
}

export default ServiceTicketType;
