import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CopyBlock, dracula } from 'react-code-blocks';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { KeyMap } from 'lib/constants';
import 'easymde/dist/easymde.min.css';
import { cn } from 'styles/utils';
import css from './new.module.scss';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type DocType = {
  title: string;
  content: string;
};

const INIT_USER_INPUT = {
  title: '',
  content: '# Hello world',
};

const NewPost = () => {
  const [doc, setDoc] = useState<DocType>(INIT_USER_INPUT);
  console.log('DOC: ', doc);

  const onChangeTextarea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setDoc({ ...doc, [name as keyof DocType]: value });
    },
    [doc]
  );

  const onChange = useCallback(
    (value: string) => {
      setDoc({ ...doc, content: value });
    },
    [doc]
  );

  //TODO: implement auto focus
  const changeFocusContent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== KeyMap.ENTER) return;
    e.preventDefault();
  };

  return (
    <main className="max-w-7xl mx-auto">
      <div className="content-wrapper flex flex-col py-10">
        <header className="py-6">
          <textarea
            className="placeholder-zinc-600 placeholder:text-3xl text-3xl font-bold w-full h-10"
            name="title"
            value={doc.title}
            placeholder="오늘은 어떤 주제로 모두를 놀라게 해주실 건가요? 🥰"
            onKeyDown={changeFocusContent}
            onChange={onChangeTextarea}
          />
          <div className="w-16 h-2 my-4 bg-white opacity-30 rounded-sm" />
          <main className="mde flex flex-1 w-full">
            <div className={cn(css.mde, 'w-full')}>
              <SimpleMDE
                className="bg-slate-900 text-white"
                style={{ color: '#fff' }}
                options={MDE_OPTION}
                value={doc.content}
                onChange={onChange}
              />
            </div>
            <div className="w-full px-8">
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
                {doc?.content}
              </ReactMarkdown>
            </div>
          </main>
        </header>
        <section className="flex flex-col flex-1"></section>
      </div>
    </main>
  );
};

export default NewPost;

const MDE_OPTION = {
  spellChecker: false,
  sideBySideFullscreen: false,
  toolbar: false,
  insertTexts: {
    horizontalRule: ['', '\n\n-----\n\n'],
    image: ['![](http://', ')'],
    link: ['[', '](http://)'],
    table: [
      '',
      '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n',
    ],
  },
  tabSize: 2,
};
