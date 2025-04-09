"use client";

import { GET_BLOG_LIST } from "@/api/urls/urls";
import BlogCard from "@/components/Blogs/BlogCard";
import BlogHomeBanner from "@/components/Blogs/BlogHomeBanner";
import AppButton from "@/components/Button/AppButton";
import AppContainer from "@/components/Container/AppContainer";
import Layout from "@/components/Layout/Layout";
import AppLoader from "@/components/Loader/AppLoader";
import Text from "@/components/Text/Text";
import { SET_BLOGS_VIEW_PAGE } from "@/utils/Constants";
import makeGetRequest from "@/utils/makeGetRequest";
import React, { useState } from "react";
import { useQuery } from "react-query";

const Page = () => {
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    [GET_BLOG_LIST],
    () => makeGetRequest(GET_BLOG_LIST),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <Layout>
      <div>
        {isLoading ? (
          <div className="min-h-[90vh] flex items-center ">
            <AppLoader />
          </div>
        ) : (
          <AppContainer>
            <BlogHomeBanner data={data?.data?.results?.[0]} />

            <div className="mt-[30px] lg:mt-[60px] ">
              <Text
                as="h1"
                className={"text-[26px] lg:text-[36px] font-bold mb-[20px] "}
              >
                Latest Posts
              </Text>
              <div className="flex flex-wrap gap-3 lg:gap-6">
                {showAll
                  ? data?.data?.results?.map((d) => (
                      <BlogCard
                        image={d?.banner_image?.file}
                        tag={d?.category?.identity}
                        title={d?.title}
                        name={d?.author}
                        date={d?.created?.split("T")?.[0]}
                        key={d?.id}
                        link={SET_BLOGS_VIEW_PAGE(d?.slug)}
                      />
                    ))
                  : data?.data?.results
                      ?.slice(0, 6)
                      ?.map((d) => (
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
              {showAll == false && (
                <div className="flex justify-center mt-10">
                  <AppButton
                    text="View All Posts"
                    className="border-solid border-2 border-gray-300 text-gray-600 font-medium text-sm "
                    onClick={() => setShowAll(true)}
                  />
                </div>
              )}
            </div>
          </AppContainer>
        )}
      </div>
    </Layout>
  );
};

export default Page;
