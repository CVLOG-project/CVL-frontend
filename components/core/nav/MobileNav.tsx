import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { useGetUserInfo } from 'hooks/Login';
import { accessTokenAtom } from 'recoil/atoms/atoms';

const MobileNav = () => {
  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[1]);

  const navLocalToken =
    typeof window !== 'undefined' ? window.localStorage.getItem('CVtoken') : '';
  const getUserInfo = useGetUserInfo(navLocalToken as string);

  //FIXME 로컬 토큰
  const [localToken, setLocalToken] = useRecoilState<string | boolean>(
    accessTokenAtom
  );

  //로그아웃
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
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img="/images/more.png" size="xs" />}
      className="invert"
    >
      {localToken && (
        <Dropdown.Header>
          <div className="flex flex-col">
            <Avatar
              alt="User settings"
              //FIXME 통신 후 수정
              img={`${
                localToken && getUserInfo.data
                  ? getUserInfo.data.profile_image
                  : '/images/github.png'
              }`}
              size="sm"
              rounded={true}
            />
            <div className="flex items-end w-16 ml-2 text-[10px]">
              {localToken && getUserInfo.data
                ? getUserInfo.data.github_id
                : '아이디가 없어요'}
            </div>
            <div className="flex items-end w-16 ml-2 text-[10px]">
              {localToken && getUserInfo.data
                ? getUserInfo.data.name + '님 환영합니다'
                : ''}
            </div>
          </div>
        </Dropdown.Header>
      )}
      {menu.map((list: string) => (
        <Link
          key={list}
          href={`/${list.toLowerCase()}`}
          className="flex justify-center px-4 py-1"
        >
          <input
            type="button"
            className={`flex  ${
              page === list ? 'text-blue-700 ' : 'text-gray-400 '
            } hover:cursor-pointer hover:text-blue-700 `}
            onClick={() => {
              setPage(list);
            }}
            value={list}
          />
        </Link>
      ))}
      <div className="flex flex-col justify-center w-28 ">
        {localToken ? (
          <Dropdown.Item
            //FIXME 통신 후 삭제
            onClick={() => {
              signOut();
            }}
            className="flex justify-center"
          >
            <Link href={'/'}>로그아웃</Link>
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            onClick={() => setLocalToken(true)}
            className="flex justify-center"
          >
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}`}
            >
              <div>로그인</div>
            </a>
          </Dropdown.Item>
        )}
        <Dropdown.Item className="flex justify-center">
          Alarm
          <div
            className={`w-2 h-2 mb-4  bg-blue-700 rounded-full ${
              localToken ? 'animate-ping' : 'hidden'
              //FIXME 알람 구현 시 수정 localToken =>localToken && alarmData
            }`}
          ></div>
        </Dropdown.Item>
        <Dropdown.Item className="flex justify-center">
          <Link
            href={`${localToken ? '/mypage' : '/'}`}
            onClick={() => !localToken && alert('로그인 먼저 해주세요.')}
          >
            Setting
          </Link>
        </Dropdown.Item>
      </div>
    </Dropdown>
  );
};

export default MobileNav;
