import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const Content = ({ data }: { data: string }) => {
  return (
    <div className=" min-h-[200px] sm:min-h-[400px]">
      <ReactMarkdown
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
      >
        {data}
      </ReactMarkdown>
    </div>
  );
};

export default Content;
