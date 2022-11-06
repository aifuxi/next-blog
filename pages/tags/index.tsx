import Link from 'next/link';
import React from 'react';
import { FaTag } from 'react-icons/fa';

const Tags = () => {
  return (
    <div className="flex flex-col text-zinc-600">
      <h2 className="mb-10 text-2xl font-semibold text-zinc-700">标签</h2>
      <div className="flex items-center justify-center mb-10">
        目前共计<span className="inline-block px-1">3</span>个标签
      </div>
      <ul className="flex flex-row list-none">
        {new Array(4).fill(1).map((_, i) => (
          <li key={i}>
            <Link
              href={`/tags/123123`}
              className="inline-flex items-center justify-center px-2 py-0.5 text-xs mr-4 space-x-2 transition-colors duration-300 border bg-zinc-50 "
            >
              <span>{i}前端</span>
              <FaTag />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
