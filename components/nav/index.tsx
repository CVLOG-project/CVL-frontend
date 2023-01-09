import React, { useState } from 'react';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, Dropdown } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import Phone from './Phone';
import Alarm from './Alarm';

const Nav = () => {
  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[1]);
  const { data: result } = useSession();

  //FIXME 로컬 토큰
  const [localToken, setLocalToken] = useState(false);

  //FIXME 백엔드 통신 대비
  // const csrfToken = getCsrfToken();
  // console.log(csrfToken);

  return (
    <>
      <div className="flex w-full mt-2 justify-evenly ">
        <div className="flex items-center justify-center mt-2 text-2xl font-bold text-blue-700 md:w-20">
          <Link
            href={'/'}
            onClick={() => {
              setPage('Article');
            }}
          >
            CVLOG
          </Link>
        </div>
        <div className="flex mt-3 bg-gray-900 rounded-full justify-evenly md:w-96">
          {menu.map((list: string, index) => (
            <Link href={`/${list.toLowerCase()}`} key={index}>
              <input
                type="button"
                className={`flex  items-center justify-center flex-1 w-12 h-4 md:h-8 md:w-16 md:p-1 m-3 md:m-2 text-xs md:text-sm ${
                  page === list ? 'text-blue-700 ' : 'text-gray-400 '
                } hover:cursor-pointer hover:text-blue-700 h-4`}
                onClick={() => {
                  setPage(list);
                }}
                value={list}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center w-1/6 mt-4 md:hidden md:w-base">
          <Phone />
        </div>
        <div className="hidden mt-4 ml-1 md:flex ">
          <Image
            src="/images/settings.png"
            alt="setting"
            className="w-6 h-6 mt-1 mr-1 hover:opacity-80 hover:cursor-pointer"
            width={10}
            height={15}
          />
          <div className="mt-1 md:mx-1 hover:opacity-80 ">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User alarm"
                  img={`${
                    result && localToken
                      ? '/images/alarm.png'
                      : '/images/notification.png'
                  }`}
                  size="xs"
                  rounded={true}
                />
              }
            >
              <Alarm />
            </Dropdown>
          </div>
          <div className="ml-1">
            {!result && (
              <div
                className="px-2 mt-1 border border-white rounded-lg md:ml-1 text-md md:mt-0 md:text-lg hover:opacity-80 hover:cursor-pointer"
                onClick={() => signIn('Github')}
              >
                Join
              </div>
            )}
            {result?.user && (
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img={`${result.user.image}`}
                    size="sm"
                    rounded={true}
                  />
                }
              >
                <Dropdown.Item
                  onClick={() => signOut()}
                  className="flex justify-center"
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
