"use client";
import React, { createContext, useEffect, useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import useModal from "@/utils/hooks/useModal";
import AppModal from "../Modal/AppModal";
import LoginModal from "../Modal/LoginModal";
import { useRouter, useSearchParams } from "next/navigation";
import LocationModal from "../Modal/LocationModal";
import { clearUserCookies } from "@/utils/Constants";
import useAppStore from "@/Store/Store";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { GET_CART_COUNT, GET_REFRESH_API } from "@/api/urls/urls";
import makeGetRequest from "@/utils/makeGetRequest";
import makePostRequest from "@/utils/makePostRequest";

export const NavContext = createContext();

const NavbarContainer = ({ categories, navigationData, cityData }) => {
  const {
    city,
    pincode,
    setLocation,
    setUserDataAndToken,
    setLoginModalOpener,
    setLocationModalOpener,
    isLocationChangeOn,
  } = useAppStore();

  const {
    isOpen: IsOpenLoginModal,
    onClose: onCloseLoginModal,
    onOpen: onOpenLoginModal,
  } = useModal();

  const {
    isOpen: isOpenLocation,
    onClose: onCloseLocation,
    onOpen: onOpenLocation,
  } = useModal();

  const searchParams = useSearchParams();
  const redirectPhone = searchParams.get("phone");
  const redirectPage = searchParams.get("redirect");
  const redirectsto = searchParams.get("redirectsto");

  useEffect(() => {
    setLocationModalOpener({
      fn: onOpenLocation,
    });
    setLoginModalOpener({
      fn: onOpenLoginModal,
    });

    // console.log("urlParams", redirectPhone, redirectPage);
  }, []);

  const [valueFromContext, setValueFromContext] = useState({});
  const router = useRouter();
  const userToken = getCookie("user_token");
  const guest_user_id = getCookie("guest_user_id");

  const { data: cartCountData, refetch } = useQuery(
    [GET_CART_COUNT],
    () => {
      const guest_user_id = getCookie("guest_user_id");
      return makePostRequest(GET_CART_COUNT, {
        guest_uuid: guest_user_id,
      });
    },
    {
      onSuccess: (res) => {
        console.log("cart count", res);
      },
      onError: (err) => {},
      enabled: getCookie("guest_user_id") || userToken ? true : false,
    }
  );

  const { data: refreshData, isLoading: refreshIsLoading } = useQuery(
    [GET_REFRESH_API],
    () => makeGetRequest(GET_REFRESH_API),
    {
      onSuccess: (res) => {
        refetch();
        setUserDataAndToken({
          user_data: res?.data,
          token: res?.data?.token,
          kyc_step_completed: res?.data?.kyc_step_completed,
        });
        // console.log("dddddd", {
        //   pincode: res?.data?.pincode,
        //   city: res?.data?.city,
        // });
        setLocation({
          pincode: res?.data?.pincode,
          city: res?.data?.city,
        });
        // setLocationModalOpener({
        //   fn: onOpenLocation,
        // });
      },
      onError: (err) => {
        console.log("NAV REFRESH API FAILED", err);
        const errStatus = err?.response?.status;
        if ([403]?.includes(errStatus)) {
          clearUserCookies();
          router.push("/");
          window.location.reload();
        }
      },
      retry: 0,
      enabled: userToken ? true : false,
    }
  );

  const handleIsNewUser = () => {
    const userToken = getCookie("user_token");
    const userLoc = getCookie("user_loc");
    const guestUserId = getCookie("guest_user_id");

    if (isNewUserLoggedViaRedirectLink()) {
      if (guestUserId) {
        // While in url redirection, if the user already has a guest id, we can procceed with login directly
        onOpenLoginModal();
        return;
      } else {
        // This flow could be changed if we want to skip the 'get pincode'
        //  by getting the pincode directly in the redirect url (so we can generate a new guest uuid for login)
        onOpenLocation();
        return;
      }
    }

    if (userToken) {
      // setUserDataAndToken({
      //   user_data: JSON.parse(userData),
      //   token: userToken,
      // });
      // fetchUserData(userToken, "registeredUser")
      return;
    }
    if (guestUserId) {
      setLocation(JSON.parse(userLoc));
      setLoginModalOpener({
        fn: onOpenLoginModal,
      });
      // fetchUserData(userToken, "registeredUser")
      return;
    }

    // Location Modal will open for new user
    onOpenLocation();
  };

  // console.log("redirectsto", redirectsto ? true : false);
  useEffect(() => {
    if (redirectsto) {
      // console.log(redirectsto);
      if (guest_user_id) {
        onOpenLoginModal();
      } else {
        onOpenLocation();
      }
    } else handleIsNewUser();
  }, []);

  const contextValue = {
    valueFromContext,
    setValueFromContext,
    IsOpenLoginModal,
    onCloseLoginModal,
    onOpenLoginModal,
    city,
    pincode,
    categories,
  };

  const isNewUserLoggedViaRedirectLink = () => {
    if (redirectPhone && redirectPage) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <NavContext.Provider value={contextValue}>
      <DesktopNavbar
        refreshData={refreshData}
        cartCount={cartCountData?.data?.count}
      />
      <MobileNavbar
        cartCount={cartCountData?.data?.count}
        refreshData={refreshData}
      />
      <AppModal
        className="login-modal p-[20px] pt-[50%] md:pt-[0px]"
        bodyClassName="py-[35px] px-[20px] md:py-[44px] md:px-[82px]"
        isOpen={IsOpenLoginModal}
        onClose={onCloseLoginModal}
        closeButton
        aria-labelledby="login-modal-title"
      >
        <LoginModal onClose={onCloseLoginModal} />
      </AppModal>
      <AppModal
        className="location-modal p-[20px]  pt-[50%] md:pt-[0px]"
        bodyClassName="py-[25px] px-[15px] md:py-[63px] md:px-[60px]"
        isOpen={isOpenLocation}
        onClose={onCloseLocation}
        dismissible={isLocationChangeOn ? true : false}
        aria-labelledby="location-modal-title"
      >
        <LocationModal cityData={cityData} onClose={onCloseLocation} />
      </AppModal>
    </NavContext.Provider>
  );
};

export default NavbarContainer;
