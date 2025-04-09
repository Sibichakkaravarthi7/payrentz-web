import AppContainer from "@/components/Container/AppContainer";
import Layout from "@/components/Layout/Layout";
import Text from "@/components/Text/Text";
import React from "react";

const page = () => {
  const details = [
    {
      heading: null,
      message: [
        `Welcome to the payrentz website, operated by PR Rental Solutions Private Limited ("payrentz"). By accessing or using any content, information, data, text, graphics, photographs, or other materials ("Material") on this website, you agree to comply with these Terms of Use. If you do not agree to these terms, please refrain from using this website.`,
      ],
    },
    {
      heading: "Terms of Use Updates",
      message: [
        "payrentz reserves the right to amend these Terms of Use at any time by updating this website. Continued access or use of the website after any changes constitutes your acceptance of the updated terms.",
      ],
    },
    {
      heading: "Supported Browsers",
      message: [
        "This website is optimized for modern browsers, including the latest versions of Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. For the best experience, ensure your browser is up to date.",
      ],
    },
    {
      heading: "Links to Other Websites",
      message: [
        "payrentz may provide links to third-party websites for your convenience. However, these websites are not under our control, and we do not endorse or take responsibility for their content, accuracy, or any products/services they offer. Use third-party websites at your own risk.",
      ],
    },

    {
      heading: "Software downloads",
      message: [
        "Any software available for download through this website is provided by third-party vendors unless stated otherwise. Use of such software is subject to the terms of the vendor’s license agreement. payrentz disclaims all liability for third-party software, including warranties or endorsements.",
      ],
    },
    {
      heading: "Warranties",
      message: [
        "payrentz strives to maintain the accuracy of information on this website but does not guarantee it is free from errors or omissions. Access to this website or third-party websites may be subject to interruptions or viruses, for which payrentz is not responsible. Changes may be made to the content without notice.",
      ],
    },
    {
      heading: "Liability and complying with laws",
      message: [
        "To the maximum extent permitted by law, payrentz is not liable for any loss, damage, or expense arising from your use of this website or third-party materials. Users are responsible for ensuring their use complies with applicable local laws.",
      ],
    },
    {
      heading: "Cancellation",
      message: [
        "payrentz may cancel the agreement set out in these Terms of Use and your access to this website at any time without notice. All disclaimers, limitations of liability, and licenses granted will continue post-cancellation.",
      ],
    },
    {
      heading: "Description of Products",
      message: [
        "The images and illustrations on this website are for reference only and may not represent the actual products. Please confirm all details with our representatives before making a purchase. Prices and descriptions are subject to change without notice, and we do not guarantee error-free content.",
      ],
    },
    {
      heading: "Rental Payment, Processing Fees, and Refunds",
      message: ["Our payment policies include:"],
      ol: [
        {
          title: "Refundable Deposit:",
          mes: " Security deposit caries for each product and rental tenure. It will be refunded after the respective subscription is closed and subject to quality checks on the products and outstanding dues (if any). Refundable deposits will only be transferred to the original applicant's account within one week of clearance. Damages beyond normal wear and tear will be deducted.",
        },
        {
          title: "Handling Charges: ",
          mes: `A one-time, non-refundable fee charged at the time of booking per product.",
        "Payment Modes: Online payment routed through the payment gateway`,
        },
        {
          title: "Delayed Payments:",
          mes: " A late fee of ₹100 per invoice applies beyond the due date. Non-payment for one month may result in termination and product removal.",
        },
      ],
    },
    {
      heading: "General Information",
      message: [
        "Efforts are taken to ensure the accuracy and integrity of the information on this website. However, payrentz is not responsible for:",
      ],
      ul: [
        "Misprints or outdated information.",
        "Technical or pricing inaccuracies.",
        "Typographical errors.",
      ],
      subMes: [
        "Content is subject to change without notice. Any invalid or unenforceable parts of these Terms of Use will be adjusted or removed, with the remainder remaining enforceable.",
        "You represent and warrant that you are at least 18 years of age and have the authority to agree to these Terms of Use.",
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
          Disclaimer for payrentz Website
        </Text>
        <div className="flex flex-col bg-[#F6FAFF] border-b rounded-[12px] flex  py-[30px] px-[20px]  md:py-[50px] md:px-[46px] gap-[30px]">
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
                    style={{ lineHeight: "26px" }}
                    key={d}
                    text={d}
                    className={
                      "mt-2 text-justify text-[16px] font-normal !lh-[24px]"
                    }
                  />
                ))}
                <>
                  {m?.ul?.length > 0 ? (
                    <ul className="list-outside list-disc ml-4 my-3">
                      {m?.ul?.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </>
                <>
                  {m?.ol?.length > 0 ? (
                    <ol className="list-outside list-decimal ml-4 my-2">
                      {m?.ol?.map((l) => (
                        <li key={l}>
                          <b>{l.title}</b>
                          {l.mes}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    ""
                  )}
                </>
                {m?.subMes?.map((d) => (
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
            </div>
          ))}
          <Text
            className={
              "mt-2 ml-5   border-t-[1px] border-[#dbdbdb] pt-[20px] text-justify text-[16px] font-normal !lh-[24px]"
            }
          >
            If you have any questions or feedback regarding these Terms of Use,
            please contact us directly.
          </Text>
        </div>
      </AppContainer>
    </Layout>
  );
};

export default page;
