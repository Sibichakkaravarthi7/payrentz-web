"use client";

import Text from "@/components/Text/Text";
import React from "react";
import AccessoryCard from "./AccessoryCard";
import { ImagePlaceholder } from "@/Icons";
import { useQuery } from "react-query";
import { GET_ADDED_CART_ACCESSORY_LIST } from "@/api/urls/urls";
import makeGetRequest from "@/utils/makeGetRequest";

function AccessoriesBought() {
  const { data: accessoriesList } = useQuery(
    [GET_ADDED_CART_ACCESSORY_LIST],
    () => makeGetRequest(GET_ADDED_CART_ACCESSORY_LIST),
    {
      onSuccess: (res) => {
        // console.log("accessories list", res);
      },
    }
  );

  // console.log("accessories listtttt", accessoriesList);
  return (
    <div>
      <div className="md:pl-[14px]">
        <Text className={"text-[28px] font-bold mt-[10px] md:mt-0 mb-[30px]"}>
          My Accessories
        </Text>

        {accessoriesList?.data?.count > 0 ? (
          <div className="grid grid-cols-2 md:flex flex-wrap gap-[10px] md:gap-[20px]">
            {accessoriesList?.data?.results?.map((m, ind) => (
              <AccessoryCard
                key={ind}
                img={
                  m?.accessory_detail?.image_detail[0]?.file || ImagePlaceholder
                }
                price={m?.amount}
                quantity={m?.quantity}
                identity={m?.accessory_detail?.identity}
              />
            ))}
          </div>
        ) : (
          <div>
            <Text
              className={"text-[#858585] text-[16px] font-[500] text-center"}
            >
              No accessories bought for your subscription
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccessoriesBought;
