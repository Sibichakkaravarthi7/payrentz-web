import React, { useContext, useState } from "react";
import Text from "../Text/Text";
import AppInput from "../Input/AppInput";
import AppButton from "../Button/AppButton";
import { CouponSuccess, PayrentzMiniLogo } from "@/Icons";
import AppImage from "../Image/AppImage";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";
import { useMutation } from "react-query";
import makePostRequest from "@/utils/makePostRequest";
import { POST_APPLY_COUPON } from "@/api/urls/urls";
import toast from "react-hot-toast";
import AppLoader from "../Loader/AppLoader";
import { setCookie } from "cookies-next";
import { useDebounce } from "use-debounce";
import useAppStore from "@/Store/Store";

const CouponModal = ({ onClose }) => {
  const [currPage, setCurrPage] = useState(1);
  const [appliedCoupon, setAppliedCoupon] = useState({});
  const { summaryData, summaryRefetch } = useContext(CartContext);
  const AvailableCoupons = summaryData?.data?.applicable_coupons;
  const OtherCoupons = summaryData?.data?.other_coupons;
  const [searchVal, setSearchVal] = useState("");
  const { summaryEnabled, setSummaryEnabled } = useAppStore();

  const SingleCard = ({ d, fromOtherCoupons = false }) => {
    const AppBtnComp = ({ d }) => {
      const { data, isLoading, mutate } = useMutation(
        (body) => makePostRequest(POST_APPLY_COUPON(body?.id)),
        {
          onSuccess: (data) => {
            setCurrPage(2);
            setAppliedCoupon(data);
            setCookie("coupon_number", data?.data?.coupon_id);
            toast.success("Coupon applied successfully");
            setSummaryEnabled({ se: false });
          },
          onError: (err) => {
            toast.error(
              err?.response?.data?.message || "Login to apply Coupons."
            );
            onClose();
            // openLoginModal();
            console.log(err);
          },
        }
      );
      return (
        <div className="">
          {isLoading ? (
            <AppLoader />
          ) : (
            <AppButton
              className="text-appRed text-[15px] font-semibold cursor-pointer "
              text="Apply Coupon"
              onClick={() => {
                mutate({ id: d?.id });
              }}
              disabled={fromOtherCoupons}
              // isLoading={isLoading}
            />
          )}
        </div>
      );
    };

    return (
      <div className="rounded-md border-[1px] border-[#DBDBDB] p-[10px] md:p-[20px]">
        <div className="flex justify-between items-center mb-[10px]">
          <div className=" bg-[#F3F7FF] p-[8px] md:p-[10px] flex items-center gap-1">
            <AppImage src={PayrentzMiniLogo} w={16} h={16} loading="lazy" />
            <Text className="font-semibold text-[13px] md:text-[16px] ">
              {d?.coupon_code}
            </Text>
          </div>
          <div className="">
            <AppBtnComp d={d} />
          </div>
        </div>
        <Text className="font-semibold text-[13px] md:text-[17px]">
          {d?.coupon_title}
        </Text>
        <div
          dangerouslySetInnerHTML={{ __html: d?.description }}
          className={"mt-[10px] text-[12px] md:text-[14px] "}
        ></div>
      </div>
    );
  };

  const {
    data,
    isLoading,
    mutate: mutateFromField,
  } = useMutation((body) => makePostRequest(POST_APPLY_COUPON(body?.id)), {
    onSuccess: (res) => {
      setCurrPage(2);
      setAppliedCoupon(res);
      setCookie("coupon_number", res?.data?.coupon_id);
      toast.success("Coupon applied successfully");
      setSummaryEnabled({ se: false });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login to apply Coupons.");
      onClose();
      // openLoginModal();
      console.log(err);
    },
  });

  const ApplyFromField = () => {
    console.log(summaryData?.data?.applicable_coupons);
    console.log(searchVal);

    let couponToApply = summaryData?.data?.applicable_coupons?.filter(
      (d) => d?.coupon_code == searchVal?.toUpperCase()
    );
    if (couponToApply?.length > 0) {
      mutateFromField({ id: couponToApply?.[0]?.id });
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  return (
    <div>
      {currPage == 1 ? (
        <div>
          <Text className="text-2xl md:text-3xl text-appRed font-semibold mb-[10px]">
            Coupons
          </Text>
          <div className="flex items-center gap-[10px] mb-[20px] ">
            <AppInput
              placeholder="Enter coupon code"
              className="rounded-md"
              onChange={(e) => setSearchVal(e?.target?.value)}
            />
            <AppButton
              text="Apply"
              variant="red"
              onClick={() => ApplyFromField()}
              isLoading={isLoading}
              disabled={searchVal == ""}
            />
          </div>

          {/* Available Coupons */}
          <div className="my-[20px]">
            <Text className="text-[12px] md:text-[14px] text-[#858585] font-[500] my-[8px]">
              AVAILABLE COUPONS
            </Text>
            <div className="flex flex-col gap-[10px]">
              {AvailableCoupons?.map((d) => (
                <SingleCard d={d} key={d?.id} />
              ))}
            </div>
          </div>
          {/* Other Coupons  */}
          <div className="">
            <Text className="text-[12px] md:text-[14px] text-[#858585] font-[500] my-[8px]">
              OTHER COUPONS
            </Text>
            <div className="flex flex-col gap-[10px]">
              {OtherCoupons?.map((d) => (
                <SingleCard d={d} key={d?.id} fromOtherCoupons />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[5px]">
          <AppImage
            className="min-w-[250px] "
            src={CouponSuccess}
            w={30}
            h={30}
            loading="lazy"
          />
          <Text className=" text-2xl text-[#858585] font-semibold  ">
            {appliedCoupon?.data?.coupon_code} APPLIED
          </Text>
          <Text className="mt-[15px] text-2xl font-semibold">
            ₹{appliedCoupon?.data?.discount}
          </Text>
          <Text className="mt-[10px] font-semibold">
            saved by applying this coupon
          </Text>
          <Text className="mt-[30px] text-xl font-semibold text-appRed ">
            WOWZA!
          </Text>
        </div>
      )}
    </div>
  );
};

export default CouponModal;
