"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import Text from "./Text/Text";
import AppImage from "./Image/AppImage";
import { ProfileIcon } from "@/Icons";
import AppButton from "./Button/AppButton";
import { NavContext } from "./Layout/NavbarContainer";
import useAppStore from "@/Store/Store";
import AppLink from "./Link/AppLink";
import { useMutation } from "react-query";
import makePostRequest from "@/utils/makePostRequest";
import { LOGOUT_URL } from "@/api/urls/urls";
import { clearUserCookies } from "@/utils/Constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserLoginAvatarHandler = ({ isLead }) => {
  const { onOpenLoginModal } = useContext(NavContext);
  const { user_data } = useAppStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { mutate } = useMutation((body) => makePostRequest(LOGOUT_URL, body), {
    onSuccess: () => {
      clearUserCookies();
      router.push("/");
      setTimeout(() => window.location.reload(), 100);
    },
    onError: (error) => {
      toast.error("Something went wrong!");
    },
  });
  const handleLogout = () => {
    mutate();
    setMenuOpen(false);
  };

  // Close the menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleProfile = () => {
    if (isLead) {
      setMenuOpen((prev) => !prev);
    } else {
      router.push("/dashboard");
    }
  };
  const trimmedName =
    user_data?.first_name?.length > 8
      ? user_data?.first_name?.substring(0, 8) + "..."
      : user_data?.first_name;

  return (
    <div className="relative" ref={menuRef}>
      {user_data ? (
        <div
          className="bg-appRed w-fit px-[15px] py-[6px] rounded-[20px] flex gap-[10px] items-center cursor-pointer"
          onClick={handleProfile}
        >
          <AppImage src={ProfileIcon} />
          <Text className={"text-sm font-bold text-white"}>{trimmedName}</Text>
        </div>
      ) : (
        <AppButton
          text={"Login"}
          variant={"red"}
          onClick={() => onOpenLoginModal()}
          className="!text-[15px] font-bold !py-[10px] md:!py-[4px] !px-[20px]"
        />
      )}

      {/* Dropdown Menu */}
      {menuOpen && user_data && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <div
            onClick={handleLogout}
            className="px-2 py-2 text-center hover:bg-gray-50 rounded-[5px] text-sm cursor-pointer"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLoginAvatarHandler;
