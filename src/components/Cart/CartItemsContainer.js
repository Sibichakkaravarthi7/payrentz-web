import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import toast from "react-hot-toast";
import { GET_CART_ITEMS_URL } from "@/api/urls/urls";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import useModal from "@/utils/hooks/useModal";
import AppModal from "../Modal/AppModal";
import ConformRemovefromCartModal from "../Modal/ConformRemovefromCartModal";
import CartItemSkeleton from "../SkeletonLoader/CartItemSkeleton";
import CartItemSkeletonListing from "../SkeletonLoader/CartItemSkeletonListing";
import AppImage from "../Image/AppImage";
import EmptyCartHandler from "./EmptyCartHandler";
import { CartContext } from "@/app/(appLayout)/[city]/cart/page";

const CartItemsContainer = () => {
  const { onClose, onOpen, isOpen } = useModal();
  const [varToDelete, setVarToDelete] = useState(null);
  const { cartData, cartIsLoading, refetchCart } = useContext(CartContext);

  const handleDeleteClick = (obj) => {
    setVarToDelete(obj);
    onOpen();
  };

  return (
    <div>
      <div className="flex flex-col ps-[0px] md:ps-[30px] pt-[20px] md:pt-[20px]">
        {!cartIsLoading ? (
          <>
            {cartData?.data?.length > 0 ? (
              <>
                {cartData?.data?.map((item, ind) => (
                  <CartItem
                    handleDeleteClick={handleDeleteClick}
                    key={item?.order?.id}
                    cartItem={item}
                    showBorder={
                      cartData?.data?.length !== 1 &&
                      ind !== cartData?.data?.length - 1
                    }
                    refetch={refetchCart}
                  />
                ))}
              </>
            ) : (
              <EmptyCartHandler />
            )}
          </>
        ) : (
          <CartItemSkeletonListing />
        )}
      </div>

      <AppModal
        bodyClassName="py-[20px] md:py-[28px] border border-appRed rounded-[5px]"
        closeButton
        className="remove-cart-modal"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ConformRemovefromCartModal
          refetchCart={refetchCart}
          selectedVariant={varToDelete}
          onClose={onClose}
        />
      </AppModal>
    </div>
  );
};

export default CartItemsContainer;
