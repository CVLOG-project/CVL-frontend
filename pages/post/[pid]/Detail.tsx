import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import rehypeRaw from 'rehype-raw';

const Detail = () => {
  const { data: mockData, isLoading } = useQuery('detail', async () => {
    const res = await axios(
      'https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md'
    );
    return res;
  });

  const {
    query: { pid },
  } = useRouter();

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <main>
      <h1 className="text-3xl font-bold underline">
        I&apos;m Detail Page {pid}
      </h1>
      <ReactMarkdown className="contentMarkdown" rehypePlugins={[rehypeRaw]}>
        {mockData?.data}
      </ReactMarkdown>
    </main>
  );
};

export default Detail;
