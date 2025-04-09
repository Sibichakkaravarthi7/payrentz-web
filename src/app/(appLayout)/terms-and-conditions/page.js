import AppContainer from "@/components/Container/AppContainer";
import Layout from "@/components/Layout/Layout";
import Text from "@/components/Text/Text";
import React from "react";

const page = () => {
  const Details = [
    {
      heading: "",
      message: `These terms and conditions ("Terms") govern the relationship between payrentz ("payrentz," "we," "us," or "our") and the Customer ("Customer," "you," or "your") regarding the rental of products through our platform. These Terms are effective from the date of product delivery and remain in force until all rented products are returned in good condition and acknowledged by payrentz's quality team.`,
    },
    {
      heading: "Orders",
      message: null,
      ul: [
        "Placing an order and completing payment does not ensure product delivery. Delivery is contingent upon successful KYC verification, product availability, and location serviceability.",
        "The Customer authorizes payrentz to verify their details and credit score through credit bureaus or other third parties.",
        "payrentz reserves the right to reject an order at its discretion without explanation. If rejected, the security deposit will be refunded within 7 days to the source account.",
      ],
    },
    {
      heading: "Delivery",
      message: null,
      ul: [
        "Products will be delivered to the address provided in your profile. The Customer or their authorized representative must be present at the delivery location with ID proof and an authorization letter if applicable.",
        "If a second delivery attempt is necessary because of Customer unavailability or failure to meet delivery requirements, additional handling charges will be applied.",
        "The Customer must inspect the products during delivery. Damage claims made after acceptance of delivery will not be entertained, and damage charges may apply.",
        "Ensure entry permission for the delivery vehicle and elevator access if required.",
      ],
    },
    {
      heading: "Security Deposit",
      message: null,
      ul: [
        "A refundable, interest-free security deposit paid at the time of booking will be refunded within three days after a quality inspection confirms that the returned products are in good condition.",
        "Any outstanding amounts, such as rent, late fees, or damage charges, will be deducted from the security deposit. The deposit cannot be used to offset any dues during an ongoing relationship.",
      ],
    },
    {
      heading: "Communication",
      message:
        "Order confirmations and other communication will be sent to the registered email and/or WhatsApp number. Customers should keep their contact details updated in their profile using the customer dashboard to track orders and support tickets.",
    },
    {
      heading: "Rent Payment",
      message: null,
      ul: [
        <>
          Payments must be made only through the official company portal (
          <a
            className="underline !text-[#0000EE]"
            style={{ color: "#0000EE" }}
            href="https://www.payrentz.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.payrentz.com
          </a>
          ). PayRentz is not liable for payments made through other channels.
        </>,
        "Rent is postpaid unless otherwise specified, with invoices raised on the last day of the month and payments due by the 7th of the following month. Late fees apply for overdue payments.",
      ],
    },
    {
      heading: "Pro-rata rent",
      message:
        "Pro-rata rent will be calculated for the products delivered during the month from the date of delivery until the last day of the month. In case of subscription cancellation, the last month rent shall be calculated on a pro-rata basis until a day before pickup date (T-1) of the product from the Customer.",
    },

    {
      heading: "Late Fees",
      message:
        "Late fees of Rs. 100 per rental invoice shall be levied on the 8th day of every month to Customers who have missed the due date (7th of every month). payrentz reserves the right to revise the late fees.",
    },
    {
      heading: "Sharing Information",
      message:
        "payrentz may share Customer information with the following pursuant to this agreement.",
      ul: [
        "Credit agencies: Customer hereby agrees that non-payment of rent, late fees, damages charges or any other non-payment, may affect the credit rating of the Customer and payrentz shall not be liable for any claim from the Customer for sharing such information with credit rating agencies.",
        "Third party: payrentz may collaborate with third parties to fulfil services under this agreement. In such cases, only essential Customer details will be shared to facilitate service delivery.",
        "Related parties: In the event, the Customer defaults payment or not returning the products and is not traceable, in addition to any other right of payrentz, the Customer agrees that payrentz shall have the right to reach out to the Customer’s relatives, friends, employer, other related parties to enquire the whereabouts. The Customer hereby agrees that, payrentz shall not be liable for any inconvenience or loss caused for such action by payrentz.",
      ],
    },
    {
      heading: "Service",
      message:
        "payrentz shall provide service support to the Customer for the entire rental duration upon request. payrentz shall carry out the maintenance/repair of the product within 3 working days after the request has been registered. In the event, the issue is not resolved during repair, payrentz shall provide a replacement for the product. Any additional cost incurred by payrentz due to damages or poor maintenance or mishandling by the customer shall be borne solely and paid by the Customer.",
    },
    {
      heading: "Continuation",
      message:
        "Customer can choose to continue renting the products beyond the initial chosen tenure. The monthly rent applicable at the time of booking shall be considered for calculation of monthly rental amount for the extended period. Any extension shall be deemed to be pursuant to this agreement.",
    },
    {
      heading: "Cancellation",
      message:
        "Customer hereby agrees to submit request for rental subscription cancellation with 10 days’ notice period to enable hassle free closure. Short notice charges will be levied at the discretion of payrentz for Customers who request for immediate pick up or pick up of products within 10 days from the date of cancellation request. payrentz has listed flexible rental tenure and differential rates based on the tenure. Customer can choose to close the rental subscription at any time with intimation to payrentz in the Customer dashboard. If the subscription is closed early, ahead of rental tenure chosen at the time of order booking, early closure charges shall be levied as per initial terms of the agreement as mentioned in payrentz website based on the selected tenure.",
    },
    {
      heading: "Damages",
      message:
        "The Customer hereby agrees that he/she is liable towards repair and replacement cost for any damage caused to the product. In the event, the product is stolen or damaged beyond repair, Customer shall be liable to pay payrentz the market price of the product. Minor usage-related damages, such as superficial scratches, discoloration, or similar non-functional impairments, will be classified as normal wear and tear. The extent of damage will be ascertained by payrentz quality team after the product is returned by the customer and received at warehouse. If it is found that product repair is carried out by any unauthorized person, then a penalty may be levied as per payrentz policy. Any removal, alteration, disfiguring or cover up of any product information, lettering, or insignia displayed on any product shall be considered as damage and shall be chargeable. ",
    },
    {
      heading: "Inspection",
      message:
        "payrentz reserves the right to inspect the products delivered / rented during the term of the agreement. payrentz will notify the Customer in advance of any inspection visits to minimize inconvenience.  The Customer shall ensure that payrentz representative is provided with proper access to the premises for inspection.",
    },
    {
      heading: "Relocation",
      message:
        "In case the Customer decides to relocate from the registered address, a request shall be made to payrentz at least a week in advance along with the address proof of the new address. payrentz shall arrange to relocate the product as per the mutually decided date with the Customer. Relocation shall be subject to successful verification and approval of the KYC of the Customer’s new address and serviceability of the new location. Relocation charges will depend on the distance and complexity.",
    },
    {
      heading: "Termination",
      message:
        "payrentz shall have the right to terminate this agreement immediately if the Customer defaults payment of rental dues or any other payment dues or breach of any of the terms of this agreement.",
      message2: "Consequences of termination:",
      message3:
        "a) payrentz shall have the right to take possession of the products delivered to the Customer immediately",
      message4:
        "b) Any payment pending from the Customer shall become payable immediately to payrentz",
      message5:
        "c) The security deposit paid by the Customer shall be refunded to the Customer post damage assessment of the products and deduction of payment dues if any",
      message6:
        "Notwithstanding any other terms of this Agreement, payrentz shall have the right to terminate the Agreement without any cause by providing 30 days’ notice to the Customer.",
    },
    {
      heading: "Ownership",
      message:
        "payrentz retains ownership title of the products delivered/rented to the Customer pursuant to the agreement. Nothing in this agreement shall be construed as a transfer of ownership of the products to the Customer. The Customer shall give immediate notice to payrentz if any product is about to become liable or is threatened with seizure. Customer shall indemnify payrentz against all loss and damage caused by such action against its products.",
    },
    {
      heading: "Governing Law",
      message:
        "This agreement shall be governed by the laws of India and shall be subject to exclusive jurisdiction of courts in Chennai.",
    },
    {
      heading: "Assignment",
      message:
        "The Customer shall not assign or transfer any interest in this Agreement or the Products without the written consent of payrentz. Any such transfer or assignment shall be considered as illegal and hence a violation of the terms of this Agreement. payrentz reserves the right to assign this agreement, to any third party (including credit rating agencies, factoring agents and NBFC) without prior notice to the Customer.",
    },
    {
      heading: "Indemnification",
      message:
        "The Customer shall indemnify, defend and hold payrentz harmless from and against any claim, demand, cause of action or loss or liability (including, but not limited to, attorneys’ fees and costs) for any product damage or personal injury arising from the Customer’s use of the product by any cause, except to the extent such is caused by payrentz negligence or wilful misconduct. The provisions of this clause shall survive the termination of this agreement with respect to any claim or liability accruing before such termination. In no event shall payrentz be liable for any direct, indirect, special or consequential loss or damage arising out of Customer’s use of the products.",
    },
    {
      heading: "Entire Agreement",
      message:
        "This agreement constitutes the entire agreement between payrentz and the Customer. The acceptance of this agreement also signifies the acceptance of the Customer, to the terms and conditions on the payrentz website. In the event of any conflict between the terms and conditions on the payrentz website (including privacy policy) and this agreement, the terms and conditions on the payrentz website shall supersede. The company reserves the right to amend the terms and conditions of this agreement and on the website from time to time, the Customer is requested to check the website for updated terms and conditions.",
    },
    {
      heading: "Limitation of Liability",
      message:
        "In no event shall payrentz be liable for indirect, special, incidental, or consequential damages, or any loss of revenue, profits, or data of any kind in connection with use of the Products, even if it has been advised of the possibility of such damages. Notwithstanding any other provision of this agreement payrentz’s total liability to Customer shall not exceed the total amount of 1 (one) month rent collected from the Customer.",
    },
  ];
  return (
    <Layout>
      <AppContainer>
        <div className="w-full">
          <div className="text-left mt-[40px] mb-[20px]">
            <Text
              className={
                "text-[18px] md:text-[32px] font-extrabold text-appBlue inline"
              }
              as="h2"
            >
              Terms And Conditions
            </Text>
            {/* <Text className={"text-[12px] font-medium mt-[5px]"}>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit turpis
                </Text> */}
          </div>
          <div className="bg-[#F6FAFF] rounded-[12px] flex  py-[30px] px-[20px]  md:py-[50px] md:px-[46px] flex-col gap-[30px] ">
            {Details?.map((d, idx) => (
              <div className="flex flex-col  gap-[12px]" key={idx}>
                <Text className={"text-[18px] textWeight-[600] font-bold"}>
                  {d?.heading}
                </Text>
                <div className="flex flex-col gap-[8px] ml-[20px]">
                  <p className={"text-justify text-[16px] font-normal"}>
                    {d?.message}
                  </p>
                  {d?.message2 && (
                    <p className={"text-justify text-[16px] font-normal"}>
                      {d?.message2}
                    </p>
                  )}
                  {d?.message3 && (
                    <p className={"text-justify text-[16px] font-normal"}>
                      {d?.message3}
                    </p>
                  )}
                  {d?.message4 && (
                    <p className={"text-justify text-[16px] font-normal"}>
                      {d?.message4}
                    </p>
                  )}
                  {d?.message5 && (
                    <p className={"text-justify text-[16px] font-normal"}>
                      {d?.message5}
                    </p>
                  )}
                  {d?.message6 && (
                    <p className={"text-justify text-[16px] font-normal"}>
                      {d?.message6}
                    </p>
                  )}
                </div>
                {d?.ul?.length > 0 ? (
                  <ul className="list-outside list-disc ml-12 my-1">
                    {d?.ul?.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </AppContainer>
    </Layout>
  );
};

export default page;
