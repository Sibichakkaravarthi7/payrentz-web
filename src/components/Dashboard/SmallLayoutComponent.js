"use client";

import React, { useEffect, useState, createContext } from "react";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar/DashboardSidebar";
import {
  AccessoryIcon,
  HomeIcon,
  SubscriptionIcon,
  WalletIcon,
  UserProfileIcon,
  TicketIcon,
} from "@/Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MobDashboardNavbar from "@/components/Dashboard/DashboardNavbar/MobDashboardNav";
import useAppStore from "@/Store/Store";
import { GET_REFRESH_API, LOGOUT_URL, PATCH_USER_DATA } from "@/api/urls/urls";
import { useMutation, useQuery } from "react-query";
import makePostRequest from "@/utils/makePostRequest";
import toast from "react-hot-toast";
import makeGetRequest from "@/utils/makeGetRequest";
import { clearUserCookies } from "@/utils/Constants";
import AppToast from "@/components/Toast/AppToast";
import dynamic from "next/dynamic";

export const DashboardContext = createContext();

const DynamicWhatsappChatWidget = dynamic(
  () => import("@/components/whatsappChatWidget/WhatsappChatWidget"),
  {
    ssr: false,
  }
);

const SmallLayoutComponent = ({ children }) => {
  const currentPath = usePathname();
  const router = useRouter();
  const [active, setActive] = useState("");
  const { setUserDataAndToken, setLocation } = useAppStore();
  const searchParams = useSearchParams();
  const keyParam = searchParams.get("key");

  const {
    isLoading: refreshIsLoading,
    data: refreshData,
    refetch: refetchUserDashboard,
  } = useQuery([GET_REFRESH_API], () => makeGetRequest(GET_REFRESH_API), {
    onSuccess: (res) => {
      // console.log("ress", res);
      setUserDataAndToken({
        user_data: res?.data,
        token: res?.data?.token,
        kyc_step_completed: res?.data?.kyc_step_completed,
      });
      setLocation({
        pincode: res?.data?.pincode,
        city: res?.data?.city,
      });
    },
    onError: (err) => {
      const errStatus = err?.response?.status;
      if ([403]?.includes(errStatus)) {
        // clearUserCookies();
        if (keyParam) {
          router.push("/?redirectsto=yes");
        } else {
          router.push("/");
        }
        // window.location.reload();
      }
    },
    retry: 0,
  });

  const dashboardData = [
    {
      icon: HomeIcon,
      title: "Dashboard",
      type: "dashboard",
    },
    {
      icon: SubscriptionIcon,
      title: "My subscriptions",
      type: "subscriptions",
    },
    {
      icon: WalletIcon,
      title: "Invoices",
      type: "invoices",
    },
    {
      icon: TicketIcon,
      title: "Support",
      type: "support",
    },
    {
      icon: UserProfileIcon,
      title: "User Profile",
      type: "user-profile",
    },
    {
      icon: AccessoryIcon,
      title: "Buy Accessories",
      type: "accessories",
    },
  ];

  const handleMenuClick = (type) => {
    if (type === "dashboard") {
      router.push("/dashboard");
    }
    if (type === "subscriptions") {
      router.push("/dashboard/subscriptions");
    }
    if (type === "invoices") {
      router.push("/dashboard/invoices");
    }
    if (type === "support") {
      router.push("/dashboard/support/");
    }
    if (type === "user-profile") {
      router.push("/dashboard/user-profile");
    }
    if (type === "accessories") {
      router.push("/dashboard/accessories");
    }
  };

  useEffect(() => {
    // console.log(currentPath);

    const pathParts = currentPath.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    const subFolderPart = pathParts[pathParts.length - 2];
    const innerFolderPart = pathParts[pathParts.lengt - 3];

    // console.log(lastPart);
    if (pathParts.length > 4) {
      const activeType =
        dashboardData.find((item) => innerFolderPart === item?.type)?.type ||
        "";
    } else if (pathParts.length > 3) {
      const activeType =
        dashboardData.find((item) => subFolderPart === item?.type)?.type || "";
      setActive(activeType);
    } else {
      const activeType =
        dashboardData.find((item) => lastPart === item?.type)?.type || "";
      setActive(activeType);
    }
  }, [router.pathname, dashboardData]);

  const { isLoading, mutate } = useMutation(
    (body) => makePostRequest(LOGOUT_URL, body),
    {
      onSuccess: (res) => {
        clearUserCookies();
        router.push("/");
        setTimeout(() => window.location.reload(), 100);
      },
      onError: (error) => {
        toast.error("Something went wrong!");
      },
    }
  );

  const contextValue = {
    reupload_pending: refreshData?.data?.reupload_pending,
    mutate,
    isLoading,
    kyc_step_completed: refreshData?.data?.kyc_step_completed,
    refetchUserDashboard,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <AppToast />
      <div className="flex bg-[#EDEDED]">
        <DynamicWhatsappChatWidget />
        <DashboardSidebar
          dashboardData={dashboardData}
          onMenuClick={handleMenuClick}
          active={active}
          reupload_pending={refreshData?.data?.reupload_pending}
        />
        <div className="flex flex-col md:pl-[339px] mb-[155px] min-h-screen w-full">
          {/* <MobDashboardNavbar /> */}
          <MobDashboardNavbar
            dashboardData={dashboardData}
            onMenuClick={handleMenuClick}
            active={active}
          />
          <DashboardNavbar />
          <div className="px-[15px] pt-[10px] md:pt-0">{children}</div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default SmallLayoutComponent;
