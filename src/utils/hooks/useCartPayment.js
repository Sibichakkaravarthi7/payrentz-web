import { GET_CART_COUNT, GET_MAKE_PAYMENT } from "@/api/urls/urls";
import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import makeGetRequest from "../makeGetRequest";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/navigation";
import useAppStore from "@/Store/Store";
import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";

const useCartPayment = ({ verifyApi, isKycCompleted = false }) => {
  const [Razorpay, isLoaded] = useRazorpay();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const cleanPathname = pathname?.split("/").filter(Boolean)[0] || "";
  const { isLoading, mutate: triggerPayment } = useMutation(
    (body) => makeGetRequest(GET_MAKE_PAYMENT, body),
    {
      onSuccess: (res) => {
        handlePayment(res);
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  const { user_data } = useAppStore();

  // console.log("user_data", user_data)

  const handlePayment = useCallback(
    (params) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_APP_KEY,
        amount: params?.data?.amount,
        currency: params?.data?.currency,
        name: "Payrentz",
        description: "Payment to payrentz",
        image: "https://example.com/your_logo",
        order_id: params?.data?.id,
        handler: (res) => {
          verifyApi({
            uuid: params?.data?.receipt,
            payload: res,
            amount: params?.data?.amount,
            currency: params?.data?.currency,
          });
          queryClient.invalidateQueries({ queryKey: [GET_CART_COUNT] });
          if (isKycCompleted) {
            deleteCookie("coupon_number");
            router.push(`/${cleanPathname}/payment/customer/success`);
          } else {
            deleteCookie("coupon_number");
            router.push(`/${cleanPathname}/payment/success`);
          }
        },
        prefill: {
          name: user_data?.first_name || "",
          email: user_data?.email || "",
          contact: user_data?.phone_number || "9999999999",
        },
        notes: {
          address: "Payrentz Office",
        },
        theme: {
          color: "#2B5CAB",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.on("payment.failed", function (response) {
        console.log("response", response);
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });

      rzpay.open();
    },
    [Razorpay]
  );

  return { isLoading, triggerPayment };
};

export default useCartPayment;
