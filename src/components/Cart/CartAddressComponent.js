import React, { useContext, useEffect, useState } from "react";
import LabelWrapper from "../Login/LabelWrapper";
import AppInput from "../Input/AppInput";
import AppSelect from "../Select/AppSelect";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";

const CartAddressComponent = () => {
  const { formData, setFormData, error } = useContext(CartContext);
  const [pincodeInfo, setPincodeInfo] = useState({ city: "", state: "" });
  const query = require("india-pincode-search");

  const handleInputChange = (e, selectName) => {
    if (selectName) {
      // Handle react-select case
      setFormData((prev) => ({
        ...prev,
        [selectName]: e ? e.value : "", // `e` is the selected option
      }));
    } else if (e && e.target) {
      // Handle regular input fields
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (formData?.pincode?.length === 6) {
      // console.log("Pincode:", formData?.pincode);
      const result = query.search(formData?.pincode?.toString());
      // console.log("Search result:", result);
      if (result.length > 0) {
        const { city, state } = result[0];
        setPincodeInfo({ city, state });
        setFormData((prev) => ({
          ...prev,
          address_city: city,
          address_state: state,
        }));
      } else {
        setPincodeInfo({ city: "", state: "" });
        setFormData((prev) => ({
          ...prev,
          address_city: "",
          address_state: "",
        }));
      }
    }
  }, [formData?.pincode]);

  useEffect(() => {
    if (formData?.lift_availability === undefined) {
      setFormData((prev) => ({ ...prev, lift_availability: "no" }));
    } else if (typeof formData?.lift_availability === "boolean") {
      setFormData((prev) => ({
        ...prev,
        lift_availability: formData?.lift_availability ? "yes" : "no",
      }));
    }
  }, [formData?.lift_availability]);

  // console.log("Pincode:", formData.pincode.toString());
  // console.log("resullllllt", query.search(formData?.pincode?.toString()))

  // console.log("pincode updates", pincodeInfo)

  return (
    <div className="pt-[20px] md:pt-[40px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] gap-x-[30px]">
        <LabelWrapper label="Lift is available" labelClassName="!text-[16px]">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <AppInput
                type="radio"
                name="lift_availability"
                value="yes"
                checked={formData?.lift_availability == "yes"}
                onChange={handleInputChange}
                className="border rounded-[25px] !w-[25px] !h-[25px]"
              />
              Yes
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <AppInput
                type="radio"
                name="lift_availability"
                value="no"
                checked={formData?.lift_availability == "no"}
                onChange={handleInputChange}
                className="border rounded-[25px] !w-[25px] !h-[25px]"
              />
              No
            </label>
          </div>
        </LabelWrapper>

        <LabelWrapper label="Floor No.*" labelClassName="!text-[16px]">
          {formData?.lift_availability === "no" ? (
            // Dropdown if lift is NOT available
            <AppSelect
              name="floor_number"
              value={formData?.floor_number || ""}
              onChange={(selectedOption) =>
                handleInputChange(selectedOption, "floor_number")
              }
              options={[
                { identity: "0", id: "0" },
                { identity: "1", id: "1" },
                { identity: "2", id: "2" },
                { identity: "3", id: "3" },
              ]}
              className={"appinput-size-for-sm invoice-select"}
              isError={error}
              normalValue={true}
              floorValue={true}
              isRequired={true}
            />
          ) : (
            // Input if lift IS available
            <AppInput
              name="floor_number"
              type="number"
              onInput={(e) =>
                (e.target.value = /^[0-9]+$/.test(e.target.value)
                  ? e.target.value
                  : null)
              }
              placeholder="Enter Floor Number"
              className="app-form-input"
              onChange={handleInputChange}
              isError={error}
              value={formData || ""}
              maxLength={5}
            />
          )}
        </LabelWrapper>
        <LabelWrapper label={"Address Line 1*"} labelClassName={"!text-[16px]"}>
          <AppInput
            name="address_line1"
            placeholder=""
            className="app-form-input"
            onChange={(e) => handleInputChange(e)}
            isError={error}
            value={formData}
          />
        </LabelWrapper>

        <LabelWrapper label={"Address Line 2*"} labelClassName={"!text-[16px]"}>
          <AppInput
            name="address_line2"
            placeholder=""
            className="app-form-input"
            onChange={(e) => handleInputChange(e)}
            isError={error}
            value={formData}
          />
        </LabelWrapper>
        <LabelWrapper label={"Pincode*"} labelClassName={"!text-[16px]"}>
          <AppInput
            onInput={(e) =>
              (e.target.value = /^[0-9]+$/.test(e.target.value)
                ? e.target.value
                : null)
            }
            placeholder=""
            name={"pincode"}
            className="app-form-input"
            onChange={(e) => handleInputChange(e)}
            isError={error}
            value={formData}
            maxLength={6}
          />
        </LabelWrapper>
        <LabelWrapper label={"City*"} labelClassName={"!text-[16px]"}>
          <AppInput
            placeholder=""
            name="address_city"
            className="app-form-input"
            onChange={(e) => handleInputChange(e)}
            isError={error}
            value={formData}
          />
        </LabelWrapper>
        <LabelWrapper label={"State*"} labelClassName={"!text-[16px]"}>
          <AppInput
            placeholder=""
            name="address_state"
            className="app-form-input"
            onChange={(e) => handleInputChange(e)}
            isError={error}
            value={formData}
          />
        </LabelWrapper>
      </div>
    </div>
  );
};

export default CartAddressComponent;
