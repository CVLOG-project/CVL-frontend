import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import LocalStorage from 'public/utils/Localstorage';
import { userInfoAtom } from './Profile';

const MobileNav = () => {
  const user = useRecoilValue(userInfoAtom);

  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[0]);

  //FIXME 로컬 토큰
  const accessToken = LocalStorage.getItem('CVtoken');

  //로그아웃
  const signOut = () => {
    if (window.confirm('로그아웃 하십니까?')) {
      axios
        .get('https://d682-211-106-114-186.jp.ngrok.io/auth/logout', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => alert('로그아웃 되셨습니다.'));
      //쿠키 삭제
      const deleteCookie = function (name: string) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
      };
      deleteCookie('refreshToken');

      localStorage.removeItem('CVtoken');
      sessionStorage.removeItem('recoil-persi st');
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  };

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img="/images/more.png" size="xs" />}
      className="invert"
    >
      {accessToken && accessToken !== null && (
        <Dropdown.Header>
          <div className="flex flex-col">
            <Avatar
              alt="User settings"
              img={`${
                user && user.data
                  ? user.data?.profile_image
                  : '/images/github.png'
              }`}
              size="sm"
              rounded={true}
            />
            <div className="flex items-end w-16 ml-2 text-[10px]">
              {user && user.data ? user.data?.github_id : '아이디가 없어요'}
            </div>
            <div className="flex items-end w-16 ml-2 text-[10px]">
              {user && user.data ? user.data?.name + '님 환영합니다' : ''}
            </div>
          </div>
        </Dropdown.Header>
      )}
      {menu.map((list: string) => (
        <Link
          key={list}
          href={`/${list !== 'About' ? list.toLowerCase() : ''}`}
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
        {accessToken && accessToken !== null ? (
          <Dropdown.Item
            onClick={() => {
              signOut();
            }}
            className="flex justify-center"
          >
            <Link href={'/'}>로그아웃</Link>
          </Dropdown.Item>
        ) : (
          <Dropdown.Item className="flex justify-center">
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
              accessToken && accessToken !== null ? 'animate-ping' : 'hidden'
              //FIXME 알람 구현 시 수정 localToken =>localToken && alarmData
            }`}
          ></div>
        </Dropdown.Item>
        <Dropdown.Item className="flex justify-center">
          <Link
            href={`${accessToken ? '/mypage' : '/'}`}
            onClick={() => !accessToken && alert('로그인 먼저 해주세요.')}
          >
            Setting
          </Link>
        </Dropdown.Item>
      </div>
    </Dropdown>
  );
};

export default MobileNav;
