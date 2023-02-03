import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown } from 'flowbite-react';
import Link from 'next/link';

const MobileNav = () => {
  //FIXME 로컬 토큰

  const menu = ['About', 'Article', 'Resume', 'Github'];
  const [page, setPage] = useState(menu[1]);

  //FIXME 로컬 토큰
  const [localToken, setLocalToken] = useState<boolean | string>(false);
  useEffect(() => {
    const accessToken = localStorage.getItem('CVtoken');
    if (accessToken) {
      setLocalToken(accessToken);
    }
  }, []);

  //로그아웃
  const signOut = () => {
    localStorage.removeItem('CVtoken');
    setLocalToken(false);
  };

  //통신

  // const { isLoading, isError, error, data } = useQuery('login', () =>
  //   axios(`http://10.58.52.199:8000/user`, {
  //     headers: { Authorization: 'accessToken' },
  //   })
  // );
  // const info = data?.data;
  // console.log(localToken);

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
              img={`${localToken ? 'images/lens.png' : '/images/github.png'}`}
              size="sm"
              rounded={true}
            />
            <div className="flex items-end w-16 ml-2 text-[10px]">
              {/* {userId ? userId.userId : '아이디가 없어요'} */}
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
              setLocalToken(false);
              signOut();
            }}
            className="flex justify-center"
          >
            <Link href={'/'}>Sign Out</Link>
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            onClick={() => setLocalToken(true)}
            className="flex justify-center"
          >
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=${process.env.URL}`}
            >
              <div>Sign In</div>
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
