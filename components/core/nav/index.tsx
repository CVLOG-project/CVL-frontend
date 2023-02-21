import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { accessTokenAtom, refreshTokenAtom } from 'public/recoil/atoms/atoms';
import Cookie from 'public/utils/Cookie';
import LocalStorage from 'public/utils/Localstorage';
import Alarm from './Alarm';
import MobileNav from './MobileNav';
import NavPriofile from './Profile';
axios.defaults.withCredentials = true;

const Nav = () => {
  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[0]);
  const [authority, setAuthority] = useState<boolean>(false);

  //토큰 전역처리
  const localAccessToken = LocalStorage.getItem('CVtoken');
  const localRefreshToken = Cookie.getItem('refreshToken');
  const [, setAccessToken] = useRecoilState(accessTokenAtom);
  const [, setRefreshToken] = useRecoilState(refreshTokenAtom);

  if (!localAccessToken && !localRefreshToken) {
    setAccessToken(localAccessToken as string);
    setRefreshToken(localRefreshToken as string);
  }

  useEffect(() => {
    if (localAccessToken && localAccessToken !== null) {
      setAuthority(true);
    }
  }, [localAccessToken]);

  //FIXME 필터 연결
  // const tagSearch = () => {
  //   const tag = window.prompt(
  //     '태그를 입력해주세요. ex) JAVA, java, JAVASCRIPT....',
  //     ''
  //   );
  // };

  return (
    <header className="flex items-center justify-between w-full pt-2 sm:justify-evenly bg-bgWhite">
      <div className="flex items-center justify-center w-1/6 text-ftWhite sm:hidden invert">
        <Image
          src="/images/lens.png"
          width={20}
          height={20}
          alt="돋보기"
          // onClick={() => tagSearch()}
        />
      </div>
      <div className="flex items-center justify-center w-24 text-2xl md:text-3xl font-bold text-blue-700 xl:text-[32px] md:w-28 sm:mt-4 lg:w-32">
        <Link
          href={'/'}
          onClick={() => {
            setPage('About');
          }}
        >
          CVLOG
        </Link>
      </div>
      <div className="items-center hidden h-6 p-3 mt-2 rounded-full bg-gray-200/80 sm:flex justify-evenly md:w-96 sm:mt-4 md:p-4 lg:p-6">
        {menu.map((list: string) => (
          <Link
            key={list}
            href={`/${list !== 'About' ? list.toLowerCase() : ''}`}
          >
            <input
              type="button"
              className={`flex  items-center justify-center text-xs md:text-sm p-2 ${
                page === list ? 'text-blue-700 ' : 'text-gray-400 '
              } hover:cursor-pointer hover:text-ftBlue `}
              onClick={() => {
                setPage(list);
              }}
              value={list}
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center w-1/6 sm:mt-3 md:hidden md:w-base invert z-[999]">
        <MobileNav />
      </div>
      <div className="hidden mt-4 ml-1 md:flex md:w-32 lg:w-32 ">
        <Link
          href={`${authority ? '/mypage' : '/'}`}
          onClick={() => !authority && alert('로그인 먼저 해주세요.')}
        >
          <Image
            src="/images/settings.png"
            alt="setting"
            className="w-[23px] h-[22px] mt-[5px] mr-1 hover:opacity-80 hover:cursor-pointer hover:animate-spin invert"
            width={10}
            height={15}
          />
        </Link>
        <div className="mt-1 md:mx-1 hover:opacity-80 md:w-8 invert">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <>
                <Avatar
                  alt="User alarm"
                  img="/images/notification.png"
                  size="xs"
                  rounded={true}
                  className="translate-x-2"
                />
                <div
                  className={`w-2 h-2 mb-4  bg-yellow-700 rounded-full ${
                    authority ? 'animate-ping' : 'hidden'
                    //FIXME 알람 구현 시 수정 localToken => localToken && alarmData
                  }`}
                ></div>
              </>
            }
          >
            <Alarm />
          </Dropdown>
        </div>
        <div className="ml-1">
          {authority ? (
            <NavPriofile setAuthority={setAuthority} />
          ) : (
            <Link
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}`}
            >
              <div
                onClick={() => {
                  setAuthority(true);
                }}
                className="px-2 mt-1 border border-black rounded-lg text-ftBlick md:ml-1 text-md md:mt-0 md:text-lg hover:opacity-80 hover:cursor-pointer"
              >
                Join
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
