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

  const handleToggleMenu = () => {
    setMenu((v) => !v);
  };

  useEffect(() => {
    const fetchCountData = async () => {
      const { data } = await getStatisticsCount();
      setCountData(data);
    };

    const fetchProfile = async () => {
      const { data } = await getProfile();
      setProfile(data);
      window.document.title = data.author ? `${data.author}的博客` : BLOG_TITLE;
    };

    fetchCountData();
    fetchProfile();
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  return (
    <div className="w-full h-full min-h-screen bg-white lg:bg-zinc-50">
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

          <div className="sticky flex-col items-center hidden px-3 py-5 bg-white shadow-lg top-4 lg:flex">
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
              <li className="flex flex-col items-center justify-center px-4">
                <span className="text-base font-bold text-zinc-800">
                  {countData.postCount}
                </span>
                <span className="text-size-small">文章</span>
              </li>
              <li className="flex flex-col items-center justify-center px-4 border-l border-r">
                <span className="text-base font-bold text-zinc-800">
                  {countData.postCategoryCount}
                </span>
                <span className="text-size-small">分类</span>
              </li>
              <li className="flex flex-col items-center justify-center px-4">
                <span className="text-base font-bold text-zinc-800">
                  {countData.postTagCount}
                </span>
                <span className="text-size-small">标签</span>
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
        </aside>
      </main>

      <footer className="pt-16 pb-6 text-xs ">
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
        <div className="text-center text-secondary">{`Copyright © ${thisYear} ${author} All rights reserved.`}</div>
      </footer>
    </div>
  );
};

export default Layout;
