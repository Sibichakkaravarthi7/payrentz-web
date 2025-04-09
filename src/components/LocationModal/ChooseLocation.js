"use client";
import React, { useState } from "react";
import ChooseLocationFromPincode from "./ChooseLocationFromPincode";
import PickCityFromIcon from "./PickCityFromIcon";
import { makeRequest } from "@/utils/makeRequest";
import {
  GENERATE_GUEST_USER_TOKEN_URL,
  GET_CART_COUNT,
  GET_CART_ITEMS_URL,
  // GET_CITY_WITH_PINCODE,
  PINCODE_VERIFY_URL,
} from "@/api/urls/urls";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import useAppStore from "@/Store/Store";
import {
  cookieAge,
  generateCustomFingerprint,
  getUserToken,
} from "@/utils/Constants";
import { useQuery, useQueryClient } from "react-query";
import CloseButton from "../CloseButton";
// import makeGetRequest from "@/utils/makeGetRequest";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const ChooseLocation = ({ onClose, cityData }) => {
  const [pincodeValue, setPincodeValue] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const userToken = getUserToken();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const redirectPhone = searchParams.get("phone");
  const redirectPage = searchParams.get("redirect");
  const redirectsto = searchParams.get("redirectsto");
  const pathname = usePathname();

  const { setLocation, setUserType, isLocationChangeOn, openLoginModal } =
    useAppStore();
  const router = useRouter();
  const handleVerifyPincode = (pincode) => {
    setLoading(true);
    makeRequest({
      url: PINCODE_VERIFY_URL,
      method: "POST",
      data: { pincode },
    })
      .then((res) => {
        const customGuestId = generateCustomFingerprint();
        // console.log("ress", res);
        const loc = {
          pincode: pincodeValue?.pincode,
          city: res?.data?.city_name,
        };
        const city = res?.data?.city_name.toLowerCase();
        const pathSegments = pathname?.split("/").filter(Boolean); // Split and remove empty values

        if (pathname !== "/sitemap" && pathSegments.length > 0) {
          pathSegments[0] = city; // Change only the first segment (city)
          router.push(`/${pathSegments.join("/")}`);
        }
        handleGenerateGuestToken(loc, customGuestId);
        // await setLocation(loc);
        // setCookie("user_loc", loc);
        // setLoading(false);
        // onClose();
      })
      .catch((err) => {
        console.log("error", err);
        // toast.error(err?.response?.data?.data);
        setError(err?.response?.data?.data);
        setLoading(false);
      });
  };

  const handleCitySelection = ({ city, pincode }) => {
    const loc = {
      city,
      pincode,
    };
    const customGuestId = generateCustomFingerprint();
    handleGenerateGuestToken(loc, customGuestId);
  };

  const handleGenerateGuestToken = async (loc, browser_id) => {
    makeRequest({
      url: GENERATE_GUEST_USER_TOKEN_URL,
      method: "POST",
      data: { pincode: loc?.pincode, browser_id: browser_id },
      headers: {
        Authorization: userToken ? `Token ${userToken}` : undefined,
      },
    })
      .then(async (res) => {
        setUserType("guest");
        await setLocation(loc);
        // const expires = new Date(Date.now() + cookieAge);
        await setCookie("guest_user_id", res?.data?.guest_uuid, {
          maxAge: cookieAge,
        });
        setCookie("user_loc", loc, {
          maxAge: cookieAge,
        });

        setLoading(false);
        queryClient.invalidateQueries({ queryKey: [GET_CART_COUNT] });
        queryClient.invalidateQueries({ queryKey: [GET_CART_ITEMS_URL] });
        isUserCameInViaRedirectionLink();
        onClose();
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.response?.data?.data);
        setError(err);
        setLoading(false);
      });
  };

  // const { data, isLoading, refetch } = useQuery(
  //   [GET_CITY_WITH_PINCODE],
  //   () => makeGetRequest(GET_CITY_WITH_PINCODE),
  //   {
  //     onSuccess: (res) => {},
  //     onError: (err) => {
  //       console.log(err);
  //     },
  //   }
  // );

  const isUserCameInViaRedirectionLink = () => {
    if ((redirectPage && redirectPhone) || redirectsto) {
      openLoginModal();
    }
  };

  const handleCloseButtonClick = () => {
    const cityObj = cityData?.data?.results;
    handleCitySelection({
      city: cityObj[0]?.identity,
      pincode: cityObj[0]?.pincode_detail,
    });
  };

  return (
    <div className="relative">
      <div className="absolute right-[-10px] top-[-20px] md:right-[-40px] md:top-[-50px]">
        <CloseButton onClick={() => handleCloseButtonClick()} />
      </div>
      <ChooseLocationFromPincode
        isLocationChangeOn={isLocationChangeOn}
        handleVerifyPincode={handleVerifyPincode}
        onClose={onClose}
        error={error}
        isLoading={loading}
        pincodeValue={pincodeValue}
        setPincodeValue={setPincodeValue}
      />
      <PickCityFromIcon
        data={cityData}
        handleCitySelection={handleCitySelection}
        onClose={onClose}
      />
    </div>
  );
};

export default ChooseLocation;
