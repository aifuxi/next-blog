import { postTypeMap } from '@/common/config/postTypeMap';
import { BLOG_AUTHOR } from '@/common/constants/blog';
import { VIEW_INCREMENT_MILLISECOND } from '@/common/constants/numbers';
import { CATEGORY_URL, TAG_URL } from '@/common/constants/path';
import { getPost, getProfile, postViewIncrement } from '@/common/services';
import MarkdownEditor from '@/components/MarkdownEditor';
import { formatNumber } from '@/utils/number';
import { getViewedPostIds, setViewedPostId } from '@/utils/storage';
import { formatTime } from '@/utils/time';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { FaCalendarAlt, FaFolderOpen, FaTags, FaEye } from 'react-icons/fa';

type Props = {
  data: Awaited<ReturnType<typeof getPost>>;
  profile: Awaited<ReturnType<typeof getProfile>>;
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const data = await getPost(params?.id || '');
  const profile = await getProfile();
  return {
    props: { data, profile },
  };
};

const PostDetail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data, profile }) => {
  const post = data.data;
  const router = useRouter();
  const author = profile.data?.author || BLOG_AUTHOR;

  useEffect(() => {
    let timeId: number;
    if (post?.id) {
      const viewedIds = getViewedPostIds();
      const isViewed = viewedIds?.includes(post.id);

      if (!isViewed) {
        // 没看过并且在文章详情呆够 VIEW_INCREMENT_MILLISECOND 向后端发送阅读量+1请求
        // 防止浏览量一直++
        timeId = window.setTimeout(async () => {
          await postViewIncrement(post.id);
          setViewedPostId(post.id);
        }, VIEW_INCREMENT_MILLISECOND);
      }
    } else {
      router.replace('/404');
    }

    return () => {
      timeId && window.clearTimeout(timeId);
    };
  }, [post, router]);

  const getKeywords = () => {
    const categories = post?.categories?.map((v) => v.name) || [];
    const tags = post?.tags?.map((v) => v.name) || [];

    return categories?.concat(tags).join(', ');
  };

  return (
    <div className="pb-20">
      {/* SEO */}
      <Head>
        <title>{`${author}的博客-${post?.title}`}</title>
        <meta name="description" content={post?.description} />
        <meta name="keywords" content={`${author}, ${getKeywords()}`} />
      </Head>

      <h1 className="pb-6 text-xl font-semibold text-zinc-800">
        {post?.title}
      </h1>
      <div className="flex flex-row items-center mb-4 text-sm">
        {/* xs屏幕下，文章的一些属性 */}
        <div className="flex flex-col flex-wrap md:hidden md:items-center md:flex-row md:h-6 sm:mb-2 text-size-small">
          <div className="flex items-center">
            {/* 是否原创 */}
            <div className="flex items-center justify-center h-4 px-1 mr-2 text-xs text-white bg-zinc-500">
              {post?.type ? postTypeMap[post.type] : '-'}
            </div>
            {/* 发布时间/更新时间 */}
            <div className="flex items-center h-full space-x-1 md:justify-center text-secondary text-size-small">
              <FaCalendarAlt />
              <span className="inline-flex items-center h-full">
                {formatTime(post?.createdAt)}
              </span>
            </div>
            {/* 阅读数 */}
            <div className="flex items-center text-secondary">
              <span className=" w-[1px] h-3 mx-4 bg-zinc-400"></span>
              <FaEye className="mr-2" />
              <span className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800">
                {formatNumber(post?.view)}
              </span>
            </div>
          </div>

          <div className="flex items-center pt-2 text-xs">
            {/* 分类 */}
            <div className="flex items-center text-secondary">
              {post?.categories?.length ? (
                <FaFolderOpen className="mr-2" />
              ) : null}
              {post?.categories?.map((v) => (
                <Link
                  href={`${CATEGORY_URL}/${post.id}`}
                  key={v.id}
                  className="underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800"
                >
                  {v.name}
                </Link>
              ))}
            </div>

            {/* 标签 */}
            <div className="flex items-center flex-1 text-secondary">
              {post?.tags?.length ? (
                <>
                  <span className=" w-[1px] h-3 mx-4 bg-zinc-400"></span>
                  <FaTags className="mr-2" />
                </>
              ) : null}
              {post?.tags?.map((v) => (
                <Link
                  href={`${TAG_URL}/${post.id}`}
                  key={v.id}
                  className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800"
                >
                  {v.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* >= md屏幕下，文章的一些属性 */}
        <div className="items-center hidden md:flex text-size-small">
          {/* 是否原创 */}
          <div className="flex items-center justify-center w-10 h-4 mr-2 text-xs text-white bg-zinc-500">
            {post?.type ? postTypeMap[post.type] : '-'}
          </div>

          {/* 发布时间/更新时间 */}
          <div className="flex items-center justify-center h-full space-x-1 text-secondary text-size-small">
            <FaCalendarAlt />
            <span className="inline-flex items-center h-full">
              {formatTime(post?.createdAt)}
            </span>
          </div>

          {/* 分类 */}
          <div className="flex items-center text-secondary">
            {post?.categories?.length ? (
              <>
                <span className=" w-[1px] h-3 mx-4 bg-zinc-400"></span>
                <FaFolderOpen className="mr-2 " />
              </>
            ) : null}
            {post?.categories?.map((v) => (
              <Link
                href={`${CATEGORY_URL}/${post?.id}`}
                key={v.id}
                className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800"
              >
                {v.name}
              </Link>
            ))}
          </div>

          {/* 标签 */}
          <div className="flex items-center text-secondary">
            {post?.tags?.length ? (
              <>
                <span className=" w-[1px] h-3 mx-4 bg-zinc-400 inline-block"></span>
                <FaTags className="mr-2" />
              </>
            ) : null}
            {post?.tags?.map((v) => (
              <Link
                href={`${TAG_URL}/${post?.id}`}
                key={v.id}
                className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800"
              >
                {v.name}
              </Link>
            ))}
          </div>

          {/* 阅读数 */}
          <div className="flex items-center text-secondary">
            <span className=" w-[1px] h-3 mx-4 bg-zinc-400 inline-block"></span>
            <FaEye className="mr-2" />
            <span className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800">
              {formatNumber(post?.view)}
            </span>
          </div>
        </div>
      </div>
      <MarkdownEditor modelValue={post?.content || ''} previewOnly />

      <div className="flex justify-center pt-10 text-xs text-secondary">
        —— <span className="mx-2">最后更新于{formatTime(post?.updatedAt)}</span>
        ——
      </div>
    </div>
  );
};

export default PostDetail;
