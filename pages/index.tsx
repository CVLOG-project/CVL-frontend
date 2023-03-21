import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocalStorage from 'public/utils/Localstorage';

const Home = () => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;

  return (
    <div className="lg:px-16 ">
      <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-ftWhite"></div>
      <div className="flex flex-col justify-center min-h-screen bg-transparent lg:flex-row rounded-3xl">
        <div className="z-10 flex flex-col self-center lg:pr-24 sm:max-w-4xl ">
          <div className="flex flex-col self-start mb-5 text-gray-500 lg:mb-0"></div>
        </div>
        <div className="z-10 flex flex-col self-center justify-center border rounded-3xl">
          <div className="mx-auto bg-bgWhite p-7 w-80 rounded-3xl lg:w-96 ">
            <div className="flex items-center justify-center ">
              <div className="flex flex-col justify-between w-full h-48 text-center lg:h-72 items-between">
                <div className="hidden pb-3 text-md lg:flex text-ftBlue">
                  Login With
                </div>
                <div className="flex items-center justify-center h-full mb-2 transition-opacity duration-300 ease-in-out bg-black rounded-md hover:opacity-80 ">
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
                <div className="flex items-center justify-center h-full mb-2 text-black transition-opacity duration-300 ease-in-out bg-white rounded-md hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
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
                <div className="flex items-center justify-center h-full mb-2 transition-opacity duration-300 ease-in-out bg-green-400 rounded-md hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
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
                <div className="flex items-center justify-center h-full mb-2 transition-opacity duration-300 ease-in-out bg-yellow-300 rounded-md hover:opacity-10 hover:cursor-not-allowed opacity-10 lg:opacity-100">
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
                <div className="flex items-center justify-center h-full mb-2 transition-opacity duration-300 ease-in-out bg-blue-700 rounded-md hover:opacity-80">
                  <Link href={'/about'} className="flex justify-center w-full">
                    <button type="submit" className="w-3/4">
                      Guest
                    </button>
                    {/* todo : 우리 logo로 대체 */}
                    <Image
                      src={'/images/kakao.png'}
                      alt={'로고'}
                      width={25}
                      height={25}
                    ></Image>
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
