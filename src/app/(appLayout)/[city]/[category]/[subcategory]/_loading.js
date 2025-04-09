import { skeletonColor } from "@/utils/Constants";
import React from "react";
import { RectShape } from "react-placeholder/lib/placeholders";

const loading = () => {
  return (
    <div>
      loading.....
      <div className="grid grid-cols-2 w-full">
        {[1, 2, 3, 4]?.map((m) => (
          <RectShape
            key={m}
            color={skeletonColor}
            className="rounded-[10px] h-[600px] w-[600px] "
            showLoadingAnimation={true}
            style={{ heigh: "600px", width: "100%" }}
          />
        ))}
      </div>
    </div>
  );
};

export default loading;
