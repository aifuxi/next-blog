import { POST_URL } from '@/common/constants/path';
import { findManyPosts } from '@/common/services';
import {
  dateFormatter,
  formatTime,
  monthDayFormatter,
  yearFormatter,
  yearMonthFormatter,
} from '@/utils/time';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import React from 'react';
import { groupBy } from 'lodash-es';

type Props = {
  data: Awaited<ReturnType<typeof findManyPosts>>;
};

export const getServerSideProps: GetServerSideProps<Props, any> = async () => {
  const data = await findManyPosts({ limit: 1000, offset: 0 });
  return {
    props: { data }, // will be passed to the page component as props
  };
};

const Archives: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const posts = data.data.lists || [];
  const total = data.data.total;

  console.log(posts);

  const groupData = groupBy(posts, (post) => {
    return formatTime(post.createdAt, yearMonthFormatter);
  });

  console.log(groupData);
  console.log(Object.keys(groupData));
  console.log(groupData[Object.keys(groupData)[0]]);

  const renderList = () => {
    const ls: React.ReactNode[] = [];
    Object.keys(groupData).forEach((v) => {
      ls.push(
        <li
          key={v}
          className="relative font-semibold text-2xl  py-10 pl-6 border-b after:absolute after:w-[6px] after:h-full after:left-0 after:top-0 after:bg-zinc-100 before:absolute before:w-2.5 before:h-2.5 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10 border-dashed border-zinc-200 before:top-1/2 before:-translate-y-1/2 before:-translate-x-0.5"
        >
          {v}
        </li>
      );

      groupData[v].forEach((v) => {
        ls.push(
          <li
            key={v.id}
            className="relative transition-colors duration-300 py-6 pl-6 border-b after:absolute after:w-[6px] after:h-full after:left-0 after:top-0 after:bg-zinc-100 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10 border-dashed border-zinc-200 before:top-1/2 before:-translate-y-1/2   hover:border-zinc-800 hover:before:bg-zinc-800"
          >
            <Link href={`${POST_URL}/${v.id}`}>
              <span className="mr-4">
                {formatTime(v.createdAt, monthDayFormatter)}
              </span>
              <span>{v.title}</span>
            </Link>
          </li>
        );
      });
    });

    return ls;
  };

  return (
    <div className="flex flex-col text-zinc-600">
      <ul className="flex flex-col text-zinc-600">
        <li className="relative  py-6 pl-6 border-b after:absolute after:w-[6px] after:h-full after:left-0 after:top-1/2 after:bg-zinc-100 before:absolute before:w-3 before:h-3 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10 border-dashed border-zinc-200 before:top-1/2 before:-translate-y-1/2 before:-translate-x-1">
          嗯..! 目前共计
          <span className="px-2 text-lg font-medium">{total}</span>
          篇博客。 继续努力。🤗🤗
        </li>
        {renderList()}
      </ul>
    </div>
  );
};

export default Archives;
