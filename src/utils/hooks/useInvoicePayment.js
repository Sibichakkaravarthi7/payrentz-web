import { GET_MAKE_INVOICE_PAYMENT } from "@/api/urls/urls";
import React, { useCallback } from "react";
import { useMutation } from "react-query";
import makeGetRequest from "../makeGetRequest";
import useRazorpay from "react-razorpay";
import useAppStore from "@/Store/Store";

const useInvoicePayment = () => {
  const [Razorpay, isLoaded] = useRazorpay();
  const { user_data } = useAppStore();

  // console.log("user_data", user_data)

  const { isLoading, mutate: triggerPayment } = useMutation(
    (body) => makeGetRequest(GET_MAKE_INVOICE_PAYMENT, body),
    {
      onSuccess: (res) => {
        handlePayment(res);
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

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
          // mutate({
          //   uuid: params?.data?.receipt,
          //   payload: res,
          // });
          // console.log("payment handler", res);
          window.location.reload();
          // router.push("/payment/success");
        },
        prefill: {
          name: user_data?.first_name || "",
          email: user_data?.email || "",
          contact: user_data?.phone_number|| "9999999999",
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

export default useInvoicePayment;
