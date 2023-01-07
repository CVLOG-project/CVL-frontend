import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CopyBlock, dracula } from 'react-code-blocks';
import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const Detail = () => {
  const { data: mockData, isLoading } = useQuery('detail', async () => {
    const res = await axios(
      'https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md'
    );
    return res;
  });

  if (isLoading) return <h1>Loading...</h1>;
  const {
    query: { pid },
    // eslint-disable-next-line
  } = useRouter();

  return (
    <main>
      <h1 className="text-3xl font-bold underline">
        I&apos;m Detail Page {pid}
      </h1>
      <ReactMarkdown
        // eslint-disable-next-line
        children={mockData?.data}
        className="contentMarkdown"
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <CopyBlock
                language={match[1]}
                text={String(children).replace(/\n$/, '')}
                theme={dracula}
                showLineNumbers={true}
                wrapLines={true}
                codeBlock
              />
            ) : (
              <code
                className={className}
                style={{
                  color: '#eb5757',
                  padding: '2px 4px',
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      ></ReactMarkdown>
    </main>
  );
};

export default Detail;
