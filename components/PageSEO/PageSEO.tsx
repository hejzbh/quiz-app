import React from "react";
// Next
import { NextSeo } from "next-seo";
// SEO Messages
import { SEO_DESCRIPTION, SEO_INDEX_TITLE } from "@/messages/seo";
// Interface
interface PageSEOProps {
  title: string;
  description?: string;
}
const PageSEO = ({
  title = "",
  description = SEO_DESCRIPTION,
}: PageSEOProps) => {
  return (
    <NextSeo
      title={title}
      description={description}
      defaultTitle={SEO_INDEX_TITLE}
    />
  );
};

export default PageSEO;
