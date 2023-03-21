import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import Link from 'next/link';
import LocalStorage from 'public/utils/Localstorage';
import IntroduceEven from './introduceEven';
import IntroduceOdd from './introduceOdd';

const About: NextPage = () => {
  const [showChild, setShowChild] = useState(false);
  const [aboutData, setAboutData] = useState<Introduce[]>();
  const accessToken = LocalStorage.getItem('CVtoken') as string;

  useEffect(() => {
    const response = axios
      .get('/mockData/aboutMockData.json')
      .then(res => setAboutData(res.data.data));
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <section className="flex flex-col items-center justify-center pt-2 md:pt-20">
        <article className="flex flex-col items-center justify-center w-full md:h-[30vh] p-8 text-center md:w-3/5">
          <h1 className="mb-1 text-black md:mb-3 text-sm md:text-md md:text-3xl">
            The state-of-the-art blog platform
          </h1>
          <div className="text-[10px] text-ftBlick md:text-base lg:px-24 xl:px-0 ">
            <p>
              Logme 블로그는 창의적이고 시각적으로 매력적인 글을 작성하기 위한
              최적의 환경을 제공합니다.
            </p>
            <div className="hidden md:block">
              <p>
                리액트 마크다운의 다양한 기능과 풍부한 스타일링 옵션을 적극
                활용하여,
              </p>
              <p>
                블로그의 시각적 효과와 사용자 경험을 극대화한 놀라운 작품을
                만들어보세요.
              </p>
            </div>
          </div>
        </article>

        {aboutData &&
          aboutData.map((element: Introduce) => {
            return element.id % 2 === 0 ? (
              <IntroduceOdd key={element.id} Element={element} />
            ) : (
              <IntroduceEven key={element.id} Element={element} />
            );
          })}

        <section className="w-full pt-4 pb-2 md:pb-20 ">
          <div className="flex items-center justify-center w-full h-20">
            <h2 className="p-3 text-sm text-gray-400 md:text-base">
              지금 바로 즐겨보세요 !
            </h2>
            <div className="flex w-3/5 ">
              <Link href={'/article/new'} className="w-1/2 mr-1 md:p-3 md:mr-2">
                <button
                  type="submit"
                  className="w-full h-full p-3 text-center rounded-lg md:p-5 md:text-2xl bg-ftBlue hover:bg-blue-800"
                >
                  Using Markdown
                </button>
              </Link>
              <Link
                href={accessToken ? '/article' : '/'}
                className="w-1/2 md:p-3 md:mr-2 "
              >
                <button
                  type="submit"
                  className="w-full h-full p-3 text-center rounded-lg md:p-5 md:text-2xl bg-ftBlue hover:bg-blue-800"
                  onClick={() => !accessToken && alert('로그인 먼저 해주세요.')}
                >
                  List Page
                </button>
              </Link>
            </div>
          </div>
        </section>
      </section>
    );
  }
};

export default About;

export interface IntroduceType {
  Element: Introduce;
}

export interface Introduce {
  id: number;
  src: string;
  title: string;
  titleBr: string;
  message: string;
  messageBr: string;
}
