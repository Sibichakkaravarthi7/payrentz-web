"use client";
import AboutImageCarousel from "@/components/AboutPage/AboutImageCarousel";
import AppButton from "@/components/Button/AppButton";
import AppContainer from "@/components/Container/AppContainer";
import AppImage from "@/components/Image/AppImage";
import Layout from "@/components/Layout/Layout";
import Text from "@/components/Text/Text";
import {
  DeliveryAbout,
  HeroAbout1,
  HeroAbout2,
  HeroAbout3,
  HeroAbout4,
  HeroAbout5,
  MailAbout,
  MaintenanceAbout,
  RecycleAbout,
  RentEaseAbout,
  RupeeAbout,
} from "@/Icons";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const heroSectionImages = [
    {
      img: HeroAbout1,
      alt: "hero-about-image",
    },
    {
      img: HeroAbout2,
      alt: "hero-about-image",
    },
    {
      img: HeroAbout3,
      alt: "hero-about-image",
    },
    {
      img: HeroAbout4,
      alt: "hero-about-image",
    },
    {
      img: HeroAbout5,
      alt: "hero-about-image",
    },
  ];
  const cardDetails = [
    {
      icon: RentEaseAbout,
      title: "Rent @ Ease",
      desc: "Our tech-driven, simplified rental process minimizes administrative burden, enhances communication, and nurtures positive relationship ensuring convenience, efficiency, and transparency for all stakeholders. In simplicity lies the essence of sophistication.",
    },
    {
      icon: MaintenanceAbout,
      title: "Quick Service",
      desc: "All products are subjected to visual inspection, functional testing and rigorous checks at our warehouse. We attempt to maintain products in pristine condition all through the product journey including storage, handling, packaging, transportation and delivery. ",
    },
    {
      icon: DeliveryAbout,
      title: "Express Delivery",
      desc: "We are committed to delivering products to our clients within 24 hours following successful KYC verification, leveraging an energetic logistics team to ensure swift and efficient service that meets client needs promptly. ",
    },
    {
      icon: RupeeAbout,
      title: "Rent Now Pay Later",
      desc: "Monthly subscription for the products rented is postpaid. Under this arrangement, our clients avail the services first and pay the monthly rental subscription at the end of a billing period, offering convenience and flexibility in managing expenses. ",
    },
    {
      icon: RecycleAbout,
      title: "Well Maintained",
      desc: "Ensuring client delight is paramount to us, evident in our approach of treating every inquiry as an urgent SOS call. Timely service isn't merely a commitment; it's a reflection of our client-first ethos.",
    },
  ];
  return (
    <Layout>
      <Head>
        <title>About page | payrentz</title>
        <meta
          name="description"
          content="We excel in offering rental solutions, providing a wide selection of home appliances, electronics, furniture, and fitness equipment on a convenient monthly rental plan. Our services are thoughtfully designed to accommodate the specific rental requirements and preferences of each client."
        />
        <link rel="canonical" href={`https://www.payrentz.com/about-us`} />
      </Head>
      <div>
        <div className="bg-[#2B5CAB] pb-[80px] w-full h-full">
          <AppContainer>
            <Text
              className={
                "pt-[80px] mb-[20px] md:mb-[50px] text-[30px] md:text-[48px] font-extrabold text-[#ffffff]"
              }
            >
              payrentz - Team of passionate Rentrepreneurs
            </Text>
            <Text
              className={
                "text-[#ffffff] font-semibold !leading-[20px] md:!leading-[40px]"
              }
            >
              We specialize in delivering rental solutions to our clients,
              offering a diverse range of Home Appliances, Electronics,
              Furniture and Fitness Equipment on a monthly rental basis. Our
              services are meticulously crafted to cater to the unique rental
              needs and preferences of each client.
            </Text>

            {/* {
            heroSectionImages?.map((i, ind) => (
              <div key={ind}>
                <AppImage
                  src={i?.img}
                  alt={i?.alt}
                  className={'max-h-[400px]'}
                  />
              </div>
            ))
          } */}
            <AboutImageCarousel list={heroSectionImages} />
          </AppContainer>
        </div>
        <AppContainer>
          <Text
            id="payrentz-promise"
            className={
              "text-[24px] md:text-[40px] font-extrabold text-[#2B5CAB] mt-[30px] md:mt-[90px] mb-[20px] md:mb-[60px]"
            }
          >
            payrentz promise
          </Text>
          <div className="grid md:grid-cols-3 gap-[20px] md:gap-[50px]">
            {cardDetails?.map((i, index) => (
              <div
                key={index}
                className="max-w-[380px] max-h-[401px] px-[14px] rounded-[15px] py-[12px] bg-[#F3F7FF] flex flex-col gap-[25px] justify-center items-center text-center"
              >
                <AppImage
                  src={i?.icon}
                  alt="about-icon"
                  className={"md:w-[70px] w-[30px] h-[30px] md:h-[70px]"}
                />
                <Text className={"font-bold text-[12px] md:text-[20px]"}>
                  {i?.title}
                </Text>
                <Text
                  className={"text-[10px] md:text-[16px] md:!leading-[30px]"}
                >
                  {i?.desc}
                </Text>
              </div>
            ))}
            <div className="max-w-[380px] max-h-[401px] px-[14px] rounded-[15px] py-[12px] bg-[#2B5CAB] flex flex-col justify-center items-center text-center">
              <AppImage
                src={MailAbout}
                alt="about-icon"
                className={
                  "md:w-[70px] w-[30px] h-[30px] mb-[20px] md:mb-[46px] md:h-[70px]"
                }
              />
              <Text
                className={
                  "font-bold text-[#ffffff] mb-[10px] text-[12px] md:text-[20px]"
                }
              >
                Have any questions?
              </Text>
              <Text
                className={
                  "text-[10px] md:text-[16px] !leading-[30px] font-bold mb-[30px] md:mb-[90px] text-[#ffffff]"
                }
              >
                Check out our FAQs
              </Text>
              <AppButton
                variant={"red"}
                onClick={() => router.push(`/faq`)}
                text={"Read more"}
                className={"mt-["}
              />
            </div>
          </div>
        </AppContainer>
      </div>
    </Layout>
  );
};

export default Page;
