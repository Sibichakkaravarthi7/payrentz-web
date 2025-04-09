import AppFaqComponent from "@/components/AppFaqComponent";
import AppContainer from "@/components/Container/AppContainer";
import Layout from "@/components/Layout/Layout";
import Text from "@/components/Text/Text";
import { frequentlyAskedQuestions } from "@/utils/FaqData";
import React from "react";

function page() {
  return (
    <Layout>
      <AppContainer>
        <div className="w-full ">
          <div className="text-left mt-[40px] mb-[20px]">
            <Text
              className={
                "text-[18px] md:text-[32px] font-extrabold text-appBlue inline"
              }
              as="h2"
            >
              Frequently Asked Questions
            </Text>
            {/* <Text className={"text-[12px] font-medium mt-[5px]"}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit turpis
            </Text> */}
          </div>
          <div className="bg-[#F6FAFF] rounded-[12px] flex  py-[30px] px-[20px]  md:py-[50px] md:px-[46px] flex-col gap-[20px] ">
            {frequentlyAskedQuestions?.map((a, ind) => (
              <AppFaqComponent
                key={a?.question}
                id={ind}
                title={a?.question}
                answer={a?.answer}
              />
            ))}
          </div>
        </div>
      </AppContainer>
    </Layout>
  );
}

export default page;
