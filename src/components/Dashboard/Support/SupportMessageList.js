import { Favicon, PayrentzWhiteRedLogo } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import moment from "moment";
import React from "react";

const SupportMessageList = ({ messageList = [], refProp }) => {
  return (
    <div
      ref={refProp}
      className="max-h-[200px] overflow-y-scroll notes-box-shadow"
    >
      {messageList?.map((m) => (
        <div key={m?.id}>
          <div className="flex justify-between pt-[22px] md:pl-[21px] md:pr-[24px]">
            <div className="flex gap-[19px]">
              <div className="w-[32px] h-[32px] border rounded-[50%] border-[#000] flex justify-center items-center">
                {m?.is_admin ? (
                  <AppImage className="w-[60%]" src={Favicon} />
                ) : null}
              </div>
              <div>
                <Text className={"text-[#1D273B] font-medium text-[14px]"}>
                  {m?.created_by}
                </Text>
                <Text className={"text-[#888E98] font-normal text-[14px]"}>
                  {moment(m?.created).format("lll")}
                </Text>
              </div>
            </div>
          </div>
          <Text
            className={
              "text-[#1D273B] ml-[50px] md:ml-[72px] text-[14px] font-normal mt-[9px]"
            }
          >
            {m?.notes}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default SupportMessageList;
