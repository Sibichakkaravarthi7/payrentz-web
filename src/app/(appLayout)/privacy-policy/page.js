import AppContainer from "@/components/Container/AppContainer";
import Layout from "@/components/Layout/Layout";
import Text from "@/components/Text/Text";
import React from "react";

const page = () => {
  const details = [
    {
      message: [
        {
          desc: 'www.payrentz.com is a website owned and operated by PR Rental Solutions Private Limited ("payrentz") a company duly incorporated under The Companies Act, 2013 with registered office at No 14/20, Mahalakshmi Street, Gandhi Road, Velachery, Chennai - 600042. payrentz is strongly committed to protecting the privacy of your personal information.',
        },
        {
          desc: 'When this privacy policy refers to payrentz, we or us, we mean the companies that make up the payrentz group and which are specified in this privacy policy. This privacy policy applies to payrentz and its privacy practices in India. The website is owned by an Indian company and is located in India. Hence, we are duty bound to abide by the laws, regulations, rules, circulars, notifications etc governing privacy in India. This privacy policy is applicable to all users of this website. The user is herein collectively referred to as "You". You may note that this privacy policy may be found deficient with respect to certain privacy laws of some other countries.',
        },
        {
          desc: 'payrentz has taken all necessary and reasonable measures to protect your personal information and handle the same in a safe and responsible manner in accordance with the terms and conditions of this policy ("Privacy Policy") set out herein below.',
        },
        {
          desc: '"Personal information" is any information that identifies you or that can reasonably enable your identification. This privacy policy provides you with information about how we manage your personal information, including certain types of credit-related personal information (credit information), and how you may contact us if you have any privacy concerns. In addition to this privacy policy we may sometimes provide specific notifications about how we use particular personal information that we collect.',
        },
      ],
    },
    {
      heading: "The kinds of information we collect and hold",
      message: [
        {
          desc: "The kinds of personal information that we collect and hold about you will depend on your interaction with us (e.g. online, in person or over the phone).",
        },
        {
          desc: "The types of personal information we collect and hold about you include:",
          ul: [
            "Your name, contact details (including your current and previous address), date of birth, gender, email address, delivery address, marital status and other personal information;",
            "Information about your use of our services and products;",
            "Employment information including employer, designation and others;",
            "Information contained in credit reports obtained from credit reporting bodies, which includes information about your credit history with other credit providers;",
            "Scores, ratings, summaries, evaluations and other information relating to your credit worthiness which is derived by us or by credit reporting bodies wholly or partly from any of the information above;",
            "Bank account details; and",
            "Identification documents.",
          ],
        },
      ],
    },
    {
      heading: "We share your personal information as described below:",
      message: [
        {
          desc: "Business Transfers: If we start up subsidiaries or involve in mergers or acquisitions. In such case your Personal Information may be the matter of transfer. And we will provide notice on any such transfer and become subject to different privacy policy",
        },
        {
          desc: "Requirement under law: We release your Personal Information to third parties under following circumstances:",
          ul: [
            "To comply with the law, legal process or an enforceable governmental request;",
            "To enforce or apply our terms of use or other agreements with you;",
            "To protect the rights or safety of website or our users or others. However, transfer under this case does not include selling, renting, sharing, or otherwise disclosing your Personal Information for commercial purposes in violation of the commitments set forth in this Privacy Policy",
          ],
        },
        {
          desc: "We may also be required by law to collect your personal information. These laws include anti-money laundering and counter-terrorism financing legislation, national consumer credit protection legislation, personal properties securities legislation, as well as taxation and corporations laws. We will tell you if this is the case and let you know the details of the applicable law, court or tribunal order.",
        },
        {
          desc: "If we cannot collect your personal information we may not be able to provide you with the services and products or assistance (or certain features) you require. The collection, use or disclosure of your personal information is needed to provide these. We need to be able to identify you.",
        },
        {
          desc: "You may have the option, if it is lawful and practicable, to remain anonymous or use a name other than your own (a 'pseudonym') when you deal with us, For example, when you make a general inquiry about our services or products. However, you won't be able to remain anonymous or use a pseudonym if you want to rent or buy goods from us or if you would like to work with us.",
        },
      ],
    },
    {
      heading: "How do we collect your personal information?",
      message: [
        {
          desc: "We collect your personal information as much as possible directly from you or from persons acting on your behalf, including when you complete our forms, call or email us or in our ongoing dealings with you. For example, we will collect information internally from your transactions in connection with credit, such as when you make payments to us. We may also collect personal information about you from publicly available sources, and in some cases, from third parties including:",
          url: [
            "Debt collection agencies;",
            "Your referees (including your employer, your landlord);",
            "Government, statutory, regulatory or enforcement bodies;",
            "Credit reporting bodies;",
            "Other lessors or credit providers (including for references and collections activities);",
            "Your employer; and",
            "Any other person or organization that you have asked us to collect your personal information from.",
          ],
        },
      ],
    },
    {
      heading: "Use and disclosure of your personal information",
      message: [
        {
          desc: "We use and disclose your personal information for the purposes we collected it and for related purposes (where you would reasonably expect us to). We do not share, sell, trade or rent your Personal Information to third parties for unknown reasons. We retain complete anonymity while in all analytics and none of the Personal Information is misused. We safeguard your email addresses. We don’t sell the email addresses provided by you and we use them only as directed by you and in accordance with this Policy. ",
        },
        {
          desc: "We may collect, hold, use and disclose your personal information for the following general purposes:",
        },
        {
          desc: "Identifying you and carrying out appropriate checks to assess applications for credit (including assessing any proposed guarantors",
          ul: [
            "Understanding your requirements and needs and how you interact with us, so that we can carry out product development, service research and develop our business strategies around providing you with our products or services;",
            "Managing, including recovering, outstanding debts;",
            "Undertaking secularization activities and debt assignments;",
            "Enabling us to participate in the credit reporting system (including providing information to credit reporting bodies);",
            "Establishing, administering and managing our services (including our accounts and agreements with you) and products;",
            "Managing and training our employees and representatives;",
            "Promoting and marketing our products and services to you;",
            "Managing complaints and disputes; and",
            "Meeting our legal and regulatory obligations (such as reporting matters to regulators or enforcement bodies when authorized or required by law).",
          ],
        },
        {
          desc: "Some credit information may only be used or disclosed under the Privacy Act for some of these purposes or in some circumstances. If we need to use or disclose your personal information for a purpose that is not set out in our privacy policy, or that is unrelated to the purpose for which we collected your personal information, we will obtain your consent first. We may ask for your express consent or your consent may be implied by an action you take (or don't take). There are a range of people and organizations we disclose your personal information to. The particular party we may disclose your personal information to will depend on the dealings you have with us. Some examples of the parties to whom we may disclose your personal information include to:",
          ul: [
            "Advisors and consultants (including our accountants, auditors and lawyers);",
            "Financial institutions;",
            "Third party services providers with whom we have contracted to provide services, for example, IT service providers, marketing services providers, auditors, business management consultants, mail and document management service providers;",
            "Product manufacturers;",
            "Debt collections agencies;",
            "Government, statutory, regulatory or enforcement bodies;",
            "External dispute resolution schemes;",
            "Credit reporting bodies;",
            "Other lessors or credit providers (including for references and collections activities);",
            "Any other person or organisation that you have asked us to provide your personal information to; and",
            "Any other organisation considering whether to acquire (or that has acquired) an interest in our business or any rights under your rental agreement or rent to own agreement with us.",
          ],
        },
        {
          desc: "We seek to limit the information we provide these organizations to the minimum that they need to perform their services or activities for us or for you. We will never import or scan your contacts unless you ask us to. The location and delivery address details captured is used strictly to show you availability of product stock in your area as well as deliver your order to your exact address. We will never gather or use your specific device location without first getting your explicit permission. Profile picture or other pictures upload allows you to choose individual pictures to change your user profile picture or easy upload of your documents for KYC purposes as per RBI (Reserve Bank of India) guidelines 2022. We will only access images that you specifically choose, and we will never scan or import your photo library or camera roll. ",
        },
      ],
    },
    {
      heading: "Marketing",
      message: [
        {
          desc: "We use personal information that we hold about you to identify services and products that may be of interest to you. We may contact you by email, text message, phone or by post to let you know about specials, our promotions or any new or existing products or services. We also use internet-based marketing including targeted online advertising and online behavioral marketing. We may also disclose your personal information in future to other payrentz group companies, affiliates, franchisees to allow them (or us) to tell you about a product or service. Our marketing agencies may contact you using information about you that they already hold, or we may provide your personal information to them, in order to serve you with more relevant advertising about our services and products. You can contact us (see details below) at any time if you no longer wish to receive marketing materials from us or affiliates or our partners.",
        },
      ],
    },
    {
      heading: "How we keep your information secure",
      message: [
        {
          ul: [
            "Securing information both in physical and electronic form;",
            "Having internal procedures and measures limiting access to personal information to only those who need access for their legitimate activities; and",
            "Protecting our IT systems by using appropriate technology solutions.",
          ],
        },
        {
          desc: "We may be required by law to retain your personal information for a period of time after you have ceased your relationship with us. After such time has passed or if we otherwise determine that we no longer need information about you, we will securely destroy or de-identify your personal information. We will take reasonable technical and organizational precautions to prevent the loss, misuse or alteration of your personal information. We assure you of our best effort to protect personal information, however, we do not represent, warrant, or guarantee that your personal information will be protected against unauthorized access, loss, misuse, or alterations, and do not accept any liability for the security of the personal information submitted to us or third parties' use or misuse of personal information.",
        },
      ],
    },
    {
      heading: "Will we disclose your personal information overseas?",
      message: [
        {
          desc: "Some of our technology and operational service providers may be placed overseas in future if required. This means that when we decided to use these provider's services, it may involve disclosing your personal information overseas. We only disclose personal information to our overseas service providers when it is necessary.",
        },
      ],
    },
    {
      heading: "Using other websites",
      message: [
        {
          desc: "You should note that our website may contain links or references to other websites to which this privacy policy may not apply. You should review the privacy policy of each of those websites and assess whether those policies are acceptable to you before using those websites.",
        },
      ],
    },
    {
      heading: "Cookies",
      message: [
        {
          desc: 'When you browse our site we may collect and log the following types of information ("Click stream data") including without limitation:',
          ul: [
            "the date and time that you visit our site; the amount of time you spend on our site;",
            "the particular pages that you visit; the type of browser you use;",
            "the address of your server; the address of the site that you have connected from;",
          ],
        },
        {
          desc: "payrentz does not use the click stream data or Cookies to personally identify you. We use the data on an aggregated and anonymous basis for purposes which include generating statistics, managing the effectiveness of our site, identifying repeat visitors, building anonymous profiles of visitors to enable content (including advertising and promotions) on the site to be tailored to them and for market research.",
        },
      ],
    },
    {
      heading: "Keeping your information up-to-date",
      message: [
        {
          desc: "It is very important that the personal information we collect and hold about you is accurate, complete and up-to-date. During the course of our relationship with you we will ask you to keep us informed of any changes to your personal information. However, you can contact us (details provided in the website) at any time to update your personal information or to tell us that the information we hold about you is in any way inaccurate or incomplete.",
        },
      ],
    },
    {
      heading: "DND Waiver",
      message: [
        {
          desc: "You agree and authorize the Company to use and share your information with its contractors and other third parties, in so far as required for joint marketing purposes/offering various services/report generations and/or to similar services to provide you with various value-added services, in association with the Services selected by you or otherwise. You agree to receive communications through emails, telephone and/or SMS, from the Company including its contractors or its third-party vendors regarding the Services/ancillary services updates, information/promotional emails and/or product announcements. In this context, you agree and consent to receive all communications at the mobile number provided, even if this mobile number is registered under DND/NCPR list under TRAI regulations, and for such purpose, you further authorize Company to share/disclose the information to its contractors or any third-party service provider.",
        },
      ],
    },
    {
      heading: "Payment Gateway",
      message: [
        {
          desc: "Information relating to electronic transactions entered into via the Website shall be protected by encryption technology. We have partnered with secure payment gateways i.e., Razorpay and Paytm gateway. The Website does not have the ability to interfere and do not interfere with the payment gateway mechanism. The Website has no access to the information that you may enter for making the payment through the payment gateway. Your transaction and banking details or other information as required for internet banking or other payment instruments is held by our Payment Gateway partner. By creating a link to a payment gateway, we do not endorse the payment gateway, nor are we liable for any failure of products or services offered by such payment gateway. Such payment gateway may have a privacy policy different from that of ours. All failures/ errors/ omissions of the payment gateway shall be solely on the payment gateway. You hereby consent that you shall not sue the Website for any disputes that you may have with the payment gateway for any wrong doing of the payment gateway.",
        },
      ],
    },
    {
      heading: "How you can access your personal information",
      message: [
        {
          desc: "You may request access to, and the correction of, any of the personal information we hold about you by contacting us as set out below:",
        },
        {
          desc: (
            <>
              <strong>Phone:</strong> +91 89395 81818
            </>
          ),
        },
        {
          desc: (
            <>
              <strong>Email:</strong> rent@payrentz.com
            </>
          ),
        },
        {
          desc: "When you contact us and request access to your personal information, we will need to verify your identity first and ask you further questions so that we can respond to your request as quickly as possible. We can't give you information about anyone else.",
        },
        {
          desc: "We will handle all requests for access to your personal information as quickly as possible, and we will endeavor to process any such requests within short span of time. Some requests for access may take longer to process depending upon the nature of the personal information being sought.",
        },
        {
          desc: "Making a request is free. But in some instances we may charge you a fee to cover the cost of retrieval and supply of information to you. The fee will not be excessive, and we will let you know if a fee will apply before we proceed with giving you access.",
        },
        {
          desc: "There may be reasons why we cannot give you access to the information that you have requested, or we refuse to correct your personal information. If this is the case, we will let you know these reasons in writing. If we refuse you access or to correct your personal information, you can make a complaint about this, by following the complaint procedures in this privacy policy.",
        },
      ],
    },
    {
      heading: "Changes to this privacy policy",
      message: [
        {
          desc: "We conduct regular reviews of all our policies and procedures and may change this privacy policy from time to time. By continuing to use our website or otherwise continuing to deal with us, you accept this privacy policy as it applies from time to time. Any changes to our privacy policy will be published on our website. So please check our website regularly for any updates to our privacy policy.",
        },
      ],
    },
    {
      heading: "Complaints, Queries and Feedback",
      message: [
        {
          desc: "If you have any questions or feedback about this Privacy Policy or website treatment of your Personal Information or concerns about our collection, use or disclosure of personal information, or if you believe that we have not complied with this privacy policy, please contact us as below.",
        },
        {
          desc: (
            <>
              The Grievance Officer
              <br />
              PR Rental Solutions Private Limited.,
              <br />
              payrentz, #14-20, Mahalakshmi Street,
              <br />
              Gandhi Road, Velachery, Chennai - 600 042.
              <br />
              <span className="font-[500] pr-2">Phone:</span>
              +91 89395 81818
              <br />
              <span className="font-[500] pr-2">Email:</span>
              <a
                href="mailto:rent@payrentz.com"
                className="!text-[#2b5cab] underline"
              >
                {" "}
                rent@payrentz.com
              </a>
            </>
          ),
        },
        {
          desc: "When contacting us, please provide as much detail as possible in relation to the query, issue or complaint. We will take your complaint seriously and it will be assessed by an appropriate person with the aim of resolving any issue in a timely and efficient manner. We ask that you cooperate with us during this process and provide us with relevant information we may require. All disputes between us and you in this regard are subject to exclusive jurisdiction of Chennai courts. ",
        },
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
          Privacy Policy
        </Text>
        <div className="flex flex-col bg-[#F6FAFF] rounded-[12px] flex  py-[30px] px-[20px]  md:py-[50px] md:px-[46px] gap-[30px]">
          {details?.map((m) => (
            <div key={m?.heading}>
              <Text
                text={m?.heading}
                className={"text-[18px] textWeight-[600] font-bold "}
                as="h2"
              />
              <div className="ml-[12px] md:ml-[20px]">
                {m?.message?.map((d) => (
                  <div key={d?.desc}>
                    <Text
                      style={{ lineHeight: "24px" }}
                      text={d?.desc}
                      className={
                        "mt-2 text-justify text-[16px] font-normal !lh-[24px]"
                      }
                    />
                    {d?.ul?.length > 0 && (
                      <div className="my-2 ml-4">
                        <ul className="list-outside list-disc">
                          {d?.ul?.map((l) => (
                            <li key={l}>{l}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AppContainer>
    </Layout>
  );
};

export default page;
