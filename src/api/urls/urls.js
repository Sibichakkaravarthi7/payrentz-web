// Login APIs
export const LOGIN_URL = "/access/customer/vash-otp/";
export const VALIDATE_OTP_URL = "/access/customer/validate-otp/";
export const GET_NEW_USER_DATA_URL = "/access/customer/details/";
export const LOGOUT_URL = "/access/logout/";

export const GET_OTP = (id) => `/access/customer/send-otp/${id}/`;

//Generate Guest User Token
export const GENERATE_GUEST_USER_TOKEN_URL = "/web/guest/create/";

//User Location
export const PINCODE_VERIFY_URL = "/web/pincode/verify/";

//Navigation Meta
export const NAVIGATION_META_URL = "/web/navigation/";
// sitemap subcategory
export const SITEMAP_SUBCAT_URL = "/web/active-sub-category/list/";
//Variant
export const VARIANT_LIST_URL = "/web/variant/list/";
export const VARIANT_DETAIL_PAGE_URL = (id) => `/web/variant/detail/${id}/`;
export const CHECK_TYPE_PAGE_URL = (id) =>
  `/web/variant-subcategory-type/${id}/`;

//List subcategory based on Category
export const SUBCATEGORY_LIST_BY_CATEGORY_URL = (id) =>
  `/web/navigation/filter/${id}/meta/`;

//Add Variant to Cart
export const MODIFY_VARIANT_TO_CART_URL = `/web/add-to-cart/`;

//Get Cart
export const GET_CART_ITEMS_URL = `/web/cart/list/`;

//Modify Quantity for cart item
export const MODIFY_QUANTITY_FOR_CART_ITEM_URL = (id) =>
  `/web/cart/change-quantity/${id}/`;

//Modify Tenure for cart items
export const MODIFY_TENURE_FOR_CART_ITEM_URL = `/web/cart/change-tenure/`;

//To get basic user data details
export const GET_PATCH_USER_DATA = "/access/get-user-info/";

//To update user data in cart or kyc
export const PATCH_USER_DATA = "/access/settings/user-edit/";

//To create a order id and pass it to the "make payment api" -- HOLD
// export const GET_CREATE_PATCH_ORDER = "/web/payment/create-cart/";

// To get the order id and razorpay key
export const GET_MAKE_PAYMENT = `/web/payment/make-payment/`;

export const POST_VERIFY_PAYMENT = (id) => `/web/payment/verify-payment/${id}/`;

export const POST_VERIFY_BANK = "/web/customer/bank/verify";

export const POST_SEND_PAN_OTP = "/web/customer/credit-score/send-otp";

export const POST_VERIFY_PAN = "/web/customer/credit-score/verify-otp";

export const GET_CREDIT_REPORT = "/web/customer/get-credit-report";

export const POST_SEND_AADHAAR_OTP = "/web/customer/aadhaar/send-otp";

export const POST_VERIFY_AADHAAR_OTP = "/web/customer/aadhaar/verify-otp";

export const UPLOAD_S3 = (key, isDoc) =>
  `/web/${key}/${isDoc ? "document" : "image"}/upload/`;

export const USER_SUBSCRIPTION_DATA = "/web/user/my-subscription/";

export const GET_REFRESH_API = "/access/customer/refresh/";

export const GET_HOME_TOP_DATA = "/web/home-ad-one/";

export const GET_HOME_COMBO_DATA = "/web/home-ad-combo/";

export const GET_HOME_BOTTOM_DATA = "/web/home-ad-two/";
export const GET_PPL_ALSO_RENTED_DATA = "/web/home-ad-three/";
export const GET_RECOMMENDATION = "/web/variant/recommendation/";

export const GET_CART_COUNT = "/web/navigation/cart-count/";

export const GET_USER_TICKETS = "/web/user/my-tickets/";

export const POST_TICKET_CANCEL = (id) => `/web/support-ticket/cancel/${id}/`;

export const GET_USER_RECENT_SUBSCRIPTIONS =
  "/web/user/dashboard-subscription/";

export const GET_USER_RECENT_TICKETS = "/web/user/dashboard-ticket/";

export const GET_USER_RECENT_INVOICES = "/web/user/dashboard-invoice/";

export const GET_USER_INVOICES = "/web/user/my-invoices/";

export const GET_USER_LEDGER = "/web/user/my-ledger/";

export const GET_USER_DEPOSIT = "/web/user/my-ledger/additional-details/";

export const GET_DOWNLOAD_INVOICE = (id) =>
  `/admin/subscription/print-invoice/${id}/`;

export const GET_MAKE_INVOICE_PAYMENT = "/web/payment/invoice/make-payment/";

export const POST_REUPLOAD_DOCUMENT = "/web/user/my-profile/re-upload/";

//
export const GET_CREATE_TICKET_PRODUCT_DATA =
  "/web/support/ticket/create/meta/";

//To get the data while creating ticket from user
export const POST_CREATE_TICKET_DATA = "/web/user/new-tickets/";

//Cart Accessory list
export const GET_CART_ACCESSORY_LIST = "/web/accessory/list/";

export const GET_TICKET_BY_ID = (id) => `/web/support/ticket/detail/${id}/`;

export const POST_TICKET_NOTES = "/web/support-ticket/notes/cud/";

//Added Cart accessories list
export const GET_ADDED_CART_ACCESSORY_LIST = `/web/accessory-bought/list/`;

//Get Cart Summary
export const GET_CART_SUMMARY = `/web/cart/summary/`;

export const POST_OTHER_KYC = "/web/customer/kyc/verify";

export const GET_SEARCH_META = "/web/global-search/";

export const GET_CITY_WITH_PINCODE = "/web/home/city/";

//Get App Notifications
export const GET_APP_NOTIFICATIONS = "/web/notifications/list/";

export const POST_APP_NOTIFICATIONS_STATUS = (id) =>
  `/web/notifications/read/${id}/status/`;

//combo detail page
export const COMBO_PAGE_URL = (id) => `/web/combo/detail/${id}/`;

export const GET_COMBO_LIST_URL = `/web/combo/list/`;

export const GET_ALL_CATEGORY = "/web/home/category/list/";

//variant full list
export const GET_VARIANT_LIST = "/web/variant/list-all/";

export const POST_APP_NOTIFICATIONS_ALL_READ =
  "/web/notifications/all/read/status/";

// To get meta title and description
export const GET_META_TITLE_AND_DESC = (type, slug, city) =>
  `/web/meta-title/?type=${type}&slug=${slug}&city=${city}`;

//variant available check
export const GET_VARIANT_CHECK = "/web/variant/check/";

export const GET_ALL_VARIANTS_FOR_SEO = "/web/variants-all/";

//Blog
export const GET_BLOG_LIST = "/web/blog/list/";
export const GET_BLOG_BY_ID = (id) => `/web/blog/detail/${id}/`;

//Coupon
export const POST_APPLY_COUPON = (id) => `/web/cart/apply-coupon/${id}/`;

// Google ReCaptcha
export const VERIFY_RECAPTCHA = (secret_key, captcha) =>
  `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captcha}`;
