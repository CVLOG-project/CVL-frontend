import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import ListView from './ListView';
import SideView from './SideView';

const List: NextPage = () => {
  return (
    <div className="min-h-screen p-2 mt-14 bg-bgWhite">
      <Head>
        <title>CVLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden md:block xl:mt-10 xl:fixed xl:left-24 ">
        <SideView />
      </div>
      <div className="flex items-start justify-center">
        <ListView />
      </div>
    </div>
  );
};

export default List;
