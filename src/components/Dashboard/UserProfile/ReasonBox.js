import Text from '@/components/Text/Text'
import React from 'react'

function ReasonBox({reason}) {
  return (
    <div className="flex items-start justify-start">
      <div className="flex gap-[10px] items-center border border-[#ed1f28] rounded-[5px] p-[8px] bg-[#ff000033]">
        <Text className={"text-[#858585]"}>Reason :</Text>
        <Text
          className={"font-semibold text-[#ed1f28]"}
        >
          {reason}
        </Text>
      </div>
    </div>
  )
}

export default ReasonBox