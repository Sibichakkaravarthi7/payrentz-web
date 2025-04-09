"use client";

import AppContainer from "@/components/Container/AppContainer";
import DocumentUploadForm from "@/components/KYC/DocumentUpload/DocumentUploadForm";
import KYCFormWrapper from "@/components/KYC/KYCFormWrapper";
import BasicForm from "@/components/KYC/PersonalDetails/BasicForm";
import KycCombinedStep from "@/components/KYC/PersonalDetails/KycCombinedStep";
import Selfie from "@/components/KYC/PersonalDetails/Selfie";
import KycStepper from "@/components/KYC/Stepper/KycStepper";
import React from "react";

function Page({ params }) {
  const step = parseInt(params?.step);

  const kycData = [
    {
      stepNumber: 1,
      title: "Kindly choose from the below options",
      component: <KycCombinedStep />,
    },
    // {
    //   stepNumber: 2,
    //   title: "Select your Marital Status",
    //   component: <MaritalStatus />,
    // },
    // {
    //   stepNumber: 3,
    //   title: "Select your Occupation",
    //   component: <Occupation />,
    // },
    // {
    //   stepNumber: 4,
    //   title: "Select your Residency Type",
    //   component: <ResidencyType />,
    // },
    // {
    //   stepNumber: 5,
    //   title: "For Whom do you rent the product?",
    //   component: <RentForWhom />,
    // },
    {
      stepNumber: 2,
      title: "Let us know more about you",
      component: <BasicForm />,
    },
    {
      stepNumber: 3,
      title: "KYC Documents",
      component: <DocumentUploadForm />,
    },
    {
      stepNumber: 4,
      title: "Say Cheese",
      component: <Selfie />,
    },
  ];

  const currentComp = kycData?.[step - 1];

  return (
    // <Layout>
    <AppContainer>
      <KycStepper step={parseInt(step)} />
      <KYCFormWrapper
        key={currentComp?.title}
        title={currentComp?.title}
        stepNumber={currentComp?.stepNumber}
        component={currentComp?.component}
        stepsCount={kycData?.length}
      />
    </AppContainer>
    // </Layout>
  );
}

export default Page;
