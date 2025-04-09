import {
  Del,
  DeliveryCircleIcon,
  Dollar,
  DoubleDoorFridge,
  FacebookIcon,
  FrontLoadWashingMachine1,
  FrontLoadWashingMachine2,
  InstagramIcon,
  Laptop1,
  Laptop2,
  Laptop3,
  Laptop4,
  LinkedInIcon,
  Rent,
  RentatEase,
  RepairCircleIcon,
  RupeeIcon,
  SecureCircleIcon,
  Service,
  TwitterIcon,
  Well,
} from "@/Icons";
import { deleteCookie, getCookie } from "cookies-next";
import { notFound } from "next/navigation";

export const payrentzPhoneNumber = "+91 89395 81818";
export const payrentzEmail = "rent@payrentz.com";

export const footerLinks = [
  {
    title: "Company",
    links: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "About Us",
        link: "",
      },
      {
        text: "Blog",
        link: "/blog",
      },
      {
        text: "FAQs",
        link: "/faq",
      },
    ],
  },
  {
    title: "Categories",
    links: [
      {
        text: "Rent Appliances",
        link: "",
      },
      {
        text: "Rent Furniture",
        link: "",
      },
      {
        text: "Rent Fitness Equipment",
        link: "",
      },
      {
        text: "Rental Packages ",
        link: "",
      },
    ],
  },
];

export const socialLink = [
  {
    link: "https://x.com/PayRentz?t=ZiKUQGHjhsSzZ2MG721vWw&s=08",
    icon: TwitterIcon,
  },
  {
    link: "https://www.facebook.com/people/Payrentz/61555159774486/",
    icon: FacebookIcon,
  },
  {
    link: "https://www.instagram.com/payrentz/",
    icon: InstagramIcon,
  },
  {
    link: "https://www.linkedin.com/company/payrentz/",
    icon: LinkedInIcon,
  },
];

export const policeslinks = [
  {
    link: "/disclaimer",
    text: "Disclaimer",
  },
  {
    link: "/terms-and-conditions",
    text: "Terms & Conditions",
  },
  {
    link: "/refund-policy",
    text: "Refund Policy",
  },
  {
    link: "/privacy-policy",
    text: "Privacy Policy",
  },
];

export const dummyProductsList = [
  {
    id: 1,
    image: FrontLoadWashingMachine1,
    tag: "newly added",
    identity: "front load washing machine (6kg)",
    price: "650",
    commonly_brought: "Commonly bought with Air Conditioner 1 Ton Split",
    slug: "front-load-washing-machine-6kg",
    category: "appliances",
  },
  {
    id: 2,
    image: DoubleDoorFridge,
    tag: "Limited Time Offer",
    identity: "Double Door Fridge (240L)",
    price: "650",
    commonly_brought: "Commonly bought with Air Conditioner 1 Ton Split",
    slug: "double-door-fridge-240l",
    category: "appliances",
  },
  {
    id: 3,
    image: FrontLoadWashingMachine2,
    tag: "newly added",
    identity: "Front Load Washing Machine (6kg)",
    price: "650",
    commonly_brought: "Commonly bought with Air Conditioner 1 Ton Split",
    slug: "front-load-washing-machine-6kg",
    category: "appliances",
  },
  {
    id: 4,
    image: DoubleDoorFridge,
    tag: "Limited Time Offer",
    identity: "Double Door Fridge (240L)",
    price: "650",
    commonly_brought: "Commonly bought with Air Conditioner 1 Ton Split",
    slug: "double-door-fridge-240l",
    category: "appliances",
  },
];

export const productDescription = [
  {
    title: "Descriptions",
    link: "",
    details:
      "Payrentz offers Core i5 laptop on rental in Chennai with complete service backup. Laptop computer is compact and help people on the move to carry to office or client meetings. Laptops have replaced most of the desktops due to its design, powerful configurations, light weight and portable. Such mobile friendly laptops can be rented from Payrentz in Chennai. Renting laptops is sensible decision because service is on us, need not to invest in a technology that will obsolete, your business can be asset light and upgrade the laptop. Payrentz offers laptop for rent with standard configurations & customization. With simple documentation, online payment options, on time delivery, service backup rental laptops from Payrentz is highly convenient. Processor i5, 4GB RAM, 320/500 GB HDD is suitable for profiles that need fast PC's customization also available.",
  },
];

