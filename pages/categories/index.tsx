import Link from 'next/link';
import React from 'react';

const Categories = () => {
  return (
    <div className="flex flex-col text-zinc-600">
      <h2 className="mb-10 text-2xl font-semibold text-zinc-700">分类</h2>
      <div className="flex items-center justify-center mb-10">
        目前共计<span className="inline-block px-1">3</span>个分类
      </div>
      <ul className="flex flex-col space-y-4 list-[circle]">
        {new Array(4).fill(1).map((_, i) => (
          <li key={i}>
            <Link
              href={`/categories/123123`}
              className="mr-2 underline transition-colors duration-300 underline-offset-4 hover:text-zinc-900"
            >
              {i}前端
            </Link>
            <span className="text-zinc-400">(20)</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
