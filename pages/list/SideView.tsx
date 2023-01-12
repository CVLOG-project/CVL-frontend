import React, { useState } from 'react';
import Image from 'next/image';

const SideMenu = () => {
  const [openedIdx, setOpenedIdx] = useState<number[]>(
    MOCK_LIST.map(({ id }) => id)
  );

  const onClickAccordion =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const hasId = openedIdx.some(storedId => storedId === id);
      if (hasId) setOpenedIdx(openedIdx.filter(storedId => storedId !== id));
      else setOpenedIdx([...openedIdx, id]);
    };

  return (
    <ul className="mr-4 rounded-md mt-14 bg-slate-800">
      {MOCK_LIST.map(({ id: folderId, name: folder, tags }) => {
        const isOpened = openedIdx.includes(folderId);

        return (
          <li
            key={folderId}
            className="w-[15rem] rounded-md shadow-md overflow-hidden"
          >
            <div
              className="flex justify-between p-2"
              id={folder}
              onClick={onClickAccordion(folderId)}
            >
              <span className="text-2xl">{folder}</span>
              <button>
                <Image
                  src="/images/arrow.png"
                  className={`duration-150 invert ${
                    isOpened ? '' : '-rotate-180'
                  }`}
                  alt="arrow"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <ul>
              {tags.map(({ id: tagId, name, postsCount }) => (
                <li
                  key={`${folderId}-${tagId}`}
                  className={` duration-150 ${
                    isOpened
                      ? 'p-2 bg-slate-900 shadow-[0_100px_60px_-15px_rgba(0,0,0,0.5)]'
                      : 'h-0'
                  }`}
                >
                  <a href="#" className="ml-2 text-slate-400">
                    {name}
                  </a>
                  <a className="m-3 ml-1 text-blue-300">({postsCount})</a>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default SideMenu;

const MOCK_LIST = [
  {
    id: 1,
    name: 'folder1',
    tags: [
      {
        id: 1,
        name: 'tag1',
        postsCount: 3,
      },
      {
        id: 2,
        name: 'tag2',
        postsCount: 1,
      },
    ],
    tagsCount: 2,
  },
  {
    id: 2,
    name: 'folder2',
    tags: [
      {
        id: 1,
        name: 'tag3',
        postsCount: 1,
      },
    ],
    tagsCount: 1,
  },
] as const;
