import { POST_URL } from '@/common/constants/path';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MdEditor from 'md-editor-rt';
import { isMobile } from '@/utils/os';
import { EDITOR_ID } from '@/common/constants/markdown';

// 文章目录
const Catalog = () => {
  const { pathname } = useRouter();
  const [element, setElement] = useState<HTMLElement>();
  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    // SSR模式，一开始在服务器渲染的拿不到window对象和document，在组件挂载后再设置就行了
    setElement(window.document.documentElement);
    setIsPC(!isMobile());
  }, []);

  // 只有文章详情且不是移动端才显示目录
  if (pathname.includes(POST_URL) && isPC) {
    return (
      <div className="sticky bg-white px-3 py-5 shadow-lg top-[420px] ">
        <MdEditor.MdCatalog
          // pathname每次改变，key都不同，这样每次MdCatalog都会重新渲染，每次都是最新的文章的目录
          key={pathname}
          editorId={EDITOR_ID}
          scrollElement={element}
        />
      </div>
    );
  }

  return null;
};

export default Catalog;
