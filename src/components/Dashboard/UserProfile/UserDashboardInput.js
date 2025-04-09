import { userDataContext } from "@/app/dashboard/user-profile/page";
import AppInput from "@/components/Input/AppInput";
import AppLabel from "@/components/Label/AppLabel";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import React, { useContext } from "react";

const UserDashboardInput = ({
  label,
  type = "text",
  placeholder,
  isError,
  name,
  labelClassName = "",
  inputClassName = "",
  radioArr = [],
  readOnly = false,
  gridCols = "2",
  labelWidth = "50%",
  options,
  dontAlterOptions = false,
  //   value,
}) => {
  const { handleInputChange, error, userData } = useContext(userDataContext);

  // console.log("userDatauserData", userData);

  if (type == "radio") {
    return (
      <LabelWrapper
        label={label}
        labelClassName={"!text-[16px] !font-medium"}
        className={`md:w-[${labelWidth}]`}
      >
        <div
          className={`grid grid-cols-2 md:grid-cols-${gridCols} gap-[10px] normal-variant-numeric`}
        >
          {radioArr?.map((m, ind) => (
            <div
              key={m?.value}
              className="flex items-center  rounded-[5px] gap-[10px] px-[20px] py-[10px] normal-variant-numeric"
            >
              <AppInput
                checked={String(userData?.[name]) === m.value}
                onChange={(e) => handleInputChange(e, "radio")}
                value={m?.value}
                name={name}
                type="radio"
                id={m?.value}
                className="border rounded-[25px] !w-[20px] !h-[20px] cursor-pointer normal-variant-numeric"
                wrapperClassName="!w-fit !h-fit"
                readOnly={readOnly}
                disabled={readOnly}
              />
              <AppLabel
                htmlFor={m?.value}
                text={m?.label}
                className={"font-medium cursor-pointer md:!text-[16px]"}
              />
            </div>
          ))}
        </div>
      </LabelWrapper>
    );
  }

  if (type == "select") {
    return (
      <LabelWrapper
        label={label}
        labelClassName={`!text-[16px] !font-medium md:w-[${labelWidth}]`}
        className={`md:w-[${labelWidth}]`}
      >
        <AppSelect
          wrapperClassname={"!max-w-[800px]"}
          name={name}
          placeholder=""
          className="app-form-input normal-variant-numeric"
          isError={error}
          value={userData?.floor_number}
          options={options}
          normalValue={true}
          floorValue={true}
          isRequired={true}
          dontAlterOptions={dontAlterOptions}
          readOnly={readOnly}
          onChange={(selectedOption) =>
            handleInputChange(selectedOption, "select", "floor_number")
          }
        />
      </LabelWrapper>
    );
  }
  return (
    <LabelWrapper
      label={label}
      labelClassName={`!text-[16px] !font-medium ${labelClassName}`}
      className={"w-[100%]"}
    >
      <AppInput
        value={userData}
        isError={error}
        name={name}
        type={type}
        placeholder={placeholder}
        wrapperClassName="user-input"
        className={`border user-input !text-[16px] py-[8px] pl-[10px] border-[#E6E7E9] rounded-[5px] normal-variant-numeric ${inputClassName}`}
        onChange={(e) => handleInputChange(e)}
        readOnly={readOnly}
      />
    </LabelWrapper>
  );
};

export default UserDashboardInput;
