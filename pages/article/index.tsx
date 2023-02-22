import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ListView from './ListView';
import SideView from './SideView';

const List: NextPage = () => {
  return (
    <div className="min-h-screen p-2 pt-20 bg-bgWhite">
      <Head>
        <title>CVLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden md:block xl:mt-10 xl:fixed left-[5%] ">
        <SideView />
      </div>
      <Link href={'/new'}>
        <button className="hidden md:block fixed right-[8%]">
          <div className="flex items-center justify-center p-3 mt-12 rounded-lg text-ftWhite xl:h-20 md:h-12 xl:w-40 md:w-28 bg-ftBlue md:text-sm xl:text-xl">
            새로운 글쓰기
          </div>
        </button>
      </Link>
      <div className="flex items-start justify-center">
        <ListView />
      </div>
    </div>
  );
};

export default List;
