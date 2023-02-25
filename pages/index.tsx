import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocalStorage from 'public/utils/Localstorage';

const Home = () => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;

  return (
    <div className="h-screen ">
      <div className=" bg-ftBlue animate-down h-1/2 lg:h-full lg:w-1/2 lg:animate-right" />
      <div className="fixed flex flex-col items-center lg:justify-center justify-center lg:flex-row inset-x-1/2 lg:inset-x-0  bottom-[30%] lg:bottom-0 pb-8 xl:bottom-[10%] lg:w-full ">
        <div className="flex flex-col items-center justify-center mb-8 w-60 sm:w-[490px]  xl:w-[550px] font-serif xl:mr-40">
          <div className="mb-3 text-3xl text-white sm:text-5xl sm:mb-12 ">
            Welcome CVLOG
          </div>

          <div className="hidden text-lg text-center text-white lg:block lg:w-[420px] xl:w-full">
            Welcome to our developer blog, where we share knowledge and
            experiences in web development and programming,
            <br /> and collaborate to grow together.
          </div>
          <div className="text-[10px] text-center text-white sm:text-lg lg:w-[420px] xl:w-full">
            Here, you can find the latest technologies
            <br className="lg:hidden" />
            and ideas, and connect with other developers
            <br className="lg:hidden" />
            to exchange expertise and best practices.
            <div className="hidden lg:block">
              We strive to maintain an open atmosphere where everyone can
              contribute, share programming knowledge, and brainstorm innovative
              ideas. We are committed to supporting the growth of all developers
              through our blog.
            </div>
          </div>
          <div className="hidden text-center text-white text-md lg:block lg:w-[420px] xl:w-full mt-3 font-sans">
            웹 개발 및 프로그래밍 분야에서 함께 성장할 수 있는 개발자
            <br />
            블로그에 오신 것을 환영합니다.
            <br />
            우리 블로그는 최신 기술과 아이디어를 공유하며, <br />
            개발자들끼리 경험과 노하우를 나누어 성장할 수 있는 곳입니다. <br />
            모든 개발자들이 참여할 수 있는 개방적인 분위기에서, <br />
            프로그래밍 지식과 혁신적인 아이디어를 함께 나누어보세요. <br />
            우리 블로그는 개발자 여러분들의 성장을 함께 응원합니다.
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex items-center justify-center bg-gray-200 h-52 w-52 rounded-2xl lg:w-72 lg:h-80 lg:mx-[131px]">
            <div className="flex flex-col justify-between w-48 h-40 text-center lg:h-52">
              <div className="flex items-center justify-center h-8 bg-black rounded-md lg:h-10 hover:opacity-80">
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
              <div className="flex items-center justify-center h-8 text-black bg-white rounded-md lg:h-10 hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
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
              <div className="flex items-center justify-center h-8 bg-green-400 rounded-md lg:h-10 hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
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
              <div className="flex items-center justify-center h-8 bg-yellow-300 rounded-md lg:h-10 hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
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
          <Link href={'/about'}>
            <div className="hover:scale-110 ease-in duration-200 fixed flex items-center justify-center w-20 h-10 text-sm text-white translate-x-[-50%] lg:translate-x-0 rounded-full left-1/2 bg-ftBlue lg:static lg:w-48 lg:h-12 lg:text-3xl bottom-10 lg:mt-10">
              GUEST
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