export const productSpecifications = [
  {
    id: 1,
    specs: "Product Name",
    details: "Laptop",
  },
  {
    id: 2,
    specs: "Configuration",
    details: "i5, 4GB RAM, 320GB HD",
  },
  {
    id: 3,
    specs: "Screen Size",
    details: "14'' and above",
  },
  {
    id: 4,
    specs: "Brand",
    details: "Leading Brands/Based on Availability",
  },
  {
    id: 5,
    specs: "Color",
    details: "May Vary/Based on Availability",
  },
  {
    id: 6,
    specs: "Transport",
    details: "Covered in Handling charges",
  },
];

export const productImages = [
  {
    img: Laptop1,
    alt: "laptop-1",
  },
  {
    img: Laptop2,
    alt: "laptop-2",
  },
  {
    img: Laptop3,
    alt: "laptop-3",
  },
  {
    img: Laptop4,
    alt: "laptop-4",
  },
];

export const charges = (securityDepositPrice, handlingChargePrice) => {
  return [
    {
      title: "Security Deposit",
      rupees: "₹" + securityDepositPrice,
      descriptions: "Security Deposit is refundable on return of the product.",
    },
    {
      title: "Handling Charge",
      rupees: "₹" + handlingChargePrice,
      descriptions:
        "Handling Charge is non-refundable - to cover delivery, pickup, installation & service.",
    },
  ];
};

export const circleIcons = [
  {
    id: 1,
    icon: DeliveryCircleIcon,
    desc: "2-day delivery",
  },
  {
    id: 2,
    icon: RepairCircleIcon,
    desc: "Service support for 6 months",
  },
  {
    id: 3,
    icon: SecureCircleIcon,
    desc: "Secure Transaction",
  },
  {
    id: 4,
    icon: DeliveryCircleIcon,
    desc: "2-day delivery",
  },
  {
    id: 5,
    icon: RepairCircleIcon,
    desc: "Service support for 6 months",
  },
];

export const iconsArr = [
  {
    id: 1,
    image: RentatEase,
    text: "Rent @ Ease",
  },
  {
    id: 2,
    image: Service,
    text: "Quick Service",
  },
  {
    id: 3,
    image: Del,
    text: "Express Delivery",
  },
  {
    id: 4,
    image: RupeeIcon,
    text: "Rent Now Pay Later",
  },
  {
    id: 5,
    image: Well,
    text: "Well Maintained",
  },
];

export const dummyCartItems = [
  {
    img: FrontLoadWashingMachine1,
    name: "Front Load Washing Machine (6kg)",
    price_per_month: 650,
    quantity: 1,
    refundable_deposit: 2000,
    delivery_in: "2-3 days after KYC",
    quantity: 1,
    tennure: 3,
    available_tenure: [1, 3, 6, 12],
  },
  {
    img: Laptop1,
    name: "Asus i5 11th Gen",
    price_per_month: 850,
    quantity: 1,
    refundable_deposit: 2000,
    delivery_in: "2-3 days after KYC",
    quantity: 1,
    tennure: 3,
    available_tenure: [1, 6, 12],
  },
];

export const tenureOptions = [
  {
    id: 1,
    identity: "1 month",
  },
  {
    id: 3,
    identity: "3 month",
  },
  {
    id: 6,
    identity: "6 month",
  },
  {
    id: 12,
    identity: "12 month",
  },
];

export const getTenureFromOption = (list) => {
  return tenureOptions?.filter((t, ind) => list?.includes(t?.id));
};

export const generateCustomFingerprint = () => {
  // Collect relevant information
  const userAgent = navigator?.userAgent;
  const language = navigator?.language;
  // const platform = navigator?.userAgentData.platform;
  const platform = navigator?.platform;
  // console.log("platttt", navigator, platform);
  const screenResolution = `${window?.screen?.width}x${window?.screen?.height}`;
  const plugins = Array.from(navigator?.plugins)
    .map((plugin) => plugin?.name)
    .join(";");

  // Introduce additional randomness
  const randomValue = Math?.random()?.toString(36)?.substring(7); // Random alphanumeric string
  const fingerprint = `${userAgent}${language}${platform}${screenResolution}${plugins}${randomValue}`;

  // Hash the fingerprint to improve privacy and consistency
  const hashedFingerprint = hashString(fingerprint);

  // Now, you can send the `hashedFingerprint` to your API
  return hashedFingerprint;
};

function hashString(str) {
  // Simple hash function for illustration purposes
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash.toString();
}

