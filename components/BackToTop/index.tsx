import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import cs from 'classnames';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.document.documentElement.scrollTop > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    window.document.addEventListener('scroll', handleScroll);
    return () => {
      window.document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* 回到顶部 */}
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        title="回到顶部"
        className={cs(
          'fixed z-[2] flex flex-col items-center justify-center p-2  border rounded shadow-2xl cursor-pointer right-4 bottom-36 lg:bottom-8 bg-zinc-100',
          {
            hidden: !visible,
          }
        )}
      >
        <FaArrowUp className="text-xl md:text-2xl" />
      </div>
    </>
  );
};

export default BackToTop;
