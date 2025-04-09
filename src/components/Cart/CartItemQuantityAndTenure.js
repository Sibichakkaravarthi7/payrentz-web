import React from "react";
import Text from "../Text/Text";
import QuantityButton from "./QuantityButton";
import TenureSelect from "./TenureSelect";

const CartItemQuantityAndTenure = ({
  cartItem,
  quantity,
  tenure,
  variantUuid,
  refetch,
  availableTenure,
}) => {
  return (
    <div className="flex items-center justify-start md:gap-[20px] gap-[8px]">
      <div className="flex items-center gap-[4px] md:gap-[16px]">
        <Text className={"text-[10px] md:text-[16px] font-[600]"}>Tenure</Text>
        <TenureSelect
          cartItem={cartItem}
          variantUuid={variantUuid}
          refetch={refetch}
          availableTenure={availableTenure}
          tenure={tenure}
        />
      </div>
        <div className="flex items-center gap-[4px] md:gap-[16px]">
          <Text className={"text-[10px] md:text-[16px] font-[600]"}>
            Quantity
          </Text>
          <QuantityButton
            refetch={refetch}
            variantUuid={variantUuid}
            quantity={quantity}
            cartItem={cartItem}
          />
        </div>
    </div>
  );
};

export default CartItemQuantityAndTenure;
