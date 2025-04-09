import { ticketCreateContext } from "@/app/dashboard/support/create/page";
import AppInput from "@/components/Input/AppInput";
import AppLink from "@/components/Link/AppLink";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import Text from "@/components/Text/Text";
import { getCurrentDate } from "@/utils/Constants";
import { Label } from "flowbite-react";
import React, { useContext } from "react";

function RelocationTicketType({
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

  
  const pincodeOptions = ticketData?.data?.pincodes;
  const pincodeDataOptions = pincodeOptions?.map(function (item) {
    return {
      id: item?.id,
      identity: item?.pincode
    };
  });
  // console.log("pincodeOptionssssss", pincodeDataOptions)

  const cityOptions = ticketData?.data?.cities;

  return (
    <div>
      <div className="flex flex-col gap-[30px] pt-[30px] pb-[55px]">
        <div>
          <LabelWrapper label={"Select Product *"}>
            <AppSelect
              placeholder={"Check box for selection of multiple products"}
              options={ticketProductDataOptions}
              className={"ticket-select"}
              wrapperClassname={"max-w-[495px]"}
              name="subscription"
              isError={error}
              onChange={(value) => handleSelectChange("subscription", value)}
            />
          </LabelWrapper>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px]">
          <LabelWrapper label={"New Address Line 1 *"}>
            <AppInput
              type="input"
              placeholder={""}
              name="customer_new_address_1"
              value={createdTicketData}
              onChange={(e) => handleInputChange(e)}
              isError={error}
              wrapperClassName="ticket-input"
              className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
            />
          </LabelWrapper>
          <LabelWrapper label={"New Address Line 2 *"}>
            <AppInput
              type="input"
              placeholder={""}
              name="customer_new_address_2"
              value={createdTicketData}
              isError={error}
              onChange={(e) => handleInputChange(e)}
              wrapperClassName="ticket-input"
              className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
            />
          </LabelWrapper>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px]">
          <LabelWrapper label={"City *"}>
          <AppSelect
              placeholder={"Check box for selection of multiple products"}
              options={cityOptions}
              className={"ticket-select"}
              wrapperClassname={"max-w-[495px]"}
              name="city"
              isError={error}
              onChange={(value) => handleSelectChange("city", value)}
            />
            {/* <AppInput
              type="input"
              placeholder={""}
              name="city"
              isError={error}
              value={createdTicketData}
              onChange={(e) => handleInputChange(e)}
              wrapperClassName="ticket-input"
              className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
            /> */}
          </LabelWrapper>
          <LabelWrapper label={"State *"}>
            <AppInput
              type="input"
              placeholder={""}
              name="state"
              isError={error}
              value={createdTicketData}
              onChange={(e) => handleInputChange(e)}
              wrapperClassName="ticket-input"
              className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
            />
          </LabelWrapper>
        </div>
        <div className="grid grid-cols-1 gap-[20px] w-full md:grid-cols-2">
          <LabelWrapper label={"Pincode *"}>
          <AppSelect
              placeholder={"Select the pincode"}
              options={pincodeDataOptions}
              className={"ticket-select"}
              wrapperClassname={"max-w-[495px]"}
              name="property_pincode"
              isError={error}
              onChange={(value) => handleSelectChange("property_pincode", value)}
            />
            {/* <AppInput
              type="input"
              placeholder={""}
              name="property_pincode"
              value={createdTicketData}
              isError={error}
              onChange={(e) => handleInputChange(e)}
              wrapperClassName="ticket-input"
              className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
            /> */}
          </LabelWrapper>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Label className="text-[12px] md:text-[18px] font-semibold">
                Google Map Location Link *
              </Label>
              <Text
                text={"Open Maps"}
                onClick={() => window.open("https://www.google.com/maps/")}
                className={
                  "text-[#2B5CAB] cursor-pointer underline text-[12px] md:text-[16px] font-medium"
                }
              />
            </div>
            <AppInput
              type="input"
              wrapperClassName="ticket-input"
              name="google_location_link"
              value={createdTicketData}
              isError={error}
              onChange={(e) => handleInputChange(e)}
              className="pl-[10px] ticket-input !text-[16px] py-[6px] border rounded-[5px] mt-[10px]"
              placeholder={""}
            />
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px]">
                  <LabelWrapper label={"Map Latitude *"}>
                    <AppInput
                      type="input"
                      placeholder={""}
                      wrapperClassName="ticket-input"
                      className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
                    />
                  </LabelWrapper>
                  <LabelWrapper label={"Map Longitude *"}>
                    <AppInput
                      type="input"
                      placeholder={""}
                      wrapperClassName="ticket-input"
                      className="border ticket-input border-[#E6E7E9] !text-[16px] py-[6px] pl-[10px] rounded-[5px]"
                    />
                  </LabelWrapper>
                </div> */}

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
          labelClassName={"whitespace-nowrap"}
          className={"w-[50%] md:!max-w-[230px]"}
        >
          <AppInput
            type="date"
            placeholder={""}
            name="schedule_pickup_date"
            value={createdTicketData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            min={getCurrentDate()}
            wrapperClassName="ticket-input"
            className="border ticket-input border-[#E6E7E9] rounded-[5px]"
          />
        </LabelWrapper>
        {/* <div className="flex">
          <div className="">
            <Text className={"text-[#858585] whitespace-nowrap font-bold"}>
              Schedule Delivery
            </Text>
          </div>
          <div className="ml-[9px] w-full col-span-5 border-[#E6E7E9] border-b-2 mb-[10px]"></div>
        </div>
        <div className="flex flex-col w-[50%] md:!max-w-[230px] gap-[30px]">
          <LabelWrapper
            label={"Schedule Date for Delivery *"}
            labelClassName={"whitespace-nowrap"}
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
          <LabelWrapper
            label={"Schedule Date for Installation *"}
            labelClassName={"whitespace-nowrap"}
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
        </div> */}
      </div>
    </div>
  );
}

export default RelocationTicketType;
