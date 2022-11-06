import { getPost } from '@/common/services';
import MarkdownEditor from '@/components/MarkdownEditor';
import { formatSlashTime } from '@/utils/time';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

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

  return (
    <div>
      <h1 className=" text-xl font-semibold pb-6">{post.title}</h1>
      <div className="flex flex-row items-center h-4 text-sm text-zinc-400">
        {/* 发布时间/更新时间 */}
        <div className="flex items-center justify-center space-x-1 text-zinc-400">
          <FaCalendarAlt />
          <span>{formatSlashTime(post.createdAt)}</span>
        </div>

        {/* 分类 */}
        <div className="flex items-center">
          {post.categories?.length ? (
            <>
              <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
              <FaFolderOpen className="mr-2 text-zinc-400" />
            </>
          ) : null}
          {post.categories?.map((v) => (
            <Link
              href={`/categories/${post.id}`}
              key={v.id}
              className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-900"
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
              <FaTags className="mr-2 text-zinc-400" />
            </>
          ) : null}
          {post.tags?.map((v) => (
            <Link
              href={`/tags/${post.id}`}
              key={v.id}
              className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-900"
            >
              {v.name}
            </Link>
          ))}
        </div>

        {/* 阅读数 */}
        <div className="flex items-center">
          <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
          <FaEye className="mr-2 text-zinc-400" />
          <span className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-900">
            {post.view}
          </span>
        </div>
      </div>
      <MarkdownEditor modelValue={post.content} previewOnly />
    </div>
  );
};

export default PostDetail;
