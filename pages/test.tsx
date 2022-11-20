import React from 'react';
import Head from 'next/head';
import Card from 'components/core/Card/Card';
import Text from 'components/core/Text/Text';
import { cn, colors } from 'styles/utils';

const TestPage = () => {
  return (
    <div className={cn('container')}>
      <Head>
        <title>TEST</title>
      </Head>
      <div>
        <Text variant="h1" className={colors('primary')}>
          h1태그를 사용했습니다.
        </Text>
        <Text variant="h2" className={colors('primary')}>
          h2태그를 사용했습니다.
        </Text>
        <Text variant="h3">h3태그를 사용했습니다.</Text>
        <Text variant="h4">h4태그를 사용했습니다.</Text>
        <Text variant="h5">h5태그를 사용했습니다.</Text>
        <Text variant="labelMd">labelMd 사용했습니다.</Text>
        <Text variant="labelSm">labelSm태그를 사용했습니다.</Text>
        <Text variant="base">base 사용했습니다.</Text>
      </div>
      <div>
        <Card {...CARD_MOCK} />
      </div>
    </div>
  );
};

export default TestPage;

const CARD_MOCK = {
  image: 'https://picsum.photos/800/600',
  title: 'Chakra UI',
  author: 'Yunkuk Park',
  description:
    'Accessible React components, designed to build your Design System and develop React apps with speed.',
};
