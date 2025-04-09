import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import { Refrigerators, TickIcon } from "@/Icons";
import AppModal from "../Modal/AppModal";
import useModal from "@/utils/hooks/useModal";
import SelectMoreSubCatModal from "../Modal/SelectMoreSubCatModal";
import { usePathname } from "next/navigation";
import { SET_SUB_CATEGORY_PATH } from "@/utils/Constants";
import { useRouter } from "next/navigation";

const SmallSubCatTopListing = ({
  list = [],
  selectedVariants = [],
  setSelectedVariants,
  updateParams,
}) => {
  const { onClose, onOpen, isOpen } = useModal();
  const isAllSelected = selectedVariants?.length == 0;
  const ticked = (
    <div className="bounce bg-[#ED1F2866] rounded-[100%]  h-[46px] w-[46px] md:h-[52px] md:w-[52px]  top-0 bottom-0 left-0 w-full absolute flex justify-center items-center">
      <AppImage src={TickIcon} loading="lazy" />
    </div>
  );
  const pathname = usePathname();
  const cityPathname = pathname?.split("/").filter(Boolean)[0] || "";
  const catPathname = pathname?.split("/").filter(Boolean)[1] || "";
  const subCatPathname = pathname?.split("/").filter(Boolean)[2] || "";
  const router = useRouter();

  const handleCheck = (data) => {
    const modifiedIdentity = data?.identity?.toLowerCase().replace(/\s+/g, "-")
      ? `${data?.identity?.toLowerCase().replace(/\s+/g, "-")}-on-rent`
      : "";
    router.push(
      SET_SUB_CATEGORY_PATH(cityPathname, catPathname, modifiedIdentity)
    );
  };

  return (
    <div className="flex gap-[20px] md:gap-[30px] py-[20px] w-full overflow-scroll small-sub-cat-top-listing">
      {/* All Option */}
      {/* <div
        // onClick={() => handleSelectAll()}
        className="flex flex-col items-center"
      >
        <div className="rounded-[100%] h-[46px] w-[46px] md:h-[52px] md:w-[52px] relative cursor-pointer">
          <AppImage
            className="rounded-[100%]  h-[46px] w-[46px] md:h-[52px] md:w-[52px]"
            src={Refrigerators}
            loading="lazy"
          />
          {isAllSelected ? ticked : null}
        </div>
        <Text
          className={`mt-[10px] md:mt-[16px] text-[12px] md:text-[14px] ${
            isAllSelected ? "font-bold text-appRed" : "font-semibold"
          }`}
        >
          {"All"}
        </Text>
      </div> */}

      {/* List options */}
      {list?.slice(0, 7)?.map((m) => (
        <div
          className="flex flex-col items-center cursor-pointer"
          key={m?.identity}
          onClick={() => handleCheck(m)}
        >
          <div className="rounded-[100%]  h-[46px] w-[46px] md:h-[52px] md:w-[52px] relative">
            <AppImage
              layout="fill"
              className="rounded-[100%] h-[52px] w-[52px] object-cover"
              src={m?.image_detail?.file || Refrigerators}
              loading="lazy"
            />
            {subCatPathname.replace("-on-rent", "") ==
            m?.identity?.toLowerCase().replace(/\s+/g, "-")
              ? ticked
              : null}
          </div>
          <Text
            className={`mt-[10px] md:mt-[16px] text-[12px] md:text-[14px] ${
              subCatPathname.replace("-on-rent", "") ==
              m?.identity?.toLowerCase().replace(/\s+/g, "-")
                ? "font-bold text-appRed"
                : "font-semibold"
            }`}
          >
            {m?.identity}
          </Text>
        </div>
      ))}

      {/* if sub cat is more than 5  */}
      {list?.length > 7 ? (
        <div
          onClick={() => onOpen()}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="rounded-[100%] h-[52px] w-[52px] relative">
            <AppImage
              layout="fill"
              className="rounded-[100%] h-[52px] w-[52px] object-cover"
              src={list?.[6]?.image_detail?.file || Refrigerators}
              loading="lazy"
            />

            <div className="bg-[#00000066] rounded-[100%] h-[52px] w-[52px] top-0 bottom-0 left-0 w-full absolute flex justify-center items-center">
              <Text className={"text-white font-bold text-[24px]"}>
                {`+${[...list]?.splice(7)?.length}`}
              </Text>
            </div>
          </div>
          <Text
            className={`mt-[10px] md:mt-[16px] text-[12px] md:text-[14px] ${
              false ? "font-bold text-appRed" : "font-semibold"
            }`}
          >
            See All
          </Text>
        </div>
      ) : null}

      <AppModal
        className="sub-cat-modal"
        maxWidth="1320px"
        isOpen={isOpen}
        onClose={onClose}
      >
        <SelectMoreSubCatModal
          list={list}
          selectedVariants={selectedVariants}
          onClose={onClose}
          ticked={ticked}
          // isAllSelected={isAllSelected}
          setSelectedVariants={setSelectedVariants}
        />
      </AppModal>
    </div>
  );
};

export default SmallSubCatTopListing;
