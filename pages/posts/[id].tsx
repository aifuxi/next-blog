import { VIEW_INCREMENT_MILLISECOND } from '@/common/constants/numbers';
import { getPost, postViewIncrement } from '@/common/services';
import MarkdownEditor from '@/components/MarkdownEditor';
import { formatNumber } from '@/utils/number';
import { formatTime } from '@/utils/time';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { FaCalendarAlt, FaFolderOpen, FaTags, FaEye } from 'react-icons/fa';

type Props = {
  data: Awaited<ReturnType<typeof getPost>>;
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const data = await getPost(params?.id || '');
  return {
    props: { data },
  };
};

const PostDetail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const post = data.data;

  useEffect(() => {
    // 在文章详情呆够 VIEW_INCREMENT_MILLISECOND 向后端发送阅读量+1请求
    const timeId = window.setTimeout(async () => {
      await postViewIncrement(post.id);
    }, VIEW_INCREMENT_MILLISECOND);

    return () => {
      window.clearTimeout(timeId);
    };
  }, [post]);

  return (
    <div>
      <h1 className="pb-6 text-xl font-semibold text-zinc-800">{post.title}</h1>
      <div className="flex flex-row items-center h-4 text-sm ">
        {/* 发布时间/更新时间 */}
        <div className="flex items-center justify-center space-x-1 ">
          <FaCalendarAlt />
          <span>{formatTime(post.createdAt)}</span>
        </div>

        {/* 分类 */}
        <div className="flex items-center">
          {post.categories?.length ? (
            <>
              <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
              <FaFolderOpen className="mr-2 " />
            </>
          ) : null}
          {post.categories?.map((v) => (
            <Link
              href={`/categories/${post.id}`}
              key={v.id}
              className="mr-2 underline transition-all-in-one underline-offset-4 hover:text-zinc-800"
            >
              {v.name}
            </Link>
          ))}
        </div>

        {/* 标签 */}
        <div className="flex items-center">
          {post.tags?.length ? (
            <>
              <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
              <FaTags className="mr-2 " />
            </>
          ) : null}
          {post.tags?.map((v) => (
            <Link
              href={`/tags/${post.id}`}
              key={v.id}
              className="mr-2 underline transition-all-in-one underline-offset-4 hover:text-zinc-800"
            >
              {v.name}
            </Link>
          ))}
        </div>

        {/* 阅读数 */}
        <div className="flex items-center">
          <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
          <FaEye className="mr-2 " />
          <span className="mr-2 underline transition-all-in-one underline-offset-4 hover:text-zinc-800">
            {formatNumber(post.view)}
          </span>
        </div>
      </div>
      <MarkdownEditor modelValue={post.content} previewOnly />
    </div>
  );
};

export default PostDetail;
