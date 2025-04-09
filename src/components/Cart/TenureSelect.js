import React from "react";
import AppSelect from "../Select/AppSelect";
import { getTenureFromOption } from "@/utils/Constants";
import makePutRequest from "@/utils/makePutRequest";
import { MODIFY_TENURE_FOR_CART_ITEM_URL } from "@/api/urls/urls";
import { getCookie } from "cookies-next";
import { useMutation } from "react-query";
import makePostRequest from "@/utils/makePostRequest";

const TenureSelect = ({ cartItem, tenure, availableTenure, refetch, variantUuid }) => {
  const guestUuid = getCookie("guest_user_id");
  const { isLoading, mutate } = useMutation(
    (body) =>
      makePutRequest(MODIFY_TENURE_FOR_CART_ITEM_URL, body),
    {
      onSuccess: (res) => {
        refetch();
        // console.log(res);
      },
    }
  );

  const value = getTenureFromOption([tenure])?.[0];
  const label = value?.id === 1 ? `${value?.id} month+` : `${value?.id}+ months`
  const valObj = {
    label: label,
    value: value?.id,
  };

  const handleChange = (e) => {
    mutate({
      guest_uuid: guestUuid,
      tenure: e?.value,
      uuid: variantUuid,
      type: cartItem?.type?.toLowerCase(),
    });
  };

  const returnOptions = (ten) => {
    const options =  [1, 3, 6, 12]?.filter((f) => ten?.[`tenure_${f}`]) || [];
    return options?.map(option => {
      const label = option === 1 ? `${option} month+` : `${option}+ months`
      return {
        id: option,
        identity: label,
      }
    })
  };

  // console.log("tenure object", returnOptions(availableTenure).reverse(), valObj)  

  return (
    <div className="max-w-[85px] md:max-w-[108px]">
      <AppSelect
        value={valObj}
        defaultValue={getTenureFromOption([tenure])?.[0]}
        classNamePrefix={"cart-tenure"}
        className={"tenure-select"}
        options={returnOptions(availableTenure).reverse()}
        onChange={handleChange}
        normalValue
      />
    </div>
  );
};

export default TenureSelect;

