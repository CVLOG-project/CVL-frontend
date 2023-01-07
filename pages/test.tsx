import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from 'components/core/Card/Card';
import Text from 'components/core/Text/Text';

interface CardType {
  image: string;
  title: string;
  id: number;
  author: string;
  description: string;
}

const TestPage = () => {
  //FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.
  return (
    <div className="container">
      <Head>
        <title>Test</title>
      </Head>
      <div className="container">
        <Text variant="h1" className="accent-blue-500">
          h1태그를 사용했습니다.
        </Text>
        <Text variant="h2">h2태그를 사용했습니다.</Text>
        <Text variant="h3" className="accent-yellow-500">
          h3태그를 사용했습니다.
        </Text>
        <Text variant="h4">h4태그를 사용했습니다.</Text>
        <Text variant="h5">h5태그를 사용했습니다.</Text>
        <Text variant="labelMd">labelMd 사용했습니다.</Text>
        <Text variant="labelSm">labelSm태그를 사용했습니다.</Text>
        <Text variant="base">base 사용했습니다.</Text>
      </div>
      <div className="flex flex-col gap-4">
        {MOCK_POSTS.map(({ id, ...cards }) => (
          <Card key={id} {...cards} />
        ))}
      </div>
    </div>
  );
};

export default TestPage;

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
      'V10 is the open-source JavaScript engine that runs in Google Chrome and other Chromium-based web browsers, including Brave, Opera, and Vivaldi.',
    date: new Date(2022, 9, 12),
    image: 'https://picsum.photos/800/800',
  },
] as const;
