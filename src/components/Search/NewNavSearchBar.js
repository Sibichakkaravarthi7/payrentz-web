"use client";
import React, { useState } from "react";
import Select, { components } from "react-select";
import AppImage from "../Image/AppImage";
import SearchIcon from "../../../public/icons/search.svg";
import { useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import { GET_SEARCH_META } from "@/api/urls/urls";
import { useDebounce } from "use-debounce";
import { SearchBarIcon, TrendingIcon } from "@/Icons";
import { useRouter } from "next/navigation";

const NewNavSearchBar = () => {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");

  const [search] = useDebounce(searchVal, 200);

  const { data, isLoading, refetch } = useQuery(
    [GET_SEARCH_META, search],
    () =>
      makeGetRequest(GET_SEARCH_META, {
        search: search,
      }),
    {
      onSuccess: (res) => {},
      onError: (err) => {
        console.log(err);
      },
      enabled: search !== "",
    }
  );

  const makeLink = (obj) => {
    if (obj?.type == "category") return `/${obj?.slug}`;
    if (obj?.type == "subcategory")
      return `/${obj?.category_detail?.slug}?sub_category=${obj?.id}`;
    if (obj?.type == "variant")
      return `/${obj?.category_detail?.slug}/${obj?.slug}/`;
  };

  const getType = (val) => {
    if (val == "subcategory") return "Sub Category";
    if (val == "variant") return "Product";
    return val;
  };

  const modifyOptionsForSearch = (opt) => {
    return opt?.map((m) => ({
      label: m?.identity,
      value: makeLink(m),
      type: getType(m?.type),
      isTrending: search == "" ? true : false,
    }));
  };

  const handleSearchClick = (val) => {
    // console.log("val?.value", val);
    router.push(val?.value);
  };

  const handleInputChange = (e) => {
    setSearchVal(e);
  };

  const customOptionComp = ({ children, ...props }) => {
    const { isTrending, type } = props?.data;
    return (
      <components.Option {...props}>
        <div className="flex gap-[10px] md:gap-[15px] items-center">
          {isTrending ? (
            <AppImage className="w-[20px]" src={TrendingIcon} loading="lazy" />
          ) : (
            <AppImage className="w-[17px]" src={SearchBarIcon} loading="lazy" />
          )}

          {
            <div>
              <span className="font-bold mr-[5px]">{children}</span>
              <span className="text-[10px] capitalize font-[500]">
                in {type}
              </span>
            </div>
          }
        </div>
      </components.Option>
    );
  };
  return (
    <div className="flex relative w-full w-[100px]  md:w-[100%] xl:w-[372px]  flex-1 border border-[#858585] rounded-[20px] md:rounded-[5px]">
      <Select
        loadingMessage={(e) => <p className="text-[13px]">Searching......</p>}
        classNamePrefix="search"
        options={modifyOptionsForSearch(data?.result)}
        placeholder={"Search"}
        className={`w-full`}
        onChange={(e) => handleSearchClick(e)}
        onInputChange={(e) => handleInputChange(e)}
        isLoading={isLoading}
        noOptionsMessage={(a) => (
          <p className="text-[13px]">{`No results found for ${a?.inputValue}`}</p>
        )}
        menuIsOpen={search !== ""}
        components={{ Option: customOptionComp }}
      />
      <div className="py-[11px] px-[16px] cursor-pointer flex items-center right-[0] absolute top-0 bottom-0">
        <AppImage src={SearchIcon} loading="lazy" />
      </div>
    </div>
  );
};

export default NewNavSearchBar;
