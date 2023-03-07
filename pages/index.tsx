import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocalStorage from 'public/utils/Localstorage';

const Home = () => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;

  return (
    <div className="lg:px-16 ">
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-blue-900 bg-gradient-to-b from-gray-900 to-blue-600"></div>
      <div className="flex flex-col justify-center min-h-screen bg-transparent lg:flex-row rounded-3xl">
        <div className="z-10 flex flex-col self-center lg:pr-24 sm:max-w-4xl ">
          <div className="flex flex-col self-start mb-5 text-ftWhite lg:mb-0">
            <h1 className="my-3 text-xl font-semibold text-center lg:text-left lg:text-4xl xl:text-5xl w-80 lg:w-full lg:mb-10">
              Welcome to Logme
            </h1>
            <p className="flex font-serif text-xs text-center opacity-75 lg:pr-3 lg:text-lg w-80 lg:w-full lg:text-left">
              Welcome to our blog, where we share knowledge and experiences in
              web development and programming, and collaborate to grow together.
            </p>
            <p className="hidden pr-3 font-serif text-lg opacity-75 lg:flex">
              Here, you can find the latest technologies and ideas, and connect
              with other developers to exchange expertise and best practices. We
              strive to maintain an open atmosphere where everyone can
              contribute, share programming knowledge, and brainstorm innovative
              ideas. We are committed to supporting the growth of all developers
              through our blog.
            </p>
            <p className="hidden pr-3 text-lg opacity-75 lg:flex">
              웹 개발 및 프로그래밍 분야에서 함께 성장할 수 있는 블로그에 오신
              것을 환영합니다. 우리 블로그는 최신 기술과 아이디어를 공유하며,
              개발자들끼리 경험과 노하우를 나누어 성장할 수 있는 곳입니다. 모든
              개발자들이 참여할 수 있는 개방적인 분위기에서, 프로그래밍 지식과
              혁신적인 아이디어를 함께 나누어보세요. 우리 블로그는 개발자
              여러분들의 성장을 함께 응원합니다. 리액트 마크다운의 다양한 기능과
              풍부한 스타일링 옵션을 적극 활용하여, 블로그의 시각적 효과와
              사용자 경험을 극대화한 놀라운 작품을 만들어보세요.
            </p>
          </div>
        </div>
        <div className="z-10 flex flex-col self-center justify-center">
          <div className="mx-auto bg-bgWhite p-7 w-80 rounded-3xl lg:w-96 ">
            <div className="flex items-center justify-center ">
              <div className="flex flex-col justify-between w-full h-48 text-center lg:h-72 items-between">
                <div className="hidden pt-5 pb-3 text-sm lg:flex text-ftBlue">
                  Please indulge in our content by logging in.
                </div>
                <div className="flex items-center justify-center h-full mb-2 bg-black rounded-md hover:opacity-80">
                  <Link
                    className="flex justify-center w-full"
                    href={`${
                      accessToken
                        ? '/about'
                        : `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}`
                    }`}
                  >
                    <button className="w-3/4 ">GITHUB</button>
                    <Image
                      src={'/images/github.png'}
                      alt={'깃허브'}
                      width={30}
                      height={30}
                    />
                  </Link>
                </div>
                <div className="flex items-center justify-center h-full mb-2 text-black bg-white rounded-md hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
                  <button className="w-3/4 hover:cursor-not-allowed ">
                    GOOGLE
                  </button>
                  <Image
                    src={'/images/google.png'}
                    alt={'구글'}
                    width={22}
                    height={22}
                  ></Image>
                </div>
                <div className="flex items-center justify-center h-full mb-2 bg-green-400 rounded-md hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
                  <button className="w-3/4 hover:cursor-not-allowed ">
                    NAVER
                  </button>
                  <Image
                    src={'/images/naver.png'}
                    alt={'네이버'}
                    width={25}
                    height={25}
                  ></Image>
                </div>
                <div className="flex items-center justify-center h-full mb-2 bg-yellow-300 rounded-md hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
                  <button className="w-3/4 hover:cursor-not-allowed ">
                    KAKAO
                  </button>
                  <Image
                    src={'/images/kakao.png'}
                    alt={'카카오'}
                    width={25}
                    height={25}
                  ></Image>
                </div>
              </div>
            </div>
            <div className="space-y-6"></div>
          </div>
          <div>
            <div className="flex flex-col justify-center w-full mt-20 lg:mt-0 ">
              <Link href={'/about'}>
                <button
                  type="submit"
                  className="flex justify-center p-1 mt-3 font-semibold tracking-wide text-gray-100 transition duration-500 ease-in bg-blue-500 rounded-lg cursor-pointer lg:mt-10 lg:p-3 w-80 lg:w-96 hover:bg-blue-700"
                >
                  Guest
                </button>
              </Link>
              <Link href={'/article/new'}>
                <button
                  type="submit"
                  className="flex justify-center p-1 mt-2 font-semibold tracking-wide text-gray-100 transition duration-500 ease-in rounded-lg cursor-pointer lg:p-3 bg-ftBlue w-80 lg:w-96 hover:bg-blue-700"
                >
                  Using Markdown
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
