import { OfferTagIcon } from '@/Icons'
import AppImage from '@/components/Image/AppImage'
import Text from '@/components/Text/Text'
import React from 'react'

function DashboardOffers() {
  return (

      <div className="bg-[#FFFFFF] shadow-md rounded-[10px] pt-[25px]">
          <div className="">
            <Text className={"text-[#1D1D1D] pl-[25px] font-bold"}>
              Notices & Offers (0)
            </Text>
          </div>
          <div className="flex flex-col h-full items-center justify-center pb-[25px]">
            <AppImage src={OfferTagIcon} alt="offer-tag-icon" />
            <Text
              className={"text-[#858585] px-[20px] mt-[20px] text-[14px] font-medium"}
            >
              No new notices or offers announced. If any you will be notified
            </Text>
          </div>
        </div>
  )
}

export default DashboardOffers
