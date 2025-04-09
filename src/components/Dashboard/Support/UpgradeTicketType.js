import { ticketCreateContext } from "@/app/dashboard/support/create/page";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import Text from "@/components/Text/Text";
import { getCurrentDate } from "@/utils/Constants";
import { Textarea } from "flowbite-react";
import React, { useContext } from "react";

function UpgradeTicketType({ticketData, handleInputChange, error, handleSelectChange}) {
  const {mutate, setCreatedTicketData, createdTicketData} = useContext(ticketCreateContext)
  
  const ticketProductOptions = ticketData?.data?.subscriptions;

const ticketProductDataOptions = ticketProductOptions?.map((subscription) => {
  const productDetails = subscription?.product_details;
  
  return {
    identity: productDetails,
    id: subscription?.id
  };
});
  
  return (
    <div>
      <div className="flex flex-col gap-[30px] pt-[30px] pb-[55px]">
        <div className="grid grid-cols-1 gap-[30px] md:gap-0 md:grid-cols-2">
          <LabelWrapper label={"Select Product *"}>
            <AppSelect
              options={ticketProductDataOptions}
              wrapperClassname={"max-w-[495px]"}
              placeholder={"--Select--"}
              className={"ticket-select"}
              name="subscription"
              isError={error}
              onChange={(value) => handleSelectChange("subscription", value)}
            />
          </LabelWrapper>
          <LabelWrapper label={"Select Upgraded Product *"}>
            <AppSelect
              options={[
                {
                  identity:
                    "Appliances - Washing Machine - Washing Machine (6 Kgs)",
                  id: 90,
                },
              ]}
              placeholder={"--Select--"}
              className={"ticket-select"}
              wrapperClassname={"max-w-[495px]"}
            />
          </LabelWrapper>
        </div>
        <LabelWrapper label={"Reason *"}>
          <AppSelect
            placeholder={"--Select--"}
            className={"ticket-select"}
            wrapperClassname={"max-w-[495px]"}
          />
        </LabelWrapper>
        <LabelWrapper
          label={"Reason Description *"}
          className={"md:!max-w-[495px]"}
        >
          
          <AppInput
            type="textarea"
            wrapperClassName="ticket-input"
            name="description"
            value={createdTicketData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
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
            name="schedule_pickup_date"
            value={createdTicketData}
            onChange={(e) => handleInputChange(e)}
            min={getCurrentDate()}
            isError={error}
            wrapperClassName="ticket-input"
            className="border ticket-input border-[#E6E7E9] rounded-[5px]"
          />
        </LabelWrapper>
        <div className="flex">
          <div className="">
            <Text className={"text-[#858585] whitespace-nowrap font-bold"}>
              Schedule Delivery
            </Text>
          </div>
          <div className="ml-[9px] w-full col-span-5 border-[#E6E7E9] border-b-2 mb-[10px]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[40px] w-[50%]">
          <LabelWrapper
            label={"Schedule Date for Delivery *"}
            className={"whitespace-nowrap md:!max-w-[230px]"}
          >
            <AppInput
              type="date"
              placeholder={""}
              wrapperClassName="ticket-input"
              name="schedule_date"
              value={createdTicketData}
              isError={error}
              min={getCurrentDate()}
              onChange={(e) => handleInputChange(e)}
              className="border ticket-input border-[#E6E7E9] rounded-[5px]"
            />
          </LabelWrapper>
          <LabelWrapper
            label={"Schedule Date for Installation *"}
            className={"whitespace-nowrap md:!max-w-[230px]"}
          >
            <AppInput
              type="date"
              placeholder={""}
              name="schedule_installation_date"
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
    </div>
  );
}

export default UpgradeTicketType;
