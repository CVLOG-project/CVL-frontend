import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[1]);

  return (
    <>
      <div className="flex justify-center w-full mt-2 ">
        <div className="flex items-center justify-center w-1/4 mt-2 text-2xl font-bold text-blue-700 md:w-1/2">
          <Link
            href={'/'}
            onClick={e => {
              setPage('About');
            }}
          >
            CVLOG
          </Link>
        </div>
        <div className="flex mt-3 bg-gray-900 rounded-full md:w-96">
          {menu.map((list: string) => (
            <Link href={`/${list.toLowerCase()}`}>
              <input
                type="button"
                className={`flex items-center justify-center flex-1 w-12 md:w-16 p-1 m-2 text-xs md:text-sm ${
                  page === list ? 'text-blue-700 ' : 'text-gray-400 '
                } hover:cursor-pointer hover:text-blue-700`}
                onClick={e => {
                  setPage(list);
                }}
                value={list}
              />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center w-1/4 mt-3 text-lg md:w-1/2">
          <Image
            src="/images/settings.png"
            alt="setting"
            className="w-4 ml-1 hover:cursor-pointer md:w-7"
            width={25}
            height={30}
          />
          <Image
            src="/images/notification.png"
            alt="alarm"
            className="w-4 ml-3 md:w-7 hover:cursor-pointer"
            width={23}
            height={30}
          />
          <Image
            src="/images/github.png"
            alt="github"
            className="w-6 ml-2 md:ml-1 md:w-10 hover:cursor-pointer"
            height={50}
            width={40}
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
