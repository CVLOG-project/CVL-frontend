import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { KeyMap } from 'lib/constants';
import 'easymde/dist/easymde.min.css';

type DocType = {
  title: string;
  content: string;
};

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

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

  const onChangeSimpleMDE = useCallback(
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
          {/* <textarea
            className="w-full h-screen placeholder-zinc-600 placeholder:text-3xl text-3xl font-bold"
            name="content"
            value={doc.content}
            placeholder="오늘은 어떤 주제로 모두를 놀라게 해주실 건가요? 🥰"
            onChange={onChangeTextarea}
          /> */}
          <SimpleMDE
            options={{
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
            }}
            value={doc.content}
          />
        </header>
        <section className="flex flex-col flex-1"></section>
      </div>
    </main>
  );
};

export default NewPost;
