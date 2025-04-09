import { LeftArrowWithoutLineIcon } from "@/Icons";
import { GET_BLOG_BY_ID } from "@/api/urls/urls";
import { getHostAPIUrl } from "@/appConfig";
import BlogCard from "@/components/Blogs/BlogCard";
import AppContainer from "@/components/Container/AppContainer";
import AppImage from "@/components/Image/AppImage";
import AppLink from "@/components/Link/AppLink";
import Text from "@/components/Text/Text";
import { SET_BLOGS_PAGE, SET_BLOGS_VIEW_PAGE } from "@/utils/Constants";
import React from "react";
import MarkdownPreview from "./DescriptionComp";
import AppButton from "@/components/Button/AppButton";
import Layout from "@/components/Layout/Layout";

export async function generateMetadata({ params }, parent) {
  // read route params
  const id = params.id;

  // fetch data
  const data = await fetch(getHostAPIUrl() + GET_BLOG_BY_ID(id)).then((res) =>
    res.json()
  );

  // optionally access and extend (rather than replace) parent metadata
  // const previousImage = (await parent).data?.data?.blog_detail?.banner_image
  //   ?.file;

  const ogImage = data?.data?.blog_detail?.banner_image?.file;

  return {
    title: data?.data?.blog_detail?.title,
    openGraph: {
      images: [ogImage],
      type: "article",
      locale: "en_gb",
      title: data?.data?.blog_detail?.title,
      url: "https://www.payrentz.com/blogs/" + data?.data?.blog_detail?.slug,
      site_name: "payRentz",
    },
    alternates: {
      canonical:
        "https://www.payrentz.com/blogs/" + data?.data?.blog_detail?.slug,
    },
  };
}

async function getBlogData(slug) {
  const res = await fetch(getHostAPIUrl() + GET_BLOG_BY_ID(slug), {
    next: {
      revalidate: 30,
      tags: ["all", slug],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const allowedCities = ["coimbatore", "chennai"];
const Page = async ({ params }) => {
  const id = params?.id;
  const data = await getBlogData(id);

  // console.log("dataaa", data?.data?.blog_detail?.banner_image?.file);

  return (
    <Layout>
      <AppContainer>
        <div className="pt-[20px] lg:p-[20px]">
          <AppLink link={SET_BLOGS_PAGE} className="cursor-pointer">
            <div className="flex gap-1 items-center w-auto ">
              <AppImage
                src={LeftArrowWithoutLineIcon}
                height={16}
                width={16}
                className="max-h-[12px]"
              />
              <Text
                className={
                  "text-[14px] lg:text-[18px] font-semibold tracking-wider "
                }
              >
                Back
              </Text>
            </div>
          </AppLink>
          <div className=" flex flex-col gap-3 bg-white min-h-[250px]  ">
            <div className="flex flex-col gap-1">
              <div className="bg-[#2B5CAB] w-fit p-[5px] px-[8px] lg:p-[7px] lg:px-[12px] rounded-md mt-[20px] ">
                <Text
                  className={
                    "text-[12px] lg:text-[16px] text-white font-semibold "
                  }
                >
                  {data?.data?.blog_detail?.category?.identity}
                </Text>
              </div>

              <Text
                as="h1"
                className={
                  "text-[23px] lg:text-[45px] font-semibold max-w-[980px] "
                }
              >
                {data?.data?.blog_detail?.title}
              </Text>
              <div className="flex gap-2 lg:gap-3 items-center ">
                <Text
                  className={
                    "text-[#867b7b] text-[12px] lg:text-[14px] font-semibold tracking-wider "
                  }
                >
                  {data?.data?.blog_detail?.author}
                </Text>
                <Text
                  className={
                    "text-[#867b7b] text-[12px] lg:text-[14px] font-medium "
                  }
                >
                  {data?.data?.blog_detail?.created?.split("T")?.[0]}
                </Text>
              </div>
            </div>
            <div className="">
              <AppImage
                className={"min-w-[100%]"}
                width={1200}
                height={600}
                src={data?.data?.blog_detail?.banner_image?.file}
                loading="lazy"
              />
            </div>

            <div className="ql-snow">
              <div className="ql-editor markdown-preview !px-0">
                {/* <div
                dangerouslySetInnerHTML={{
                  __html: data?.data?.blog_detail?.description,
                }}
              /> */}
                <MarkdownPreview
                  markdown={data?.data?.blog_detail?.description}
                  components={{
                    table: ({ node, ...props }) => (
                      <table
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          width: "100%",
                        }}
                        {...props}
                      />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        style={{ border: "1px solid black", padding: "8px" }}
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        style={{ border: "1px solid black", padding: "8px" }}
                        {...props}
                      />
                    ),
                  }}
                />
              </div>
            </div>
            {data?.data?.blog_detail?.call_to_action_link &&
              data?.data?.blog_detail?.call_to_action_text && (
                <div className="flex align-center justify-center py-[30px]">
                  <AppLink
                    target="_blank"
                    link={data?.data?.blog_detail?.call_to_action_link || ""}
                  >
                    <AppButton
                      text={data?.data?.blog_detail?.call_to_action_text}
                      variant={"red"}
                    />
                  </AppLink>
                </div>
              )}
            <div className="mt-[10px]">
              <Text
                as="h4"
                className={
                  " text-[23px] lg:text-[30px] font-semibold max-w-[980px] mb-3 "
                }
              >
                Recent Blogs :
              </Text>
              <div className="flex flex-wrap gap-6 mb-[90px] justify-center">
                {data?.data?.latest_blogs?.map((d) => (
                  <BlogCard
                    image={d?.banner_image?.file}
                    tag={d?.category?.identity}
                    title={d?.title}
                    name={d?.author}
                    date={d?.created?.split("T")?.[0]}
                    key={d?.id}
                    link={SET_BLOGS_VIEW_PAGE(d?.slug)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </Layout>
  );
};

export default Page;
