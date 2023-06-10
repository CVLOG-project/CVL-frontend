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
      <div className="flex justify-between w-full pl-10 pr-10 font-bold rounded-lg ">
        {loginMethodArr.map(item => {
          return (
            <div key={item.id}>
              <Link
                className="flex justify-center w-full"
                href={hadleLogin(item.method)}
              >
                <div className="flex items-center justify-center m-2">
                  {item.image}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center h-screen w-96">
          <Shared.LogmeText
            type="caption"
            fontStyle="regular"
            style={{ color: '#D1D8DE', textAlign: 'left' }}
            className="mb-4 mr-auto"
          >
            The Ultimate
            <br /> Developer Blogging Platform
            <br /> Powered by Markdown
          </Shared.LogmeText>
          <Shared.LogmeIcon.NewLogo
            alt={'logo'}
            width={400}
            height={120}
            cn="text-center mb-8"
          />
          <ButtonGroup />
          <span className="mt-2 text-lg font-medium text-gray-400"></span>
          <Shared.LogmeText
            type="caption"
            fontStyle="bold"
            style={{ color: '#788699', textAlign: 'center' }}
          >
            게스트 모드 시작하기 <br />
            Start with Guest Mode
          </Shared.LogmeText>
        </div>
      </div>
    </>
  );
};

export default Home;
