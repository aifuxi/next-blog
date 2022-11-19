import {
  ABOUT_URL,
  ARCHIVES_URL,
  CATEGORY_URL,
  HOME_URL,
  POST_URL,
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
  FaBars,
} from 'react-icons/fa';
import cs from 'classnames';
import { useRouter } from 'next/router';
import { BLOG_AUTHOR, BLOG_TITLE } from '@/common/constants/blog';
import { getProfile, getStatisticsCount } from '@/common/services';
import { Profile, StatisticsCount } from '@/common/types';
import {
  NEXT_THEME_REFERENCE_URL,
  NEXT_THEME_URL,
  NEXT_URL,
} from '@/common/constants/url';
import Image from 'next/image';
import BackToTop from '../BackToTop';
import Catalog from '../Catalog';

type NavItem = {
  link: string;
  text: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    link: HOME_URL,
    text: '首页',
    icon: <FaHome className="mr-2 text-zinc-800 text-size-small" />,
  },
  {
    link: CATEGORY_URL,
    text: '分类',
    icon: <FaTh className="mr-2 text-zinc-800 text-size-small" />,
  },
  {
    link: TAG_URL,
    text: '标签',
    icon: <FaTags className="mr-2 text-zinc-800 text-size-small" />,
  },
  {
    link: ARCHIVES_URL,
    text: '归档',
    icon: <FaArchive className="mr-2 text-zinc-800 text-size-small" />,
  },
  {
    link: ABOUT_URL,
    text: '关于',
    icon: <FaUserAlt className="mr-2 text-zinc-800 text-size-small" />,
  },
];

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const thisYear = new Date().getFullYear();
  const [countData, setCountData] = useState<StatisticsCount>({
    postCategoryCount: 0,
    postCount: 0,
    postTagCount: 0,
  });
  const [profile, setProfile] = useState<Profile>({
    email: '',
    github: '',
    author: '',
    slogan: '',
    site: '',
    avatar: '',
  });
  const blogTitle = profile.author ? `${profile.author}的博客` : BLOG_TITLE;
  const author = profile.author ? profile.author : BLOG_AUTHOR;
  const [menu, setMenu] = useState(false);
  const [element, setElement] = useState<HTMLElement>();

  const handleToggleMenu = () => {
    setMenu((v) => !v);
  };

  useEffect(() => {
    const fetchCountData = async () => {
      const { data } = await getStatisticsCount();
      setCountData(
        data || {
          postCount: 0,
          postCategoryCount: 0,
          postTagCount: 0,
        }
      );
    };

    const fetchProfile = async () => {
      const { data } = await getProfile();
      setProfile(data || {});
      window.document.title = data?.author
        ? `${data.author}的博客`
        : BLOG_TITLE;
    };

    fetchCountData();
    fetchProfile();
  }, []);

  useEffect(() => {
    setMenu(false);
    setElement(window.document.documentElement);
  }, [pathname]);

  return (
    <div className="w-full h-full min-h-screen bg-white lg:bg-zinc-50">
      <BackToTop />

      <main className="flex flex-col-reverse lg:justify-between lg:flex-row lg:mx-auto lg:w-[1120px]">
        {/* 网站主体部分 */}
        <section className="lg:w-[815px] min-h-screen bg-white  lg:shadow-lg lg:p-10 lg:mr-6 pt-20 px-6">
          {children}
        </section>

        {/* 侧边栏 */}
        <aside className="lg:w-[260px] w-full  flex flex-col ">
          <div className="w-full mb-6 bg-white shadow-lg ">
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center px-4 bg-zinc-800 lg:static">
              <FaBars
                className="mr-4 text-3xl text-white cursor-pointer lg:hidden"
                onClick={handleToggleMenu}
              />
              <Link
                href={HOME_URL}
                className="flex-1 py-6 text-2xl font-medium text-center text-white "
              >
                <h1>{blogTitle}</h1>
              </Link>
            </div>

            <nav>
              <ul
                className={cs(
                  'lg:h-full fixed top-20 lg:static left-0 right-0 z-50 lg:flex lg:flex-col py-4 bg-white lg:shadow-none',
                  {
                    'shadow-xl': menu,
                    hidden: !menu,
                  }
                )}
              >
                {navItems.map((v) => (
                  <li key={v.link}>
                    <Link
                      href={v.link}
                      className="flex items-center justify-start h-10 px-4 bg-white transition-all-in-one text-size-small text-primary hover:bg-zinc-100"
                    >
                      {v.icon}
                      <span
                        className={cs(
                          'flex-1 inline-flex items-center h-full ',
                          {
                            'font-semibold': pathname === v.link,
                          }
                        )}
                      >
                        {v.text}
                      </span>
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

          <div className="sticky flex-col items-center hidden px-3 py-5 mb-6 bg-white shadow-lg top-4 lg:flex">
            <div className="w-[120px] h-[120px] border rounded-full overflow-hidden bg-white relative">
              <img
                src={profile.avatar}
                alt="logo"
                className="block w-[108px] h-[108px] absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 object-cover"
              />
            </div>
            <h2 className="py-4 text-2xl font-medium text-center">
              {profile.author}
            </h2>
            <p className="mb-6 text-center text-size-small text-primary">
              {profile.slogan}
            </p>
            {/* TODO: 这个数字可以做一个滚动的效果，counter down */}
            <ul className="flex flex-row justify-center pb-4 border-b border-dashed">
              <li>
                <Link
                  href={ARCHIVES_URL}
                  className="flex flex-col items-center justify-center px-4"
                >
                  <span className="text-base font-bold text-zinc-800">
                    {countData.postCount}
                  </span>
                  <span className="text-size-small">文章</span>
                </Link>
              </li>
              <li>
                <Link
                  href={CATEGORY_URL}
                  className="flex flex-col items-center justify-center px-4 border-l border-r"
                >
                  <span className="text-base font-bold text-zinc-800">
                    {countData.postCategoryCount}
                  </span>
                  <span className="text-size-small">分类</span>
                </Link>
              </li>
              <li>
                <Link
                  href={TAG_URL}
                  className="flex flex-col items-center justify-center px-4"
                >
                  <span className="text-base font-bold text-zinc-800">
                    {countData.postTagCount}
                  </span>
                  <span className="text-size-small">标签</span>
                </Link>
              </li>
            </ul>

            <ul className="flex flex-row justify-center py-4">
              {profile.github && (
                <li className="flex flex-col items-center justify-center px-4">
                  <Link href={profile.github} target="_blank" rel="noreferrer">
                    <FaGithub />
                  </Link>
                </li>
              )}
              {profile.email && (
                <li className="flex flex-col items-center justify-center px-4">
                  <Link
                    href={`mailto:${profile.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaEnvelope />
                  </Link>
                </li>
              )}
              {profile.site && (
                <li className="flex flex-col items-center justify-center px-4">
                  <a href={profile.site} target="_blank" rel="noreferrer">
                    <FaGlobeAsia />
                  </a>
                </li>
              )}
              {profile.wechat && (
                <li className="flex flex-col items-center justify-center px-4">
                  <Link href={profile.wechat} target="_blank" rel="noreferrer">
                    <FaWeixin />
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <Catalog />
        </aside>
      </main>

      {/* footer */}
      <footer className="flex flex-col pt-16 pb-4 space-y-1 text-xs">
        <div className="text-center text-secondary">{`Copyright © ${thisYear} ${author} All rights reserved.`}</div>
        <div className="flex justify-center space-x-1">
          <div className="text-center text-secondary">
            基于
            <a
              href={NEXT_URL}
              target={'_blank'}
              rel="noreferrer"
              className="mx-1 underline underline-offset-2"
            >
              Nextjs
            </a>
            构建
          </div>
          <div className="text-center text-secondary">
            主题灵感来自
            <a
              href={NEXT_THEME_URL}
              target={'_blank'}
              rel="noreferrer"
              className="mx-1 underline underline-offset-2"
            >
              NexT
            </a>
            和
            <a
              href={NEXT_THEME_REFERENCE_URL}
              target={'_blank'}
              rel="noreferrer"
              className="mx-1 underline underline-offset-2"
            >
              tianxiaohu
            </a>
          </div>
        </div>
        <ul className="flex justify-center space-x-2 text-secondary">
          <li className="flex items-center justify-center space-x-2">
            <Image
              src={
                'data:image/png;base64,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'
              }
              width={18}
              height={18}
              alt="gongan"
            />

            <Link
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36100202000364"
              target="_blank"
              className="transition-all-in-one hover:text-zinc-800"
            >
              赣公网安备 36100202000364
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link
              href="https://beian.miit.gov.cn/"
              target="_blank"
              className="transition-all-in-one hover:text-zinc-800"
            >
              赣ICP备2022001411号
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
