import React from "react";
import Text from "../Text/Text";
import AppLink from "../Link/AppLink";

const AppBreadcrumb = ({ list }) => {
  const arrow = () => {
    return (
      <svg
        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 text-[14px] md:text-[16px] h-[10px] md:h-[12px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 9 4-4-4-4"
        />
      </svg>
    );
  };
  return (
      <div className="flex items-center py-[20px] pt-[30px] border-b border-[#DBDBDB]">
        {list?.map((m, ind) => (
          <>
            {ind !== 0 ? <div className="mx-[8px] md:mx-[10px]">{arrow()}</div> : null}

            <AppLink
              key={m?.text}
              className={
                "text-[14px] md:text-[16px] font-medium capitalize text-[#858585] hover:text-appBlue"
              }
              link={m?.link}
            >
              {m?.text}
            </AppLink>
          </>
        ))}
      </div>

    // <div>
    //   <nav className="flex" aria-label="Breadcrumb">
    //     <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    //       {list?.map((m) => {
    //         return (
    //           <li key={m?.link} className="inline-flex items-center">
    //             <a
    //               href="#"
    //               className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
    //             >
    //               {arrow()}
    //               <Text>Home</Text>
    //             </a>
    //           </li>
    //         );
    //       })}
    //     </ol>
    //   </nav>
    // </div>
  );
};

export default AppBreadcrumb;
