// TODO: need authorization (github) to access this page
import React, { useState, useCallback } from 'react';
import Editor from 'components/domain/new/Editor';
import { KeyMap } from 'lib/constants';

type DocType = {
  title: string;
  content: string;
};

const INIT_USER_INPUT = {
  title: '',
  content: '# Hello world',
};

const NewPost = () => {
  console.log('NewPost');

  const [doc, setDoc] = useState<DocType>(INIT_USER_INPUT);
  console.log('DOC: ', doc);

  const onChangeTextarea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setDoc({ ...doc, [name as keyof DocType]: value });
    },
    [doc]
  );

  const onChangeDoc = useCallback(
    (content: string) => {
      setDoc({ ...doc, content });
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
        </header>
        <section className="flex flex-col flex-1">
          <Editor initDoc={doc.content} onChange={onChangeDoc} />
        </section>
      </div>
    </main>
  );
};

export default NewPost;
