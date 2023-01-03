import React from 'react';
import Head from 'next/head';
import Card from 'components/core/Card/Card';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-black">
      <Head>
        <title>CVLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-5">
          {MOCK_POSTS.map(({ id, ...cards }) => (
            <Card key={id} {...cards} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
const MOCK_POSTS = [
  {
    id: 1,
    title: 'What is Tailwind CSS?',
    author: '작성자1',
    description:
      'Tailwind is a utility-first CSS framework for rapidly building custom user interfaces.',
    date: new Date(),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 2,
    title: 'How run V8 in the browser?',
    author: 'Yunkuk park',
    description:
      'V8 is the open-source JavaScript engine that runs in Google Chrome and other Chromium-based web browsers, including Brave, Opera, and Vivaldi.',
    date: new Date(),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 3,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description:
      '안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요.',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 4,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description:
      'ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅇㅎㅇㅎㅎㅇㅎㅇㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅎㅇㅎㅇㅎㅇ.',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 5,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description: '응애',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 6,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description: 'VVVVVVVVVVVVVVVVVVVV',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 7,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description:
      'V10 is the open-source JavaScript engine that runs in Google Chrome and other Chromium-based web browsers, including Brave, Opera, and Vivaldi.',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 8,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description:
      'V10 is the open-source JavaScript engine that runs in Google Chrome and other Chromium-based web browsers, including Brave, Opera, and Vivaldi.',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 9,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description:
      'V10 is the open-source JavaScript engine that runs in Google Chrome and other Chromium-based web browsers, including Brave, Opera, and Vivaldi.',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 10,
    title: 'How run V10 in the browser?',
    author: 'seha park',
    description:
      'V10 is the open-source JavaScript engine that runs in Google Chrome and other Chromium-based web browsers, including Brave, Opera, and Vivaldi.',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
] as const;
