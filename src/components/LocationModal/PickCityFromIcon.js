import React from "react";
import Text from "../Text/Text";
import { useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import { GET_CITY_WITH_PINCODE } from "@/api/urls/urls";
import AppImage from "../Image/AppImage";
import { Bangalore, ChennaiIcon, CoimbatoreIcon } from "@/Icons";
import { useRouter } from "next/navigation";
import useAppStore from "@/Store/Store";
import { usePathname } from "next/navigation";

const PickCityFromIcon = ({ onClose, data, handleCitySelection }) => {
  const router = useRouter();
  const { setLocation } = useAppStore();
  const pathname = usePathname();
  const handleClick = (obj) => {
    handleCitySelection({ city: obj?.identity, pincode: obj?.pincode_detail });

    const city = obj?.identity.toLowerCase();

    const pathSegments = pathname?.split("/").filter(Boolean); // Split and remove empty values

    if (pathname !== "/sitemap" && pathSegments.length > 0) {
      pathSegments[0] = city;
      router.push(`/${pathSegments.join("/")}`);
    }
    setLocation({
      city: obj?.identity,
      pincode: obj?.pincode_detail,
    });
  };

  // const cityList = [
  //   {
  //     icon: "",
  //     link: "",
  //     onCLick: () => undefined,
  //     title: "Chennai",
  //   },
  //   {
  //     icon: "",
  //     link: "",
  //     onCLick: () => undefined,
  //     title: "Coimbatore",
  //   },

  //   {
  //     icon: "",
  //     link: "",
  //     onCLick: () => undefined,
  //     title: "Bangalore",
  //   },
  // ];

  const newFields = [ChennaiIcon, CoimbatoreIcon];

  const newArr = data?.data?.results?.map((item, index) => {
    return { ...item, icon: newFields[index] };
  });

  return (
    <div>
      <Text className={"text-[12px] md:text-[18px] font-[600] mt-[10px]"}>
        Pick City
      </Text>
      <div className="grid grid-cols-5 md:grid-cols-4 gap-[20px] md:gap-[40px] gap-y-[18px] md:gap-y-[18px] mt-[10px] md:mt-[20px] justify-start">
        {newArr?.map((city) => (
          <div
            onClick={() => handleClick(city)}
            className="flex flex-col gap-[8px] md:gap-[11px] cursor-pointer loc-icon items-center"
            key={city?.identity}
          >
            <div className="rounded-[100%] border flex items-center justify-center h-[40px] md:h-[80px] w-[40px] md:w-[80px]">
              <AppImage
                height={60}
                width={60}
                className="rounded-[100%] h-[40px] md:h-[60px] w-[40px] md:w-[60px]"
                src={city?.icon}
                loading="lazy"
              />
            </div>
            <Text
              className={"text-center text-[8px] md:text-[14px] font-[600]"}
            >
              {city?.identity}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickCityFromIcon;
