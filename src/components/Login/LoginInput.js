import React from "react";
import Text from "../Text/Text";
import AppInput from "../Input/AppInput";

const LoginInput = ({ handleInputChange, formData, handleEnterClick }) => {
  return (
    <div className="border border-[#E6E7E9] rounded-[5px] py-[7px] md:py-[11px] flex items-center">
      <Text
        className={
          "text-[14px] md:text-[16px] font-[500] px-[8px] md:px-[10px] border-r border-[#E6E7E9] text-[#858585]"
        }
      >
        +91
      </Text>
      <input
        onInput={(e) =>
          (e.target.value = /^[0-9]+$/.test(e.target.value) ? e.target.value : null)
        }
        onChange={(e) => handleInputChange(e)}
        // onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
        value={formData?.phone}
        type="tel"
        name="phone"
        maxlength="10"
        className="text-[14px] md:text-[16px] font-[500] no-style ms-[10px] md:ms-[13px] text-[#858585] placeholder:text-[#DBDBDB] login-phone"
        placeholder="9876543210"
        onKeyDownCapture={(e) =>
          e.key === "Enter" ? handleEnterClick() : null
        }
      />
    </div>
  );
};

export default LoginInput;