// export const faqData = [
//   {
//     question: "What is the minimum rental period?",
//     answer:
//       "Payrentz products can be rented for a minimum period of 3 months. Payrentz products can be rented for a minimum,",
//   },
//   {
//     question: "Is there an agreement?",
//     answer: "Tailwind CSS is a utility-first CSS framework.",
//   },
//   {
//     question: "How can I terminate the agreement ?",
//     answer: "Tailwind CSS is a utility-first CSS framework.",
//   },
//   {
//     question: "How much rent do I need to pay and when?",
//     answer: "Tailwind CSS is a utility-first CSS framework.",
//   },
//   {
//     question: "How much rent do I need to pay and when?",
//     answer: "Tailwind CSS is a utility-first CSS framework.",
//   },
//   {
//     question: "Is there an agreement?",
//     answer: "Tailwind CSS is a utility-first CSS framework.",
//   },
// ];

export const appHandleChange = (e, setFormData) => {
  setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
};

export const skeletonColor = "rgb(220 224 230 / 34%)";

export const errorPagehandler = (status) => {
  if (status == 404) return notFound();
  if ([500, 502]?.includes(status)) throw new Error("Failed to fetch data");
};

export const cookieAge = 2592000;

export const getUserToken = () => {
  const user_token = getCookie("user_token");
  return user_token;
};

export const getUserAuthHeader = () => {
  const userToken = getUserToken();
  return {
    Authorization: userToken ? `Token ${getUserToken()}` : undefined,
  };
};

export const bankOptions = [
  { label: "State Bank of India", value: "State Bank of India" },
  { label: "HDFC Bank", value: "HDFC Bank" },
  { label: "ICICI Bank", value: "ICICI Bank" },
  { label: "Punjab National Bank", value: "Punjab National Bank" },
  { label: "Bank of Baroda", value: "Bank of Baroda" },
  { label: "Axis Bank", value: "Axis Bank" },
  { label: "Canara Bank", value: "Canara Bank" },
  { label: "Union Bank of India", value: "Union Bank of India" },
  { label: "IDBI Bank", value: "IDBI Bank" },
  { label: "Indian Bank", value: "Indian Bank" },
  { label: "Bank of India", value: "Bank of India" },
  { label: "Central Bank of India", value: "Central Bank of India" },
  { label: "Punjab and Sind Bank", value: "Punjab and Sind Bank" },
  { label: "UCO Bank", value: "UCO Bank" },
  { label: "Kotak Mahindra Bank", value: "Kotak Mahindra Bank" },
  { label: "Yes Bank", value: "Yes Bank" },
  { label: "IndusInd Bank", value: "IndusInd Bank" },
  { label: "Federal Bank", value: "Federal Bank" },
  { label: "RBL Bank", value: "RBL Bank" },
  { label: "South Indian Bank", value: "South Indian Bank" },
  { label: "Indian Overseas Bank", value: "Indian Overseas Bank" },
  { label: "IDFC First Bank", value: "IDFC First Bank" },
];

export const rentHouseDocOptions = [
  { label: "Rental Agreement", value: "rental_agreement" },
  { label: "Utility Bill", value: "utility_bill" },
  { label: "Others", value: "others" },
];

export const ownHouseDocOptions = [
  { label: "Property Tax", value: "property_tax" },
  { label: "EB Bill", value: "eb_bill" },
  { label: "Water Tax", value: "water_tax" },
  { label: "Others", value: "Others" },
];

export const selfEmployeeOptions = [
  { label: "GST Certificate", value: "gst_certificate" },
  // { label: "Pan Card", value: "pan_card" },
  // { label: "Visiting Card", value: "visiting_card" },
  { label: "Others", value: "others" },
];

export const parentsOptions = [
  { label: "Mother", value: "mother" },
  { label: "Father", value: "father" },
  { label: "Guardian", value: "guardian" },
];

export const kycOptions = [
  { label: "Aadhaar Card", value: "aadhaar" },
  // { label: "Driving License", value: "license" },
  // { label: "Passport", value: "passport" },
  // { label: "Voter ID Card", value: "voter-id" },
  // { label: "PAN Card", value: "pan" },
];

export const kycOptionsForUserDashboard = [
  { label: "Driving License", value: "license" },
  { label: "Passport", value: "passport" },
  { label: "Voter ID Card", value: "voter-id" },
  { label: "Aadhaar Card", value: "aadhaar" },
];

