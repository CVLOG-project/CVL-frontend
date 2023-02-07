import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { useGetUserInfo } from 'hooks/Login';
import { accessTokenAtom } from 'recoil/atoms/atoms';
import Alarm from './Alarm';
import MobileNav from './MobileNav';
axios.defaults.withCredentials = true;

const Nav = () => {
  const [localToken, setLocalToken] = useRecoilState<string | boolean>(
    accessTokenAtom
  );

  const navLocalToken =
    typeof window !== 'undefined' ? window.localStorage.getItem('CVtoken') : '';
  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[1]);
  const getUserInfo = useGetUserInfo(navLocalToken as string);
  // 로그아웃
  const signOut = () => {
    //쿠키 삭제
    const deleteCookie = function (name: string) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    };
    deleteCookie('refreshToken');
    localStorage.removeItem('CVtoken');
    setLocalToken(false);
    axios
      .get('https://d682-211-106-114-186.jp.ngrok.io/auth/logout', {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      })
      .then(() => alert('로그아웃 되셨습니다.'));
  };

  return (
    <>
      <div className="flex items-center justify-between w-full pt-2 sm:justify-evenly bg-bgWhite">
        <div className="flex items-center justify-center w-1/6 text-ftWhite sm:hidden invert">
          <Image src="/images/lens.png" width={20} height={20} alt="돋보기" />
        </div>
        <div className="flex items-center justify-center w-24 text-3xl font-bold text-blue-700 xl:text-[32px] sm:text-3xl md:w-20 sm:mt-4 lg:w-32">
          <Link
            href={'/'}
            onClick={() => {
              setPage('Article');
            }}
          >
            CVLOG
          </Link>
        </div>
        <div className="items-center hidden h-6 p-3 mt-2 rounded-full bg-gray-200/80 sm:flex justify-evenly md:w-96 sm:mt-4 md:p-4 lg:p-6">
          {menu.map((list: string) => (
            <Link key={list} href={`/${list.toLowerCase()}`}>
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
        <div className="flex justify-center w-1/6 sm:mt-3 md:hidden md:w-base invert">
          <MobileNav />
        </div>
        <div className="hidden mt-4 ml-1 md:flex md:w-32 lg:w-32 ">
          <Link
            href={`${localToken ? '/mypage' : '/'}`}
            onClick={() => !localToken && alert('로그인 먼저 해주세요.')}
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
                      localToken ? 'animate-ping' : 'hidden'
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
            {localToken ? (
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img={`${
                      localToken && getUserInfo.data
                        ? getUserInfo.data.profile_image
                        : '/images/github.png'
                    }`}
                    size="sm"
                    rounded={true}
                    className="lg:ml-1"
                  />
                }
              >
                <Dropdown.Header className="flex justify-center w-40 m-1 mr-5 overflow-hidden text-black">
                  {localToken && getUserInfo.data
                    ? getUserInfo.data.github_id
                    : '아이디가 없어요'}
                </Dropdown.Header>
                <Dropdown.Header className="flex justify-center w-40 m-1 mr-5 overflow-hidden text-black">
                  {localToken && getUserInfo.data
                    ? getUserInfo.data.name + '님 환영합니다'
                    : ''}
                </Dropdown.Header>
                <Dropdown.Item className="flex justify-center">
                  <div onClick={() => signOut()}>로그아웃</div>
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <div
                className="px-2 mt-1 border border-black rounded-lg text-ftBlick md:ml-1 text-md md:mt-0 md:text-lg hover:opacity-80 hover:cursor-pointer"
                onClick={() => setLocalToken(true)}
              >
                <a
                  href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}`}
                >
                  Join
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
