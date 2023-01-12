import React from 'react';
import Head from 'next/head';
import ListView from './ListView';
import SideView from './SideView';
import type { NextPage } from 'next';

const List: NextPage = () => {
  return (
    <div className="min-h-screen p-2 my-10 bg-black">
      <Head>
        <title>CVLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-start justify-center">
        <div className="hidden lg:block">
          <SideView />
        </div>
        <ListView />
      </div>
    </div>
  );
};

export default List;
