import React, { useContext } from "react";
import Text from "../Text/Text";
import CartSelectAccessories from "./CartSelectAccessories";
import LoaderLayout from "../Layout/LoaderLayout";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";

const CartAccessories = () => {
  const [accessories, setAccessories] = React.useState([]);
  const {
    accessoriesData,
    isCartAccessoriesDataLoading,
    addedAccessoriesData,
    isAddedCartAccessoriesDataLoading,
    refetchAccessories,
  } = useContext(CartContext);

  // console.log("accessories data", accessoriesData);
  // console.log("addded accessories data", addedAccessoriesData);
  return (
    <div className="pt-[20px]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[18px] justify-between items-center">
        <LoaderLayout height={50} isLoading={isCartAccessoriesDataLoading}>
          {/* {addedAccessoriesData?.data?.order_data?.map((obj) => (
            <CartSelectAccessories
              accessories={accessories}
              setAccessories={setAccessories}
              obj={obj}
              key={obj?.id}
            />
          ))} */}
          {accessoriesData?.data?.count > 0 ? (
            <>
              {accessoriesData?.data?.results?.map((obj) => (
                <CartSelectAccessories
                  accessories={accessories}
                  setAccessories={setAccessories}
                  obj={obj}
                  key={obj?.id}
                  refetch={refetchAccessories}
                />
              ))}
            </>
          ) : (
            <>
              <div className="p-[10px]">
                <Text
                  className={
                    "font-semibold whitespace-nowrap text-[#CDCDCD] text-[8px] md:text-[15px]"
                  }
                >
                  No accessories available for the cart item
                </Text>
              </div>
            </>
          )}
        </LoaderLayout>
      </div>
    </div>
  );
};

export default CartAccessories;
