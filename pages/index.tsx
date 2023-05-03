import React from 'react';
import Link from 'next/link';
import * as Shared from 'components/Shared';
import LocalStorage from 'public/utils/Localstorage';

const loginMethodArr = [
  {
    id: 1,
    name: 'Github',
    method: 'Github',
    image: <Shared.LogmeIcon.GithubIcon alt="Github" width={44} height={44} />,
  },
  {
    id: 2,
    name: 'Google',
    method: 'Google',
    image: <Shared.LogmeIcon.GoogleIcon alt="Google" width={44} height={44} />,
  },
  {
    id: 3,
    name: 'Naver',
    method: '네이버',
    image: <Shared.LogmeIcon.NaverIcon alt="Naver" width={44} height={44} />,
  },
  {
    id: 4,
    name: 'Kakao',
    method: '카카오',
    image: <Shared.LogmeIcon.KakaoIcon alt="KaKao" width={44} height={44} />,
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
            className="flex items-center mt-1 font-bold border border-gray-300 rounded-lg bg-bgWhite w-96 2xl:h-20 2xl:w-[480px]"
          >
            <div className="flex items-start w-full p-1 text-center">
              <Link
                className="flex justify-center w-full"
                href={hadleLogin(item.method)}
              >
                <div className="flex items-center justify-center m-2">
                  {item.image}
                </div>
                <button
                  className={'w-3/4 text-xl text-black md:text-lg 2xl:text-lg'}
                >
                  {item.method}로 시작하기
                  <br />
                  <span className="hidden font-normal text-gray-400 2xl:text-base md:block">
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
      <Shared.LogmeIcon.LogoIcon
        alt={'logo'}
        width={300}
        height={0}
        cn={'w-48 mb-2 text-center 2xl:w-60'}
      />
      <ButtonGroup />
      <span className="mt-2 text-lg font-medium text-gray-400">
        Guest 모드 시작하기
      </span>
      <span className="hidden mb-10 text-sm font-normal text-gray-400 md:block xl:text-xm">
        Start with GuestMode
      </span>
    </div>
  );
};

export default Home;
