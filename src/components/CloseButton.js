import React from "react";
import AppImage from "./Image/AppImage";

const CloseButton = ({ className, onClick, height = "14", width = "14" }) => {
  return (
    <div
      onClick={() => onClick()}
      className={`p-[12px] hover:bg-[#e1e1e16b] cursor-pointer rounded-[8px] ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292894 13.7071C-0.0976312 13.3166 -0.0976312 12.6834 0.292894 12.2929L5.58579 7L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683417 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893Z"
          fill="#858585"
        />
      </svg>
    </div>
  );
};

export default CloseButton;
