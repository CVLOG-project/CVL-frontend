import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocalStorage from 'public/utils/Localstorage';

const loginMethodArr = [
  {
    id: 1,
    name: 'Github',
    method: 'Github',
    image: '/images/github.svg',
  },
  {
    id: 2,
    name: 'Google',
    method: 'Google',
    image: '/images/google.png',
  },
  {
    id: 3,
    name: 'Naver',
    method: '네이버',
    image: '/images/naver.svg',
  },
  {
    id: 4,
    name: 'Kakao',
    method: '카카오',
    image: '/images/kakao.svg',
  },
];

const ButtonGroup = () => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;

  const hadleLogin = (loginMethod: string) => {
    if (accessToken) {
      return '/about';
    }
    switch (loginMethod) {
      case 'Github':
        return `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}`;
      case 'Google':
        // Google 로그인 처리
        return '/';
        break;
      case '네이버':
        // 네이버 로그인 처리
        return '/';
        break;
      case '카카오':
        // 카카오 로그인 처리
        return '/';
        break;
      default:
        return '/';
        break;
    }
  };

  return (
    <>
      {loginMethodArr.map(item => {
        return (
          <div
            key={item.id}
            className=" bg-bgWhite w-80 rounded-2xl lg:w-[473px] lg:h-20 flex font-bold border border-gray-300 m-1 items-center"
          >
            <div className="flex items-start w-full p-1 text-center">
              <Link
                className="flex justify-center w-full"
                href={hadleLogin(item.method)}
              >
                <div className="flex items-center justify-center w-12 h-12 m-2">
                  <Image
                    src={item.image}
                    alt={item.method}
                    width={44}
                    height={44}
                  />
                </div>
                <button className="w-3/4 text-xl text-black">
                  {item.method}로 시작하기
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    Start with {item.name}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-ftWhite ">
      <Image src={'/images/logo.png'} alt={'logo'} width={300} height={0} />
      <ButtonGroup />
      <span className="mt-2 text-xl font-medium text-gray-400">
        Guest 모드 시작하기
      </span>
      <span className="text-sm font-normal text-gray-400 ">
        Start with GuestMode
      </span>
    </div>
  );
};

export default Home;
