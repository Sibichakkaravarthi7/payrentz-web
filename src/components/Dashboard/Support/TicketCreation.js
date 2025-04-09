"use client";

import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import AppInput from "@/components/Input/AppInput";
import AppLabel from "@/components/Label/AppLabel";
import AppLink from "@/components/Link/AppLink";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import Text from "@/components/Text/Text";
import { Label } from "flowbite-react";
import React, { useContext, useState } from "react";
import UpgradeTicketType from "./UpgradeTicketType";
import RelocationTicketType from "./RelocationTicketType";
import CancelTicketType from "./CancelTicketType";
import ServiceTicketType from "./ServiceTicketType";
import NameTransferTicketType from "./NameTransferTicketType";
import { ticketCreateContext } from "@/app/dashboard/support/create/page";

function TicketCreation({
  ticketData,
  error,
  initialIsLoading,
  submitIsLoading,
}) {
  const { mutate, setCreatedTicketData, setError, createdTicketData } =
    useContext(ticketCreateContext);

  const handleRequestTypeChange = (selectedOption) => {
    // const requestType = selectedOption;
    // console.log("Selected Request Type:", requestType);
    // setSelectedRequestType(requestType);
    setCreatedTicketData((prev) => ({
      ...prev,
      ticket_type: selectedOption,
    }));
  };

  const handleInputChange = (e) => {
    setCreatedTicketData((prv) => ({
      ...prv,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setCreatedTicketData((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));
  };

  const handleValidation = () => {
    const err = {};

    if (createdTicketData?.ticket_type?.value == undefined) {
      console.log("Request type not selected");
      err.requestType = "Please select a request type.";
    }

    switch (createdTicketData?.ticket_type?.label) {
      case "service":
        if (!createdTicketData?.subscription) {
          err.subscription = { message: "Please select the subscription." };
        }
        if (!createdTicketData?.service_type) {
          err.service_type = { message: "Please select the service type." };
        }
        if (!createdTicketData?.description) {
          err.description = { message: "Please enter a description" };
        }
        if (!createdTicketData?.schedule_date) {
          err.schedule_date = { message: "Please enter a date" };
        }
        break;
      case "upgrade":
        if (!createdTicketData?.subscription) {
          err.subscription = { message: "Please select the subscription." };
        }
        if (!createdTicketData?.description) {
          err.description = { message: "Please enter a description" };
        }
        if (!createdTicketData?.schedule_pickup_date) {
          err.schedule_pickup_date = { message: "Please enter a pickup date" };
        }
        if (!createdTicketData?.schedule_date) {
          err.schedule_date = { message: "Please enter a delivery date" };
        }
        if (!createdTicketData?.schedule_installation_date) {
          err.schedule_installation_date = {
            message: "Please enter a installation date",
          };
        }
        break;
      case "relocation":
        if (!createdTicketData?.subscription) {
          err.subscription = { message: "Please select the subscription." };
        }
        if (!createdTicketData?.customer_new_address_1) {
          err.customer_new_address_1 = {
            message: "Please enter the Address line 1",
          };
        }
        if (!createdTicketData?.customer_new_address_2) {
          err.customer_new_address_2 = {
            message: "Please enter the Address line 2",
          };
        }
        if (!createdTicketData?.city) {
          err.city = { message: "Please enter the City" };
        }
        if (!createdTicketData?.state) {
          err.state = { message: "Please enter the state" };
        }
        if (!createdTicketData?.property_pincode) {
          err.property_pincode = { message: "Please enter the Pincode" };
        }
        if (!createdTicketData?.google_location_link) {
          err.google_location_link = {
            message: "Please enter the google location link",
          };
        }
        if (!createdTicketData?.schedule_pickup_date) {
          err.schedule_pickup_date = { message: "Please enter a pickup date" };
        }
        break;
      case "cancellation":
        if (!createdTicketData?.subscription) {
          err.subscription = { message: "Please select the subscription." };
        }
        if (!createdTicketData?.description) {
          err.description = { message: "Please enter a description" };
        }
        if (!createdTicketData?.schedule_pickup_date) {
          err.schedule_pickup_date = { message: "Please enter a Pickup date" };
        }
        break;
      case "name transfer":
        if (!createdTicketData?.subscription) {
          err.subscription = { message: "Please select the subscription." };
        }
        if (!createdTicketData?.transfer_customer_first_name) {
          err.transfer_customer_first_name = {
            message: "Please Enter the Name.",
          };
        }
        if (!createdTicketData?.transfer_customer_email) {
          err.transfer_customer_email = { message: "Please Enter the email." };
        }
        if (!createdTicketData?.transfer_customer_phone) {
          err.transfer_customer_phone = {
            message: "Please Enter the mobile number.",
          };
        }
        if (!createdTicketData?.transfer_customer_reason) {
          err.transfer_customer_reason = {
            message: "Please enter the reason for name transfer",
          };
        }
        break;
      default:
        break;
    }

    setError(err);

    if (Object.keys(err)?.length > 0) return false;
    else return true;
  };
  // console.log("tickrettttttt", createdTicketData);

  const handleSubmit = () => {
    if (handleValidation()) {
      const valToSubmit = {
        customer: "",
        ticket_type: createdTicketData?.ticket_type?.value || "",
        description: createdTicketData?.description || "",
        subscription: createdTicketData?.subscription?.value || "",
        service_type: createdTicketData?.service_type?.value || "",
        upgrade_product: createdTicketData?.upgrade_product || "",
        transfer_customer_first_name:
          createdTicketData?.transfer_customer_first_name || "",
        transfer_customer_last_name:
          createdTicketData?.transfer_customer_last_name || "",
        transfer_customer_phone:
          createdTicketData?.transfer_customer_phone || "",
        transfer_customer_email:
          createdTicketData?.transfer_customer_email || "",
        customer_new_address_1: createdTicketData?.customer_new_address_1 || "",
        customer_new_address_2: createdTicketData?.customer_new_address_2 || "",
        city: createdTicketData?.city?.value || "",
        state: createdTicketData?.state || "",
        property_pincode: createdTicketData?.property_pincode?.value || "",
        google_location_link: createdTicketData?.google_location_link || "",
        transfer_customer_reason:
          createdTicketData?.transfer_customer_reason || "",
        schedule_date: createdTicketData?.schedule_date || null,
        schedule_installation_date:
          createdTicketData?.schedule_installation_date || null,
        schedule_pickup_date: createdTicketData?.schedule_pickup_date || null,
        schedule_time: null,
        schedule_installation_time: null,
        link: createdTicketData?.link || [],
        zone: createdTicketData?.zone || "",
      };
      // console.log("FINAL", valToSubmit);
      mutate(valToSubmit);
    }
    // mutate({
    //   customer: "",
    //     ticket_type: createdTicketData?.ticket_type?.value || "",
    //     description: createdTicketData?.description || "",
    //     subscription: createdTicketData?.subscription || "",
    //     service_type: createdTicketData?.service_type || "",
    //     upgrade_product: createdTicketData?.upgrade_product || "",
    //     transfer_customer_first_name:
    //       createdTicketData?.transfer_customer_first_name || "",
    //     transfer_customer_last_name:
    //       createdTicketData?.transfer_customer_last_name || "",
    //     transfer_customer_phone:
    //       createdTicketData?.transfer_customer_phone || "",
    //     transfer_customer_email:
    //       createdTicketData?.transfer_customer_email || "",
    //     customer_new_address_1: createdTicketData?.customer_new_address_1 || "",
    //     customer_new_address_2: createdTicketData?.customer_new_address_2 || "",
    //     city: createdTicketData?.city || "",
    //     state: createdTicketData?.state || "",
    //     property_pincode: createdTicketData?.property_pincode || "",
    //     google_location_link: createdTicketData?.google_location_link || "",
    //     transfer_customer_reason:
    //       createdTicketData?.transfer_customer_reason || "",
    //     schedule_date: createdTicketData?.schedule_date || "",
    //     schedule_installation_date:
    //       createdTicketData?.schedule_installation_date || null,
    //     schedule_pickup_date: createdTicketData?.schedule_pickup_date || null,
    // })
  };

  const requiredTicketOptions = [
    {
      identity: "upgrade",
      id: 1,
    },
    {
      identity: "service",
      id: 2,
    },
    {
      identity: "relocation",
      id: 3,
    },
    {
      identity: "name transfer",
      id: 4,
    },
    {
      identity: "close-subscription",
      id: 5,
    },
  ];

  const ticketTypeOptions = ticketData?.data?.ticket_type?.map((item) => ({
    identity: item,
    id: item,
  }));

  // console.log("ticket metaaaaaaaa dataaaaa", ticketData)

  // console.log("ticket metaaaaaaaa", ticketTypeOptions)

  const newTicketOptions = ticketTypeOptions?.filter((item) =>
    requiredTicketOptions?.some((req) => req?.identity === item?.identity)
  );

  // console.log("ticket optionsssssssssssss", newTicketOptions);

  return (
    <div>
      <div className="mt-[10px]">
        <Text className={"text-[28px] font-bold"}>Create New Ticket</Text>
        <div className="bg-[#FFFFFF] !h-[100%] mt-[30px] pl-[30px] pr-[31px] pt-[39px]">
          <div className="pb-[30px] border-b-2">
            <LabelWrapper label={"Request Type *"}>
              <AppSelect
                // options={requiredTicketOptions}
                options={newTicketOptions}
                wrapperClassname={"max-w-[495px]"}
                placeholder={"--Select--"}
                className={"ticket-select capitalize"}
                name="ticket_type"
                value={createdTicketData?.ticket_type}
                onChange={(value) => handleRequestTypeChange(value)}
              />
            </LabelWrapper>
          </div>

          {createdTicketData?.ticket_type?.label === "" && (
            <div className="mt-[40px] pb-[200px] border-t-2">
              <Text className={"text-center text-[#858585] font-medium"}>
                Select Request Type to create request
              </Text>
            </div>
          )}

          {createdTicketData?.ticket_type?.label === "upgrade" && (
            <>
              {/* upgrade */}
              <UpgradeTicketType
                ticketData={ticketData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                error={error}
              />
            </>
          )}

          {createdTicketData?.ticket_type?.label === "relocation" && (
            <>
              {/* relocation */}
              <RelocationTicketType
                ticketData={ticketData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                error={error}
              />
            </>
          )}

          {createdTicketData?.ticket_type?.label === "close-subscription" && (
            <>
              {/* cancel */}
              <CancelTicketType
                ticketData={ticketData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                error={error}
              />
            </>
          )}

          {createdTicketData?.ticket_type?.label === "service" && (
            <>
              {/* service */}
              <ServiceTicketType
                ticketData={ticketData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                error={error}
              />
            </>
          )}

          {createdTicketData?.ticket_type?.label === "name transfer" && (
            <>
              {/* Name Transfer */}
              <NameTransferTicketType
                ticketData={ticketData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                error={error}
              />
            </>
          )}
        </div>
        {createdTicketData?.ticket_type && (
          <>
            <div className="mt-[23px] flex justify-end">
              <AppButton
                isLoading={submitIsLoading}
                text={"Create Request"}
                variant={"red"}
                onClick={() => handleSubmit()}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TicketCreation;
