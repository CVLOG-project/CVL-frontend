import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import ListView from './components/ListView';
import SideView from './components/SideView';

const List: NextPage = () => {
  return (
    <div className="flex items-start justify-center min-h-screen p-2 pt-10 bg-white md:pt-20">
      <Head>
        <title>CVLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full pr-4 md:w-1/4 xl:mt-10">
        <SideView />
      </div>
      <div className="flex items-center justify-center w-full mx-5 md:w-3/4">
        <ListView />
      </div>
      <div className="w-full pr-4 md:w-1/4 xl:mt-10 ">
        {/* FIXME 추후 추가 기능(공유, 좋아요) */}
      </div>
    </div>
  );
};

export default List;
