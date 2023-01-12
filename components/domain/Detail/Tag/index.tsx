import React from 'react';

const Tag = () => {
  return (
    <>
      {TAG_DATA.map(tag => (
        <div
          key={tag.id}
          className="flex justify-start px-2 m-0.5 text-xs bg-gray-700 cursor-pointer md:text-base md:px-3 md:p-1 rounded-xl hover:opacity-70"
        >
          {tag.title}
        </div>
      ))}
    </>
  );
};

export default Tag;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const TAG_DATA = [
  { id: 1, title: 'java' },
  { id: 2, title: 'javascript' },
  { id: 3, title: 'typescript' },
  { id: 4, title: 'css' },
  { id: 5, title: 'redux' },
  { id: 6, title: 'recoil' },
  { id: 7, title: 'tailwind' },
  { id: 8, title: 'next' },
  { id: 9, title: 'recoil' },
  { id: 10, title: 'svelt' },
];
