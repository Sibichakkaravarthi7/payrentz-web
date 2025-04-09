import AppContainer from "@/components/Container/AppContainer";
import Layout from "@/components/Layout/Layout";
import Text from "@/components/Text/Text";
import React from "react";

const page = () => {
  const details = [
    {
      heading: null,
      message: [
        "Thank you for choosing payrentz as your preferred rental partner. We prioritize a rewarding and seamless experience for our customers throughout their rental journey. We request our customers to read the detailed terms and conditions provided in our website and the complete refund policy.",
      ],
    },
    {
      heading: "Orders",
      message: [
        "payrentz validates and verifies all documents submitted by the customer at the time of placing the order. If the documents or details shared are found to be discrepant or not in adherence to the client onboarding norms, payrentz reserves the right to reject the customer’s order any time prior to delivery at its sole discretion without assigning any reason.",
      ],
    },
    {
      heading: "Cancellation of Order:",
      message: null,
      ul: [
        "Customer can cancel an order 24 hours before the scheduled delivery without any extra cost.",
        "All products are subjected to quality check before it is loaded for delivery. If defects or non-functionality are identified during delivery, customer may choose to cancel the order or return the products at the time of delivery. This will be considered as cancellation prior to delivery.",
        "If order is cancelled at the time of delivery due to change of plans or other customer-related reasons, the security deposit will be refunded, but the handling charges will not be refunded.",
      ],
    },
    {
      heading: "Modification of Order:",
      message: [
        "Customers can request modifications to their orders before delivery by contacting customer support. Changes to delivery commitments may occur due to modifications, and adjustments to rent, security deposit, and handling charges will apply accordingly.",
      ],
    },
    {
      heading: "Early Closure:",
      message: [
        `Early closure charges will be levied for products returned before the end of the chosen tenure. Early closure charges will be calculated based on the selected tenure, product category and as a multiple of the monthly rent, specified in the "Compare Tenure" link on each product page on the website.`,
      ],
    },
    {
      heading: "Security Deposit:",
      message: [
        "payrentz reserves the right to deduct outstanding dues if any including rent, late fees, early closure charges, damage charges, and any other overdue amount from the security deposit paid by the customer and shall refund the remaining amount. Customer cannot request to offset monthly rental dues or other dues payable from the security deposit during an active and ongoing rental subscription.",
      ],
    },
    {
      heading:
        "Refunds due to order cancellation or rejection or modification:",
      message: [
        "Refund including security deposit and handling charges paid by the customer will be processed within 7 working days. Refund will be initiated to the source account (original method of payment) or to the account details provided by the customer during onboarding. ",
      ],
    },
    {
      heading: "Refund upon subscription closure:",
      message: [
        "The refundable, interest free security deposit paid by the customer during onboarding will be refunded within 3 working days subject to confirmation from payrentz quality team that the products are returned in good condition. Refund will be initiated to the account details maintained in the customer’s profile on the dashboard. Customers are responsible for ensuring that their bank account details are accurate and up-to-date. payrentz will not be liable for any disputes or liabilities arising from the submission of incorrect bank account details.",
      ],
    },
  ];
  return (
    <Layout>
      <AppContainer>
        <Text
          className={
            "text-[18px] md:text-[32px] font-extrabold text-appBlue  text-left pt-[40px] pb-[20px]"
          }
          as="h1"
        >
          Refund Policy
        </Text>
        <div className="flex flex-col bg-[#F6FAFF] rounded-[12px] flex py-[30px] px-[20px]  md:py-[50px] md:px-[46px] gap-[30px]">
          {details?.map((m) => (
            <div key={m?.heading}>
              <Text
                text={m?.heading}
                className={"text-[18px] textWeight-[600] font-bold "}
                as="h2"
              />
              <div className="ml-[12px] md:ml-[20px]">
                {m?.message?.map((d) => (
                  <Text
                    style={{ lineHeight: "24px" }}
                    key={d}
                    text={d}
                    className={
                      "mt-2 text-justify text-[16px] font-normal !lh-[24px]"
                    }
                  />
                ))}
              </div>
              {m?.ul?.length > 0 ? (
                <ul className="list-outside list-disc ml-4 my-3">
                  {m?.ul?.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </AppContainer>
    </Layout>
  );
};

export default page;
