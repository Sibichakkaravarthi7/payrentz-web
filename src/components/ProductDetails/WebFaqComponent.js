import React from "react";
import Text from "../Text/Text";

function WebFaqComponent({ id, question, answer }) {
  return (
        <div>
          <div key={id} className={`py-[20px] ${id === 4 ? "border-[#2B5CAB]" : ""} border-b-2`}>
            <Text className={"font-extrabold"}>{question}</Text>
            <Text className={"mt-[10px] !leading-[26px] tracking-[-0.16px]"}>
              {answer}
            </Text>
          </div>
        </div>
  );
}

export default WebFaqComponent;
