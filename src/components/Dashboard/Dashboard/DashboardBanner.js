import { DashboardCarousel } from "@/Icons";
import React, { useContext, useEffect, useState } from "react";
import BannerCarousel from "./BannerCarousel";
import useAppStore from "@/Store/Store";
import { RectShape } from "react-placeholder/lib/placeholders";
import { skeletonColor } from "@/utils/Constants";
import { BeatLoader } from "react-spinners";
import { DashboardContext } from "../SmallLayoutComponent";

function DashboardBanner() {
  const { kyc_step_completed, reupload_pending } = useContext(DashboardContext);

  // console.log("kyc_step_completed", kyc_step_completed);

  const [bannerContents, setBannerContents] = useState([]);

  useEffect(() => {
    if (reupload_pending == true) {
      setBannerContents([
        {
          title: "Document Re-upload Requested!",
          details:
            "Kindly re-upload the requested documents to complete your verification process.",
          button: "Re-Upload",
          buttonAction: "/dashboard/user-profile/",
          image: DashboardCarousel,
          bg: "#F3F7FF",
        },
        // {
        //   title: "Your KYC is pending..",
        //   details:
        //     "Kindly complete your KYC process to facilitate the successful delivery of your product.",
        //   button: "Complete KYC",
        //   buttonAction: "/kyc/1",
        //   image: DashboardCarousel,
        //   bg: "#F3F7FF",
        // },
        {
          title: (
            <>
              Rent <span className="font-[800]">@</span> Ease
            </>
          ),
          details: "Luxury Living at Affordable prices.",
          button: "Rent Now",
          buttonAction: "/",
          image: DashboardCarousel,
          bg: "#F3F7FF",
        },
      ]);
    } else if (parseInt(kyc_step_completed) < 4) {
      setBannerContents([
        {
          title: "Your KYC is pending..",
          details:
            "Kindly complete your KYC process to facilitate the successful delivery of your product.",
          button: "Complete KYC",
          buttonAction: "/kyc/1",
          image: DashboardCarousel,
          bg: "#F3F7FF",
        },
        {
          title: (
            <>
              Rent <span className="font-[800]">@</span> Ease
            </>
          ),
          details: "Luxury Living at Affordable prices.",
          button: "Rent Now",
          buttonAction: "/",
          image: DashboardCarousel,
          bg: "#F3F7FF",
        },
      ]);
      setBannerContents([
        {
          title: "Your KYC is pending..",
          details:
            "Kindly complete your KYC process to facilitate the successful delivery of your product.",
          button: "Complete KYC",
          buttonAction: "/kyc/1",
          image: DashboardCarousel,
          bg: "#F3F7FF",
        },
        {
          title: (
            <>
              Rent <span className="font-[800]">@</span> Ease
            </>
          ),
          details: "Luxury Living at Affordable prices.",
          button: "Rent Now",
          buttonAction: "/",
          image: DashboardCarousel,
          bg: "#F3F7FF",
        },
      ]);
    } else {
      setBannerContents([
        {
          title: (
            <>
              Rent <span className="font-[800]">@</span> Ease
            </>
          ),
          details: "Luxury Living at Affordable prices.",
          button: "Rent Now",
          buttonAction: "/",
          image: DashboardCarousel,
          bg: "#F3F7FF",
        },
      ]);
    }
  }, [kyc_step_completed]);

  return (
    <div className="w-full rounded-[10px] shadow-md mb-[20px] px-[26px] bg-[#F3F7FF] py-[10px]">
      {bannerContents?.length > 0 ? (
        <BannerCarousel banners={bannerContents} />
      ) : (
        <div className="flex justify-center py-[55px]">
          <BeatLoader color="#2b5cab" />
        </div>
      )}
    </div>
  );
}

export default DashboardBanner;
