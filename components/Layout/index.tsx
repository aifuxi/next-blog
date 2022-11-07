import {
  ABOUT_URL,
  ARCHIVES_URL,
  CATEGORY_URL,
  HOME_URL,
  TAG_URL,
} from '@/common/constants/path';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  FaHome,
  FaEnvelope,
  FaGithub,
  FaGlobeAsia,
  FaWeixin,
  FaTags,
  FaTh,
  FaUserAlt,
  FaArchive,
} from 'react-icons/fa';
import cs from 'classnames';
import { useRouter } from 'next/router';
import { BLOG_AUTHOR, BLOG_TITLE } from '@/common/constants/blog';
import getConfig from 'next/config';
import request from '@/utils/request';
import { getStatisticsCount, STATISTICS } from '@/common/services';
import { StatisticsCount } from '@/common/types';

const { publicRuntimeConfig } = getConfig();

type NavItem = {
  link: string;
  text: string;
  icon: React.ReactNode;
};
const navItems: NavItem[] = [
  {
    link: HOME_URL,
    text: '首页',
    icon: <FaHome className="mr-2 text-zinc-700" />,
  },
  {
    link: CATEGORY_URL,
    text: '分类',
    icon: <FaTh className="mr-2 text-zinc-700" />,
  },
  {
    link: TAG_URL,
    text: '标签',
    icon: <FaTags className="mr-2 text-zinc-700" />,
  },
  {
    link: ARCHIVES_URL,
    text: '归档',
    icon: <FaArchive className="mr-2 text-zinc-700" />,
  },
  {
    link: ABOUT_URL,
    text: '关于',
    icon: <FaUserAlt className="mr-2 text-zinc-700" />,
  },
];

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const [countData, setCountData] = useState<StatisticsCount>({
    postCategoryCount: 0,
    postCount: 0,
    postTagCount: 0,
  });

  useEffect(() => {
    const fetchCountData = async () => {
      const { data } = await getStatisticsCount();
      setCountData(data);
    };

    fetchCountData();
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <div className="w-[1120px] flex flex-row justify-between mx-auto">
        <section className="w-[815px] bg-white shadow-lg p-10">
          {children}
        </section>

        {/* 侧边栏 */}
        <aside className="w-[260px]  flex flex-col ">
          <div className="w-full mb-6 bg-white shadow-lg">
            <Link href={HOME_URL}>
              <h2 className="py-6 text-xl font-medium text-center text-white bg-zinc-700">
                {BLOG_TITLE}
              </h2>
            </Link>

            <nav className="">
              <ul className="flex flex-col py-4">
                {navItems.map((v) => (
                  <li key={v.link}>
                    <Link
                      href={v.link}
                      className="flex items-center justify-start px-4 py-3 text-xs transition-all duration-300 bg-white text-zinc-700 hover:bg-zinc-100"
                    >
                      {v.icon}
                      <span className="flex-1">{v.text}</span>
                      <span
                        className={cs('items-end w-2 h-2 rounded-full', {
                          'bg-orange-400': pathname === v.link,
                        })}
                      ></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="sticky flex flex-col items-center px-3 py-5 bg-white shadow-lg text-zinc-500 top-4">
            <div className="w-[120px] h-[120px] rounded-full border bg-white relative">
              <img
                src={
                  'https://remix-next-blog-1306920856.cos.ap-shanghai.myqcloud.com/avatar.jpg'
                }
                alt="logo"
                className="block w-[108px] h-[108px]  rounded-full absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 border border-zinc-100 object-cover"
              />
            </div>
            <h2 className="py-4 text-2xl font-medium text-center">
              {BLOG_AUTHOR}
            </h2>
            <p className="mb-6 text-[13px] text-center">
              永远相信，美好的事情众将发生
            </p>
            {/* TODO: 这个数字可以做一个滚动的效果，counterdown */}
            <ul className="flex flex-row justify-center pb-4 border-b border-dashed">
              <li className="flex flex-col items-center justify-center px-4">
                <span className="text-base font-bold text-zinc-900">
                  {countData.postCount}
                </span>
                <span className="text-[13px]">日志</span>
              </li>
              <li className="flex flex-col items-center justify-center px-4 border-l border-r">
                <span className="text-base font-bold text-zinc-900">
                  {countData.postCategoryCount}
                </span>
                <span className="text-[13px]">分类</span>
              </li>
              <li className="flex flex-col items-center justify-center px-4">
                <span className="text-base font-bold text-zinc-900">
                  {countData.postTagCount}
                </span>
                <span className="text-[13px]">标签</span>
              </li>
            </ul>

            <ul className="flex flex-row justify-center py-4">
              <li className="flex flex-col items-center justify-center px-4">
                <FaGithub />
              </li>
              <li className="flex flex-col items-center justify-center px-4">
                <FaEnvelope />
              </li>
              <li className="flex flex-col items-center justify-center px-4">
                <FaGlobeAsia />
              </li>
              <li className="flex flex-col items-center justify-center px-4">
                <FaWeixin />
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
