import React from 'react';
import { TagType } from 'pages/article/content/[pid]';

const Tag = ({ id, name }: TagType) => {
  return (
    <div className="flex justify-start px-2 py-1 m-0.5 text-xs bg-blue-400 cursor-pointer md:text-base md:px-3 md:p-1 rounded-xl hover:opacity-70">
      {name}
    </div>
  );
};

export default Tag;
