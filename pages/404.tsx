import { HOME_URL } from '@/common/constants/path';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Page404: NextPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Image
          width={400}
          height={400}
          src="/404.svg"
          alt="404 page not found"
        />
      </div>
      <p className="tracking-widest text-center ">
        从前有座山，
        <br />
        山里有座庙。
        <br />
        庙里有个页面，
        <br />
        我现在找不到...
        <br />
        <br />
        <span>
          我找
          <Link
            href={HOME_URL}
            className="mx-2 font-semibold underline underline-offset-4 text-zinc-800"
          >
            首页
          </Link>
          去...
        </span>
      </p>
    </>
  );
};

export default Page404;
