import React from "react";
import Head from "next/head";

interface SEOConfig {
  title: string;
  content: string;
  image: string;
}

interface HeadTagProps {
  title: string;
  content: string;
  faviconUrl: string;
  seo: SEOConfig;
}

const HeadTag = ({ title, content, faviconUrl, seo }: HeadTagProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href={faviconUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@galleryx_" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.content} />
      <meta name="twitter:image" content={seo.image} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="galleryx" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.content} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content="" />
    </Head>
  );
};

export default HeadTag;
