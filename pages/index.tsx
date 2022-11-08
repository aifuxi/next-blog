import { formatTime } from '@/utils/time';
import {
  FaCalendarAlt,
  FaFolderOpen,
  FaAngleDoubleRight,
  FaTags,
  FaEye,
} from 'react-icons/fa';
import { findManyPosts } from '@/common/services';
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next';
import Link from 'next/link';
import { formatNumber } from '@/utils/number';
import { CATEGORY_URL, POST_URL, TAG_URL } from '@/common/constants/path';

type Props = {
  data: Awaited<ReturnType<typeof findManyPosts>>;
};

export const getServerSideProps: GetServerSideProps<Props, any> = async () => {
  const data = await findManyPosts({ limit: 1000, offset: 0 });
  return {
    props: { data: data },
  };
};

const Index: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const posts = data.data.lists || [];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="flex flex-col space-y-4">
          {/* 标题 */}
          <Link href={`${POST_URL}/${post.id}`}>
            <h2 className="inline-block pt-4 text-2xl font-medium relative after:absolute hover:text-zinc-800  after:w-0 after:z-10 after:bg-zinc-600 hover:after:w-full after:h-0.5  after:left-1/2 after:bottom-0  hover:after:left-0 after-transition-all-in-one">
              {post.title}
            </h2>
          </Link>

          <div className="flex flex-row items-center h-6 text-size-small">
            {/* 是否原创 */}
            <div className="flex items-center justify-center mr-2 text-xs px-0.5 text-white  bg-zinc-500">
              原创
            </div>

            {/* 发布时间/更新时间 */}
            <div className="flex items-center justify-center h-full space-x-1 text-secondary text-size-small">
              <FaCalendarAlt />
              <span className="inline-flex items-center h-full">
                {formatTime(post.createdAt)}
              </span>
            </div>

            {/* 分类 */}
            <div className="flex items-center text-secondary">
              {post.categories?.length ? (
                <>
                  <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
                  <FaFolderOpen className="mr-2 " />
                </>
              ) : null}
              {post.categories?.map((v) => (
                <Link
                  href={`${CATEGORY_URL}/${post.id}`}
                  key={v.id}
                  className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800"
                >
                  {v.name}
                </Link>
              ))}
            </div>

            {/* 标签 */}
            <div className="flex items-center text-secondary">
              {post.tags?.length ? (
                <>
                  <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
                  <FaTags className="mr-2" />
                </>
              ) : null}
              {post.tags?.map((v) => (
                <Link
                  href={`${TAG_URL}/${post.id}`}
                  key={v.id}
                  className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800"
                >
                  {v.name}
                </Link>
              ))}
            </div>

            {/* 阅读数 */}
            <div className="flex items-center text-secondary">
              <span className="inline-block w-[1px] h-3 mx-4 bg-zinc-400"></span>
              <FaEye className="mr-2" />
              <span className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-800">
                {formatNumber(post.view)}
              </span>
            </div>
          </div>

          {/* 描述 */}
          <p className="leading-6 text-size-small ">{post.description}</p>

          {/* 阅读全文 */}
          <div className="inline-block pb-6 border-b border-b-zinc-100">
            <Link
              href={`${POST_URL}/${post.id}`}
              className="px-1.5 inline-flex justify-center items-center space-x-1 py-1 border  text-size-small bg-white border-zinc-300 hover:text-white hover:border-zinc-800 hover:bg-zinc-800 transition-all-in-one"
            >
              <span>阅读全文</span>
              <FaAngleDoubleRight />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Index;
