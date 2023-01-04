import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, Dropdown } from 'flowbite-react';

const Nav = () => {
  ``;
  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[1]);

  return (
    <>
      <div className="flex w-full mt-2 justify-evenly ">
        <div className="flex items-center justify-center mt-2 text-2xl font-bold text-blue-700 md:w-20">
          <Link
            href={'/'}
            onClick={e => {
              setPage('About');
            }}
          >
            CVLOG
          </Link>
        </div>
        <div className="flex mt-3 bg-gray-900 rounded-full justify-evenly md:w-96">
          {menu.map((list: string) => (
            <Link href={`/${list.toLowerCase()}`}>
              <input
                type="button"
                className={`flex items-center justify-center flex-1 w-12 h-3 md:h-8 md:w-16 md:p-1 m-3 md:m-2 text-xs md:text-sm ${
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
        <div className="flex mt-4 ml-1">
          <Image
            src="/images/settings.png"
            alt="setting"
            className="w-6 h-6 mt-1 mr-1"
            width={15}
            height={20}
          />
          <div className="mt-1 ml-1">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="/images/alarm.png"
                  //FIXME img="/images/notification.png" 동적으로 바뀔예정
                  size="xs"
                  rounded={true}
                />
              }
            >
              <Dropdown.Item>알람1</Dropdown.Item>
              <Dropdown.Item>알람2</Dropdown.Item>
              <Dropdown.Item>알람3</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="ml-1">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="/images/github.png"
                  size="sm"
                  rounded={true}
                />
              }
            >
              <Dropdown.Item>로그인</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
