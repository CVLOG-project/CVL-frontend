import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import * as Shared from 'components/Shared';
import Cookie from 'public/utils/Cookie';
import LocalStorage from 'public/utils/Localstorage';
import { accessTokenAtom, refreshTokenAtom } from 'service/atoms/atoms';
import { UserId } from 'service/atoms/type';
import Alarm from './Alarm';
import MobileNav from './MobileNav';
import NavPriofile from './Profile';
axios.defaults.withCredentials = true;

const Nav = () => {
  const menu = ['ABOUT', 'ARTICLE', 'RESUME', 'GITHUB'];
  const [page, setPage] = useState(menu[0]);
  const [authority, setAuthority] = useState<boolean>(false);
  const router = useRouter();

  //nav바
  const urlHasAbout = router.asPath.includes('about');
  const urlHasArticle = router.asPath.includes('article');
  const urlHasResume = router.asPath.includes('resume');
  const urlHasGithub = router.asPath.includes('github');
  useEffect(() => {
    if (urlHasAbout) {
      setPage('ABOUT');
    } else if (urlHasArticle) {
      setPage('ARTICLE');
    } else if (urlHasResume) {
      setPage('RESUME');
    } else if (urlHasGithub) {
      setPage('GITHUB');
    }
  }, [router.asPath]);

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
    <header className="relative flex items-center justify-center w-full bg-white shadow-lg shadow-gray-200">
      <div className="flex justify-between w-full my-3">
        <div className="flex items-center justify-center w-1/6 text-ftWhite sm:hidden invert ">
          <Shared.LogmeIcon.LensIcon
            alt={'돋보기'}
            width={20}
            height={20}
            cn={'hover:cursor-not-allowed'}
            onClick={() => alert('v1.1에서 만나요 🥰')}
          />
        </div>
        <div className="flex items-center justify-center w-1/6 sm:justify-start sm:ml-10">
          <Link
            href={'/about'}
            onClick={() => {
              setPage('About');
            }}
          >
            <Shared.LogmeIcon.SymbolLogoIcon
              alt={'로고'}
              width={60}
              height={30}
            />
          </Link>
        </div>
        <div className="items-center hidden h-6 p-3 rounded-full sm:flex justify-evenly md:w-96 sm:mt-3 md:p-4 lg:p-6">
          {menu.map((list: string) => (
            <Link
              key={list}
              href={`/${
                list === 'Article' && localAccessToken === null
                  ? ''
                  : list.toLowerCase()
              }`}
              onClick={() => {
                list === 'Article' &&
                  localAccessToken === null &&
                  alert('로그인 먼저 해주세요.');
              }}
              className={`${
                list !== 'GITHUB' ? 'border-r' : ''
              } border-gray-200 `}
            >
              <input
                type="button"
                className={`flex  items-center justify-center text-sm md:text-md px-7 font-bold  ${
                  page === list ? 'text-ftBlue ' : 'text-gray-400 '
                } hover:cursor-pointer hover:text-ftBlue `}
                onClick={() => {
                  setPage(list);
                }}
                value={list}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center w-1/6  lg:hidden md:w-base invert z-[999] items-center">
          <MobileNav />
        </div>
        <div className="items-center justify-end hidden w-1/6 mr-10 lg:flex ">
          <Link
            href={`${authority ? '/mypage' : '/'}`}
            onClick={() => !authority && alert('로그인 먼저 해주세요.')}
          >
            <Shared.LogmeIcon.SettingsIcon
              alt={'설정'}
              width={23}
              height={22}
            />
          </Link>
          <div className="flex items-center justify-center mt-1 md:mx-1 hover:opacity-80 md:w-8 invert">
            <Dropdown
              className="items-center "
              arrowIcon={false}
              inline={true}
              label={
                <div className="flex items-center justify-center ">
                  <Shared.LogmeIcon.NotificationIcon
                    alt={'알람'}
                    width={25}
                    height={25}
                    cn="ml-2 mb-1"
                  />
                </div>
              }
            >
              {/* <Alarm /> */}
            </Dropdown>
          </div>
          <div className="ml-1">
            {authority && localAccessToken !== null ? (
              <NavPriofile setAuthority={setAuthority} />
            ) : (
              <Link href={'/'}>
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
      </div>
    </header>
  );
};

export default Nav;

const recoilLocalStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: recoilLocalStorage,
});

export const userIdAtom = atom<UserId>({
  key: 'userId',
  default: { id: 999999 },
  effects_UNSTABLE: [persistAtom],
});
