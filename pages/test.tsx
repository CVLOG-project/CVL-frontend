import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from 'components/core/Card/Card';
import Text from 'components/core/Text/Text';
import { cn, colors } from 'styles/utils';

interface CardType {
  image: string;
  title: string;
  id: number;
  author: string;
  description: string;
}

const TestPage = () => {
  return (
    <div className={cn('container')}>
      <Head>
        <title>TEST</title>
      </Head>
      <div className={cn('container')}>
        <Text variant="h2">h2태그를 사용했습니다.</Text>
        <Text variant="h1" className={colors('primary', 'text')}>
          h1태그를 사용했습니다.
        </Text>
        <Text variant="h3" className={colors('warn', 'text')}>
          h3태그를 사용했습니다.
        </Text>
        <Text variant="h4">h4태그를 사용했습니다.</Text>
        <Text variant="h5">h5태그를 사용했습니다.</Text>
        <Text variant="labelMd">labelMd 사용했습니다.</Text>
        <Text variant="labelSm">labelSm태그를 사용했습니다.</Text>
        <Text variant="base">base 사용했습니다.</Text>
      </div>
      <div>
        {MOCK_POSTS.map(({ id, title, author, description, image }) => (
          <Card
            key={id}
            image={image}
            title={title}
            author={author}
            description={description}
          />
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
    image: 'https://picsum.photos/800/800',
  },
  {
    id: 2,
    title: 'How run V8 in the browser?',
    author: 'Yunkuk park',
    description:
      'V8 is the open-source JavaScript engine that runs in Google Chrome and other Chromium-based web browsers, including Brave, Opera, and Vivaldi.',
    image: 'https://picsum.photos/800/800',
  },
] as const;
