import { PaySlipIcon, RedArrowIcon } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React from "react";
import SubscriptionCarousel from "./SubscriptionCarousel";
import AppButton from "@/components/Button/AppButton";
import InvoiceCarousel from "./InvoiceCarousel";
import AppLink from "@/components/Link/AppLink";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import { useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import { GET_USER_DEPOSIT, GET_USER_RECENT_INVOICES } from "@/api/urls/urls";
import useInvoicePayment from "@/utils/hooks/useInvoicePayment";
import { convertToPrice } from "@/utils/Constants";

function TotalInvoices() {
  const { data: invoiceList, isLoading: invoiceIsLoading } = useQuery(
    [GET_USER_RECENT_INVOICES],
    () => makeGetRequest(GET_USER_RECENT_INVOICES, {}),
    {
      onSuccess: (res) => {
        console.log("invoice data", res);
      },
    }
  );

  const { isLoading, triggerPayment } = useInvoicePayment();

  const total = invoiceList?.data?.data?.length;

  function convertDateString(inputDateString) {
    // Convert the input date string to a JavaScript Date object
    const inputDate = new Date(inputDateString);

    // Format the date as "30 July 2023"
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const inputDateString = "2024-01-25T06:35:44.822706";
  const result = convertDateString(inputDateString);
  console.log("date result", result);

  // console.log("invoiceList?.data?.total", invoiceList?.data?.total)

  const totalInvoicesAmount = Math.abs(invoiceList?.data?.total); 

  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-[10px] pb-[33px]">
      <div className="flex items-center justify-between gap-[10px] pl-[25px] pr-[24px] pb-[20px] border-b-2 pt-[21px]">
        <div className="flex items-center gap-[10px]">
          <AppImage src={PaySlipIcon} alt="pay-slip-icon" />
          <div>
            <Text className={"font-bold"}>
              Pending Payment ({total > 0 ? total : 0})
            </Text>
            {/* <Text className={"text-[#ED1F28] mt-[7px] text-[10px] font-medium"}>
              Please pay the amount quickly to avoid late fee charges
            </Text> */}
          </div>
        </div>
        {total ? (
          <>
            <AppButton
              onClick={() => triggerPayment()}
              isLoading={isLoading}
              text={`Pay ${convertToPrice(totalInvoicesAmount)}`}
              variant={"red"}
              className={"md:!px-[20px]  !py-[5px] !rounded-[34px]"}
            />
          </>
        ) : null}
      </div>

      <LoaderLayout
        height={20}
        isLoading={invoiceIsLoading}
        wrapperClassname={"py-[20px]"}
      >
        {total > 0 ? (
          <div className="pt-[20px] pl-[25px] pr-[33px]">
            <InvoiceCarousel
              invoices={invoiceList?.data?.data?.map((m) => ({
                invoiceId: m?.invoice_id || "-",
                totalAmount: m?.amount || 0,
                createdOn: convertDateString(m?.created) || "-",
                dueDate: m?.due_date || "-",
              }))}
            />
            <AppLink link={"/dashboard/invoices"}>
              <div className="flex gap-[10px] items-center justify-end cursor-pointer">
                <Text className={"text-[#ED1F28] text-[12px] font-medium"}>
                  View Invoices
                </Text>
                <div className="bg-[#ED1F28] bg-opacity-[0.1] rounded-[50%] p-[5px]">
                  <AppImage src={RedArrowIcon} alt="arrow-icon" />
                </div>
              </div>
            </AppLink>
          </div>
        ) : (
          <div className="pt-[20px] pl-[30px] pr-[33px]">
            <Text className={"text-[#858585] text-[12px]"}>
              Currently, there are no pending invoices in your list.
            </Text>
          </div>
        )}
      </LoaderLayout>
    </div>
  );
}

export default TotalInvoices;
