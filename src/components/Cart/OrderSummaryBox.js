import React, { useContext, useState } from "react";
import Text from "../Text/Text";
import { convertToPrice } from "@/utils/Constants";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";
import { arrow_down, arrow_up } from "@/Icons";
import AppImage from "../Image/AppImage";
import useAppStore from "@/Store/Store";
import { useMutation } from "react-query";
import makeDeleteRequest from "@/utils/makeDeleteRequest";
import { POST_APPLY_COUPON } from "@/api/urls/urls";
import { deleteCookie } from "cookies-next";
import toast from "react-hot-toast";

const OrderSummaryBox = () => {
  const { summaryData } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false); // Accordion state
  const { setSummaryEnabled } = useAppStore();
  const toggleAccordion = () => setIsOpen(!isOpen);

  const summaryList = [
    {
      title: `Refundable Deposit (${summaryData?.data?.total_variant_count} items)`,
      price: summaryData?.data?.total_variant_deposit || 0,
    },
    {
      title: "Handling & Shipping Charges",
      price:
        Math.round(
          summaryData?.data?.total_variant_handling_charge +
            summaryData?.data?.distance_charge +
            summaryData?.data?.lifting_charge
        ) || 0,
      isAccordion: true, // Mark as accordion
      details: [
        {
          title: "Handling Charges",
          price: summaryData?.data?.total_variant_handling_charge || 0,
        },
        {
          title: "Distance Charges",
          price: summaryData?.data?.distance_charge || 0,
        },
        {
          title: "Lifting Charges",
          price: summaryData?.data?.lifting_charge || 0,
        },
      ],
    },
    {
      title: `Accessories (${summaryData?.data?.total_accessory_count} items)`,
      price: summaryData?.data?.total_accessory_price || 0,
    },
  ];
  const { isLoading, mutate } = useMutation(
    (body) => makeDeleteRequest(POST_APPLY_COUPON(body?.coupon)),
    {
      onSuccess: (res) => {
        console.log("coupon deleted", res);
        deleteCookie("coupon_number");
        toast.error("Coupon removed.");
        setSummaryEnabled({ se: false });
      },
    }
  );
  return (
    <div className="rounded-[5px] bg-[#F7FAFC] px-[14px] py-[24px] md:px-[20px] md:py-[30px]">
      <Text className="text-appRed text-[17px] md:text-[24px] font-bold mb-[20px] md:mb-[30px]">
        Payable Now
      </Text>

      <div className="flex flex-col gap-[10px] md:gap-[20px] mb-[17px] md:mb-[21px]">
        {summaryList?.map((item) =>
          item.isAccordion ? (
            <div key={item.title}>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleAccordion}
              >
                <div className="flex justify-between items-center cursor-pointer select-none">
                  <Text className="text-[12px] md:text-[16px] font-[400]">
                    {item.title}
                  </Text>
                  <AppImage
                    src={isOpen ? arrow_up : arrow_down}
                    height={16}
                    width={27}
                    className={`max-h-[16px] pl-[5px]
                    }`}
                  />
                </div>
                <Text className="text-[12px] md:text-[16px] font-[600]">
                  {convertToPrice(item.price)}
                </Text>
                {summaryData?.data?.is_coupon_applied && (
                  <div className="flex justify-between">
                    <Text className="text-[12px] text-[#2FB344] md:text-[16px] font-[400]">
                      Coupon offer
                    </Text>
                    <Text className="text-[12px] text-[#2FB344] md:text-[16px] font-[600]">
                      (-) {convertToPrice(summaryData?.data?.discount)}
                    </Text>
                  </div>
                )}
              </div>
              {isOpen &&
                item.details.map((detail) => (
                  <div
                    key={detail.title}
                    className="flex justify-between pl-4 pt-2 text-gray-500"
                  >
                    <Text className="text-[12px] md:text-[14px]">
                      {detail.title}
                    </Text>
                    <Text className="text-[12px] md:text-[14px]">
                      {convertToPrice(detail.price)}
                    </Text>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex justify-between" key={item.title}>
              <Text className="text-[12px] md:text-[16px] font-[400]">
                {item.title}
              </Text>
              <Text className="text-[12px] md:text-[16px] font-[600]">
                {convertToPrice(item.price)}
              </Text>
              {summaryData?.data?.is_coupon_applied && (
                <div className="flex justify-between">
                  <Text className="text-[12px] text-[#2FB344] md:text-[16px] font-[400]">
                    Coupon offer
                  </Text>
                  <Text className="text-[12px] text-[#2FB344] md:text-[16px] font-[600]">
                    (-) {convertToPrice(summaryData?.data?.discount)}
                  </Text>
                </div>
              )}
            </div>
          )
        )}
      </div>

      <div className="flex justify-between pt-[22px] md:pt-[28px] border-t border-[#DBDBDB]">
        <Text className="text-[14px] md:text-[18px] font-[600]">
          Total Payable
          <span className="text-[12px] pl-[7px] md:text-[14px] font-[400]">
            (incl. GST)
          </span>
        </Text>
        <Text className="text-[14px] md:text-[18px] font-[800]">
          {convertToPrice(summaryData?.data?.total_payable || "0")}
        </Text>
      </div>
    </div>
  );
};

export default OrderSummaryBox;
