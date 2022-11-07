import { getAbout } from '@/common/services';
import MarkdownEditor from '@/components/MarkdownEditor';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import React from 'react';

type Props = {
  data: Awaited<ReturnType<typeof getAbout>>;
};

export const getServerSideProps: GetServerSideProps<Props, any> = async () => {
  const data = await getAbout();
  return {
    props: { data },
  };
};

const About: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const about = data.data;

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold">关于我</h2>
      <MarkdownEditor modelValue={about.content} previewOnly />
    </div>
  );
};

export default About;
