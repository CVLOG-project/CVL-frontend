import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-[93vh] flex-col">
      <div className="text-ftBlue text-[30px] sm:text-[80px] mb-8 sm:mb-12">
        Welcome to CVLOG
      </div>
      <div className="flex flex-col items-center justify-center text-xs sm:text-xl">
        <div className="text-ftBlick w-[300px] sm:w-[480px] text-center">
          웹 개발 및 프로그래밍에 대한 지식과 경험을 공유하는 개발자 블로그에
          오신 것을 환영합니다.
        </div>
        <div className="text-ftBlick w-[300px] sm:w-[600px] text-center">
          개발자로서의 여정에 함께하고 업계의 최신 기술과 기술에 대해
          알아보십시오.
        </div>
        <div className="text-ftBlick w-[300px] sm:w-[600px] text-center mt-5">
          Welcome to my developer blog where I share my knowledge and
          experiences in web development and programming.
        </div>
        <div className="text-ftBlick w-[300px] sm:w-[600px] text-center">
          Join me on my journey as a developer and learn about the latest
          technologies and techniques in the industry.
        </div>

        <div className="text-ftWhite w-[270px] sm:w-[400px] justify-between flex mt-10 mb-20">
          <Link href={'/article'}>
            <button className="w-32 h-16 sm:w-48 sm:h-20 rounded-2xl bg-ftBlue">
              리스트 페이지
            </button>
          </Link>
          <Link href={'/article/new'}>
            <button className="w-32 h-16 sm:w-48 sm:h-20 rounded-2xl bg-ftBlue">
              포스트 페이지
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
