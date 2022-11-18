import { CATEGORY_URL } from '@/common/constants/path';
import { findManyPostCategory } from '@/common/services';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import React from 'react';

type Props = {
  data: Awaited<ReturnType<typeof findManyPostCategory>>;
};

export const getServerSideProps: GetServerSideProps<Props, any> = async () => {
  const data = await findManyPostCategory({ limit: 1000, offset: 0 });
  return {
    props: { data },
  };
};

const Categories: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const categories = data.data.lists;
  const total = data.data.total;

  return (
    <div className="flex flex-col">
      <h2 className="mb-10 text-2xl font-semibold text-zinc-800">分类</h2>
      <div className="flex items-center justify-center mb-10">
        目前共计<span className="inline-block px-1">{total}</span>个分类
      </div>
      <ul className="flex flex-col space-y-4 list-[circle]">
        {categories?.map((v) => (
          <li key={v.id}>
            <Link
              href={`${CATEGORY_URL}/${v.id}`}
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

export default Categories;
