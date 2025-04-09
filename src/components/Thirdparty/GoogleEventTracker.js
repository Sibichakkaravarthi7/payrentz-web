"use client";
function GoogleEventTracker(event, data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer?.push({
    event: event,
    ...data,
  });
}

const trackViewItemEvent = (variantDetail) => {
  const datas = {
    ecommerce: {
      items: [
        {
          item_name: variantDetail?.identity, // Name or ID of the product
          item_id: variantDetail?.id, // SKU or unique ID of the product
          price: Math.round(variantDetail?.rent_12), // Product price
          item_brand: "", // Product brand (if available)
          item_category: variantDetail?.category_detail?.identity, // Product category (if available)
          item_variant: "", // Product variant (e.g., color, size)
          item_list_name: variantDetail?.sub_category_detail?.identity, // List name or category where the item was displayed
          index: 1, // Position of the item in the list
        },
      ],
    },
  };
  GoogleEventTracker("view_item", datas);
};

const trackAddToCartEvent = (
  totalValue,
  selectedDepositAmount,
  productData
) => {
  const datas = {
    ecommerce: {
      currency: "INR", // Currency code (e.g., USD, EUR)
      value: Math.round(totalValue), // Total value of items added to the cart
      items: [
        {
          item_name: productData?.identity, // Name or ID of the product
          item_id: productData?.id, // SKU or unique ID of the product
          price: Math.round(selectedDepositAmount), // Product price
          item_brand: "", // Product brand (if available)
          item_category: productData?.category_detail?.identity, // Product category (if available)
          item_variant: "", // Product variant (e.g., color, size)
          quantity: 1, // Quantity added to the cart
        },
      ],
    },
  };
  GoogleEventTracker("add_to_cart", datas);
};

const trackPurchaseEvent = (cartData, transInfo) => {
  const transProducts = cartData?.map((item) => ({
    name: item?.identity ?? "",
    id: item?.id ?? "",
    price: Math.round(item?.rent) ?? "",
    quantity: item?.quantity ?? "",
  }));
  const datas = {
    transactionId: transInfo?.payload?.razorpay_payment_id ?? null, // Unique ID for the transaction order_OiNSUb0GJ1ZKmV
    transactionTotal: Math.round(transInfo?.amount), // Total value of the transaction
    currency: transInfo?.currency, // Currency code
    transactionProducts: transProducts,
  };
  GoogleEventTracker("purchase", datas);
};

const trackViewItemList = (listData, category_name) => {
  const items = listData?.map((item) => ({
    item_name: item?.identity,
    item_id: item?.id,
    price: Math.round(item?.rent_12),
    category: item?.category_detail?.identity,
  }));
  const datas = {
    item_list_name: category_name,
    items: items,
  };
  GoogleEventTracker("view_item_list", datas);
};

const trackSelectItem = (item, category_name) => {
  const items = [
    {
      item_name: item?.identity,
      item_id: item?.id,
      price: Math.round(item?.rent_12),
      category: item?.category_detail?.identity,
    },
  ];
  const data = {
    item_list_name: category_name,
    items: items,
  };
  GoogleEventTracker("select_item", data);
};

const trackBeginCheckoutEvent = (cartItems, accessoryItems) => {
  const cartDatas = cartItems?.map((item) => ({
    name: item?.identity ?? "",
    id: item?.id ?? "",
    price: Math.round(item?.rent) ?? "",
    quantity: item?.quantity ?? "",
  }));
  const accessoryDatas = accessoryItems
    ?.filter((item) => item?.is_in_cart)
    ?.map((item) => ({
      name: item?.identity ?? "",
      id: item?.id ?? "",
      price: Math.round(item?.price_with_gst) ?? "",
      quantity: item?.quantity ?? "",
    }));
  const datas = {
    items: [...(cartDatas || []), ...(accessoryDatas || [])],
  };
  GoogleEventTracker("begin_checkout", datas);
};

const trackAddPaymentInfo = (cartItems, accessoryItems) => {
  const cartDatas = cartItems?.map((item) => ({
    name: item?.identity ?? "",
    id: item?.id ?? "",
    price: Math.round(item?.rent) ?? "",
    quantity: item?.quantity ?? "",
  }));
  const accessoryDatas = accessoryItems
    ?.filter((item) => item?.is_in_cart)
    ?.map((item) => ({
      name: item?.identity ?? "",
      id: item?.id ?? "",
      price: Math.round(item?.price_with_gst) ?? "",
      quantity: item?.quantity ?? "",
    }));
  const datas = {
    payment_type: "",
    items: [...(cartDatas || []), ...(accessoryDatas || [])],
  };
  GoogleEventTracker("add_payment_info", datas);
};

const trackAddShippingInfo = (cartItems, accessoryItems) => {
  const cartDatas = cartItems?.map((item) => ({
    name: item?.identity ?? "",
    id: item?.id ?? "",
    price: Math.round(item?.rent) ?? "",
    quantity: item?.quantity ?? "",
  }));
  const accessoryDatas = accessoryItems
    ?.filter((item) => item?.is_in_cart)
    ?.map((item) => ({
      name: item?.identity ?? "",
      id: item?.id ?? "",
      price: Math.round(item?.price_with_gst) ?? "",
      quantity: item?.quantity ?? "",
    }));
  const datas = {
    shipping_method: "",
    items: [...(cartDatas || []), ...(accessoryDatas || [])],
  };
  GoogleEventTracker("add_shipping_info", datas);
};

const trackRemoveFromCart = (removedProduct) => {
  const datas = {
    items: {
      item_name: removedProduct?.identity,
      item_id: removedProduct?.id,
      price: Math.round(removedProduct?.rent_12),
      quantity: removedProduct?.quantity,
    },
  };
  GoogleEventTracker("remove_from_cart", datas);
};

export {
  trackViewItemEvent,
  trackAddToCartEvent,
  trackPurchaseEvent,
  trackViewItemList,
  trackSelectItem,
  trackBeginCheckoutEvent,
  trackAddPaymentInfo,
  trackAddShippingInfo,
  trackRemoveFromCart,
};
