import {
  GET_HOME_BOTTOM_DATA,
  GET_HOME_COMBO_DATA,
  GET_HOME_TOP_DATA,
  NAVIGATION_META_URL,
} from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import AppContainer from "@/components/Container/AppContainer";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";

export async function getStaticPaths() {
  const paths = [
    { params: { city: "chennai" } },
    { params: { city: "coimbatore" } },
  ];

  return { paths, fallback: "blocking" };
}
const DynamicHero = dynamic(
  () => import("../../../components/Homepage/HeroContent")
  // {
  //   loading: () => <p>Loading...</p>,
  // }
);

// const DynamicTopProductListing = dynamic(() =>
//   import("../../components/Homepage/HomeProductTopList")
// );

const DynamicHomeRentByCategory = dynamic(() =>
  import("../../../components/Homepage/HomeRentByCategory")
);

const DynamicHomePayrentzBenefits = dynamic(() =>
  import("../../../components/Homepage/HomePayrentzBenefits")
);
const DynamicHomePayrentzBenefitsMobile = dynamic(() =>
  import("../../../components/Homepage/HomePayrentzBenefitsMobile")
);
const DynamicTopProductListing = dynamic(() =>
  import("../../../components/Homepage/HomeProductCarousel")
);

const DynamicHomeExploreFurniture = dynamic(() =>
  import("../../../components/Homepage/HomeExploreFurniture")
);

const DynamicHomeTestimonial = dynamic(() =>
  import("../../../components/Homepage/HomeTestimonial")
);

// const DynamicHomePayrentzMedia = dynamic(() =>
//   import("../../components/Homepage/HomePayrentzMedia")
// );

const DynamicHomeFAQ = dynamic(() =>
  import("../../../components/Homepage/HomeFAQ")
);
export const generateMetadata = ({ params }) => {
  if (params.city == "chennai") {
    return {
      title: "Get best home appliances for rent in Chennai with Payrentz!",
      description:
        "Rent high-quality home appliances in Chennai at affordable rates with payrentz. Convenient delivery and easy rentals for your daily needs. Book today!",
      keywords:
        "Home Appliances on rent in Chennai, Rental washing Machines in Chennai, Laptops for rent in Chennai. Cycle & Fitness equipment rental in Chennai.",
      alternates: {
        canonical: `https://payrentz.com/chennai`,
      },
      robots: "index, follow",
    };
  }

  if (params.city == "coimbatore") {
    return {
      title: "Rent Home Appliances in Coimbatore – Payrentz",
      description:
        "Get top-quality home appliances for rent in Coimbatore with payrentz at budget-friendly prices.Convenient rental options for all your household needs. Rent now!",
      keywords:
        "Home Appliances on rent in Coimbatore, Rental washing Machines in Coimbatore, Laptops for rent in Coimbatore. Cycle & Fitness equipment rental in Coimbatore.",
      alternates: {
        canonical: `https://payrentz.com/coimbatore`,
      },
      robots: "index, follow",
    };
  }
  // Default metadata if city does not match
  return {
    title: "Get best home appliances for rent in Chennai with Payrentz!",
    description:
      "Rent high-quality home appliances in Chennai at affordable rates with payrentz. Convenient delivery and easy rentals for your daily needs. Book today!",
    keywords:
      "Home Appliances on rent in Chennai, Rental washing Machines in Chennai, Laptops for rent in Chennai. Cycle & Fitness equipment rental in Chennai.",
    alternates: {
      canonical: `https://payrentz.com/chennai`,
    },
    robots: "index, follow",
  };
};

async function getCategoryAndSubCategory() {
  const res = await fetch(getHostAPIUrl() + NAVIGATION_META_URL, {
    next: {
      tags: ["all"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getComboContent() {
  const res = await fetch(getHostAPIUrl() + GET_HOME_COMBO_DATA, {
    next: {
      tags: ["all", "variant"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPeoplesFav() {
  const res = await fetch(getHostAPIUrl() + GET_HOME_TOP_DATA, {
    next: {
      tags: ["all", "variant"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// async function getAllVariant() {
//   const res = await fetch(getHostAPIUrl() + GET_VARIANT_LIST);

//   // notFound
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     errorPagehandler(res?.status);
//   }

//   return res.json();
// }

async function getBottomContent() {
  const res = await fetch(getHostAPIUrl() + GET_HOME_BOTTOM_DATA, {
    next: {
      tags: ["all", "variant"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const allowedCities = ["coimbatore", "chennai"];
const page = async ({ params }) => {
  if (!params || !params.city || !allowedCities.includes(params.city)) {
    redirect("/chennai"); // Redirect to Chennai if city is invalid
  }

  const catAndSubCat = await getCategoryAndSubCategory();
  // const allVariant = await getAllVariant();
  const homeTopContent = await getComboContent();
  const homeBottomContent = await getBottomContent();
  const homePplFav = await getPeoplesFav();

  return (
    <>
      <AppContainer>
        <DynamicHero />
      </AppContainer>
      <AppContainer>
        <DynamicHomeRentByCategory
          homePplFav={homePplFav}
          categoryList={catAndSubCat?.data?.categories?.slice(0, 6)}
        />
        <DynamicHomePayrentzBenefits />
        <DynamicHomePayrentzBenefitsMobile />
        {/* Combo Listing */}
        <DynamicTopProductListing
          isCombo
          title={"Combo Packages"}
          list={homeTopContent?.data?.results}
        />

        <DynamicHomeExploreFurniture />
        <DynamicTopProductListing
          list={homeBottomContent?.data?.results}
          classname="md:mt-[80px]"
          title={"Rent Furniture"}
        />
        <DynamicHomeTestimonial />
      </AppContainer>
      {/* <DynamicHomePayrentzMedia /> */}
      <AppContainer>
        <DynamicHomeFAQ />
      </AppContainer>
    </>
  );
};

export default page;
