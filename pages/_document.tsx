import { BLOG_AUTHOR, BLOG_TITLE } from '@/common/constants/blog';
import { NextPage } from 'next';
import { Html, Head, Main, NextScript } from 'next/document';
const Document: NextPage = () => {
  return (
    <Html lang="zh-cmn-Hans">
      <title>{BLOG_TITLE}</title>
      <Head>
        <meta
          name="description"
          content={`${BLOG_TITLE}, 欢迎来到我的博客, 和我一起交流和学习`}
        />
        <meta
          name="keywords"
          content={`${BLOG_AUTHOR}, aifuxi, Nextjs, React, Nestjs`}
        />
        <meta name="application-name" content={BLOG_TITLE} />
        {/* 设置全局链接打开方式为_blank(在新标签页中打开) */}
        {/* <base target="_blank" /> */}
      </Head>
      <body className="selection:text-white selection:bg-zinc-700 text-primary">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
