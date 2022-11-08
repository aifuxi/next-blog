import { POST_URL } from '@/common/constants/path';
import { getPostCategory } from '@/common/services';
import { dateFormatter, formatTime } from '@/utils/time';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
type Props = {
  data: Awaited<ReturnType<typeof getPostCategory>>;
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const data = await getPostCategory(params?.id || '');
  return {
    props: { data },
  };
};

const CategoryDetail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const { name, posts } = data.data;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-zinc-800 relative transition-all-in-one  py-6 pl-4  after:absolute after:w-[6px] after:h-full after:left-0 after:top-0 after:bg-zinc-100 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10  border-zinc-200 before:top-1/2 before:-translate-y-1/2">
        {name} <span className="text-lg text-secondary">分类</span>
      </h2>

      <ul className="flex flex-col ">
        {posts.map((v) => {
          return (
            <li
              key={v.id}
              className="relative transition-all-in-one hover:text-zinc-800 hover:font-medium  py-6 pl-4 border-b after:absolute after:w-[6px] after:h-full after:left-0 after:top-0 after:bg-zinc-100 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10 border-dashed border-zinc-200 before:top-1/2 before:-translate-y-1/2   hover:border-zinc-800 hover:before:bg-zinc-800"
            >
              <Link href={`${POST_URL}/${v.id}`}>
                <span className="mr-4">
                  {formatTime(v.createdAt, dateFormatter)}
                </span>
                <span>{v.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryDetail;
