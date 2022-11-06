import React from 'react';

const TagDetail = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-zinc-700 relative transition-colors duration-300 py-6 pl-4  after:absolute after:w-[6px] after:h-full after:left-0 after:top-0 after:bg-zinc-100 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10  border-zinc-200 before:top-1/2 before:-translate-y-1/2">
        web前端 <span className="text-lg text-zinc-300">标签</span>
      </h2>

      <ul className="flex flex-col text-zinc-600">
        <li className="relative transition-colors duration-300 py-6 pl-4 border-b after:absolute after:w-[6px] after:h-full after:left-0 after:top-0 after:bg-zinc-100 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10 border-dashed border-zinc-200 before:top-1/2 before:-translate-y-1/2   hover:border-zinc-800 hover:before:bg-zinc-800">
          09-25 React 中各种实现 Refs 的方式总结
        </li>
        <li className="relative transition-colors duration-300 py-6 pl-4 border-b after:absolute after:w-[6px] after:h-full after:left-0 after:top-0 after:bg-zinc-100 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 before:-left-0 before:z-10 border-dashed border-zinc-200 before:top-1/2 before:-translate-y-1/2   hover:border-zinc-800 hover:before:bg-zinc-800">
          09-25 React 中各种实现 Refs 的方式总结
        </li>
      </ul>
    </div>
  );
};

export default TagDetail;