export const convertToPrice = (num) => {
  const formattedPrice = num?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formattedPrice;
};

export const clearUserCookies = () => {
  deleteCookie("user_data");
  deleteCookie("user_loc");
  deleteCookie("user_token");
  deleteCookie("guest_user_id");
};

export function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);

  const day = inputDate.getDate().toString().padStart(2, "0");
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getFullYear();

  return `${day}-${month}-${year}`;
}

// Output: 04 April 2025
export const formatDateDMY = (dateString) => {
  if (!dateString) return "-"; // Handle empty or invalid input
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
//Date picker validation
export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear() - 17;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const getGreeting = () => {
  const currentTime = new Date().getHours();

  if (currentTime >= 5 && currentTime < 12) {
    return "Good Morning";
  } else if (currentTime >= 12 && currentTime < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export const ledgerTypeOptions = [
  {
    id: "credit",
    identity: "Credit",
  },
  {
    id: "debit",
    identity: "Debit",
  },
];

export const testimonialsContent = [
  {
    quote:
      "I rented furniture and home appliances in Chennai. The whole process right from delivery to pick up was hassle free and the customer service was extremely satisfactory. The quality of the rented furniture was also top-notch. The most impressive part was even if some furniture was out of stock they managed to arrange it somehow. They are always available in call or WhatsApp and they even refunded the deposit right on time. Definitely recommended. ",
    name: "Aneesha Dasgupta ",
    renting_since: "Client Since Jan 2023",
  },
  {
    quote:
      "payrentz user for more than 2 years now. Amazing service and quality products at reasonable price for rent. Thank you so much for your support payrentz. We can never forget your prompt service in professional manner even in pandemic.",
    name: "Shravani Sharma",
    renting_since: "Client Since Mar 2021",
  },
  {
    quote:
      "The service is impeccable as they have delivered the combo of washing machine and fridge at the month of Apr 2020 during Lockdown. While the contract closure in Sep 2020 also they lived up to their words and the refund was done in 4-5 days keeping in mind for the situation crunch in everyone's pockets. Thanks a ton and hope to have a longer deal the next time. Kudos! Great service and polite behaved staffs.",
    name: "Frederick Henderson",
    renting_since: "Client Since Dec 2022",
  },
  {
    quote:
      "I really enjoyed as a customer of payrentz since 1.5+ years. Wholeheartedly saying their service is really amazing and customer support team fantastic... 🤝👍🏻👍🏻. A simple example - I requested them for a periodical service with in 24hrs they did it👍🏻😊. 💯 Out of 💯. ",
    name: "Ganesh Kumar Polisetti",
    renting_since: "Client Since May 2019",
  },
  {
    quote:
      "Opted for payrentz after checking reviews of all the rental services which showed that it was by far ahead of its competitors. And the reviews were indeed true. On boarding process was smooth and hassle free. Product delivery was timely with quality of product matching with expectations. Just hope that termination process is as smooth. Highly recommended!",
    name: "Rakesh Dutt",
    renting_since: "Client Since Aug 2020",
  },
  {
    quote:
      "Very nice and Professional service. I got cycling machine, which is really good. Highly recommendable. Termination process is also smooth. They followed up for my refund amount, immediately after returning the product and credited it in my account. Cost wise and service wise they are effective than others in the market. They treat customers like king. Overall it’s an awesome service.",
    name: "Deepika Dhamodharan",
    renting_since: "Client Since Jun 2020",
  },
];

export const isNoValue = (val) => {
  return [undefined, null]?.includes(val);
};

//**************** */ Links ***************

export const SET_PRODUCT_VIEW_PATH = (city, category, identity) =>
  `/${city}/${category}/${identity}/`;

export const SET_VARIANT_VIEW_PATH = (category) => `/${category}/`;

export const SET_KYC_PATH = (step) => `/kyc/${step}/`;
export const SET_SUB_CATEGORY_PATH = (city, category, subCategory) =>
  `/${city}/${category}/${subCategory}`;
export const SET_INVOICE_DOWNLOAD_PAGE = (id) => `/invoice-download/${id}/`;
export const SET_TICKET_VIEW_PAGE = (id) => `/dashboard/support/view/${id}`;
export const SET_COMBO_VIEW_PAGE = (city, id) => `/${city}/combo/${id}/`;
export const SET_BLOGS_VIEW_PAGE = (id) => `/blogs/${id}/`;
export const SET_BLOGS_PAGE = `/blogs/`;
