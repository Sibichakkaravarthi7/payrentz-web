import React from 'react'
import Text from '../Text/Text';

function ProductSpecifications({id, specs, details}) {
  return (
      <div key={id} className={`grid grid-cols-3 gap-3 ${id % 2 === 1 ? 'bg-[#F3F7FF]' : ''}  py-[20px]`}>
        <Text className={"font-extrabold md:ml-[30px] sm:ml-[10px] col-span-1"}>{specs}</Text>
        <Text className={"font-medium col-span-2 text-left"}>{details}</Text>
      </div>
  )
}

export default ProductSpecifications;
