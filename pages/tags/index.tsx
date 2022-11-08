import { TAG_URL } from '@/common/constants/path';
import { findManyPostTag } from '@/common/services';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import React from 'react';

type Props = {
  data: Awaited<ReturnType<typeof findManyPostTag>>;
};

export const getServerSideProps: GetServerSideProps<Props, any> = async () => {
  const data = await findManyPostTag({ limit: 1000, offset: 0 });
  return {
    props: { data },
  };
};

const Tags: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const categories = data.data.lists;
  const total = data.data.total;

  return (
    <div className="flex flex-col text-zinc-600">
      <h2 className="mb-10 text-2xl font-semibold text-zinc-800">标签</h2>
      <div className="flex items-center justify-center mb-10">
        目前共计<span className="inline-block px-1">{total}</span>个标签
      </div>
      <ul className="flex flex-col space-y-4 list-[circle]">
        {categories?.map((v) => (
          <li key={v.id}>
            <Link
              href={`${TAG_URL}/${v.id}`}
              className="mr-2 underline transition-all-in-one underline-offset-4 hover:text-zinc-800"
            >
              {v.name}
            </Link>
            <span className="text-secondary">({v.posts})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
