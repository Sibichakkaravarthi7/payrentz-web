import React, { useCallback, useContext, useState } from "react";
import Text from "../Text/Text";
import { useMutation, useQuery, useQueryClient } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import {
  GET_CART_COUNT,
  GET_CREATE_PATCH_ORDER,
  GET_MAKE_PAYMENT,
  POST_VERIFY_PAYMENT,
} from "@/api/urls/urls";
import useRazorpay from "react-razorpay";
import LoaderLayout from "../Layout/LoaderLayout";
import makePostRequest from "@/utils/makePostRequest";
import { useRouter } from "next/navigation";
import useAppStore from "@/Store/Store";
import PaymentSummaryCard from "./PaymentSummaryCard";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";

const CartPaymentGateway = () => {
  const { step, setStep, summaryData } = useContext(CartContext);

  // const payNow = [
  //   {
  //     title: `Refundable Deposit (${cartSummaryData?.count} items)`,
  //     price: cartSummaryData?.total_deposit,
  //   },
  //   {
  //     title: `Delivery & Installation Charges`,
  //     price: cartSummaryData?.total_handling_charge || 0,
  //   },
  //   {
  //     title: `Accessories`,
  //     price: 0,
  //   },
  // ];
  const payMonthly = [
    {
      title: `Product Rent (${summaryData?.data?.total_variant_count} items)`,
      price: summaryData?.data?.total_variant_rent,
    },
    {
      title: `GST`,
      price: summaryData?.data?.total_variant_gst || 0,
    },
    {
      title: `Total Monthly Payable`,
      price: summaryData?.data?.variant_monthly_payable,
      isTotal: true,
    },
  ];

  return (
    <div className="pt-[10px] md:pt-[20px]">
      <div className="flex gap-[35px] flex-wrap">
        <PaymentSummaryCard
          info="Not to be paid now. Pay post usage every month."
          title={"Monthly Payable"}
          data={payMonthly}
        />
        {/* <PaymentSummaryCard
          title={"Payable Now"}
          data={payNow}
          titleColor="#2B5CAB"
        /> */}
      </div>

      {/* <LoaderLayout height={40} isLoading={isLoading}> */}
      {/* <div className=" bg-[#D9D9D9]  py-[70px] md:py-[150px]">
          <Text className={"text-center font-bold text-xl"}>
            Payment Gateway UI
          </Text>
        </div> */}
      {/* </LoaderLayout> */}
    </div>
  );
};

export default CartPaymentGateway;
