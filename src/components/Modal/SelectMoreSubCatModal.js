import React, { useEffect, useState } from "react";
import Text from "../Text/Text";
import AppImage from "../Image/AppImage";
import { Refrigerators } from "@/Icons";
import AppButton from "../Button/AppButton";
import { usePathname, useRouter } from "next/navigation";
import { SET_SUB_CATEGORY_PATH } from "@/utils/Constants";

const SelectMoreSubCatModal = ({
  list,
  handleCheck,
  selectedVariants,
  ticked,
  setSelectedVariants,
  onClose,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // console.log("selectedVariant", selectedVariants, modalSel);

  const cityPathname = pathname?.split("/").filter(Boolean)[0] || "";
  const catPathname = pathname?.split("/").filter(Boolean)[1] || "";
  const subCatPathname = pathname?.split("/").filter(Boolean)[2] || "";
  const [modalSel, setModalSel] = useState(subCatPathname);
  const isAllSelected = modalSel?.length == 0;
  const handleCheckModal = (data) => {
    const selectedIdentity = data?.identity?.toLowerCase().replace(/\s+/g, "-");

    // If already selected, reset to pathname value; otherwise, select new
    setModalSel((prev) =>
      prev === selectedIdentity
        ? subCatPathname.replace("-on-rent", "")
        : selectedIdentity
    );
  };

  const applyFilter = () => {
    router.push(SET_SUB_CATEGORY_PATH(cityPathname, catPathname, modalSel));

    onClose();
  };

  const handleResetToDefaults = () => {
    setModalSel([]);
    setSelectedVariants([]);
    onClose();
  };

  // useEffect(() => {
  //   updateParamsfromModal(modalSel);
  // }, [selectedVariants]);

  return (
    <div className="w-full">
      <Text className={"text-[20px] font-bold pb-[40px]"}>
        Select product(s)
      </Text>
      <div className="flex flex-wrap justify-center md:justify-start gap-[30px] py-[20px] pb-[30px] border-b border-[#DBDBDB]">
        {list?.map((m) => (
          <div
            className="flex flex-col items-center cursor-pointer"
            key={m?.identity}
            onClick={() => handleCheckModal(m)}
          >
            <div className="rounded-[100%] h-[52px] w-[52px] relative">
              <AppImage
                layout="fill"
                className="rounded-[100%] h-[52px] w-[52px] object-cover"
                src={m?.image_detail?.file || Refrigerators}
                loading="lazy"
              />
              {modalSel.replace("-on-rent", "") ===
              m.identity?.toLowerCase().replace(/\s+/g, "-")
                ? ticked
                : null}
            </div>
            <Text
              className={`mt-[10px] md:mt-[16px] text-[12px] md:text-[14px] ${
                modalSel.replace("-on-rent", "") ==
                m.identity?.toLowerCase().replace(/\s+/g, "-")
                  ? "font-bold text-appRed"
                  : "font-semibold"
              }`}
            >
              {m?.identity}
            </Text>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center pt-[50px]">
        {/* <Text
          onClick={() => handleResetToDefaults()}
          className={
            "font-bold text-[14px] md:text-[20px] cursor-pointer underline"
          }
        >
          Reset to defaults
        </Text> */}
        <AppButton
          onClick={() => applyFilter()}
          text={"Submit"}
          variant={"red"}
        />
      </div>
    </div>
  );
};

export default SelectMoreSubCatModal;
