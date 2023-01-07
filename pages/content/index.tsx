import React from 'react';
import CommentBox from 'components/Comment';
import Tag from 'components/Tag';
import Test from 'pages/text';
import Profile from './profile';

const Detail = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-10/12 p-4 my-10 bg-gray-900 rounded-lg md:my-20">
        <header className="flex w-full h-12 py-2 md:pl-6 sm:h-16">
          <h1 className="w-11/12 ml-2 overflow-hidden text-3xl font-normal sm:text-5xl min-w-min flex-nowrap">
            {DETAILPAGE_DATA.title}
          </h1>
          <div className="flex flex-col-reverse w-24 text-xs text-gray-400 md:ml-1 md:text-sm">
            {formatDate(new Date())}
          </div>
        </header>
        <section className="flex items-center justify-between w-full h-full p-2 px-3 border-b border-gray-300 ">
          <article className="flex flex-wrap justify-start w-full">
            <Tag />
          </article>
          <article className="flex flex-row items-center justify-end w-1/4 md:w-1/8 md:flex-row">
            <div className="m-1 text-xs cursor-pointer lg:p-3 lg:text-base hover:text-blue-400">
              수정
            </div>
            <div className="m-1 text-xs cursor-pointer lg:p-3 lg:text-base hover:text-blue-400">
              삭제
            </div>
          </article>
        </section>
        <main className="w-full h-full pt-5 md:pb-12">
          <div className="p-2 px-6 ">{DETAILPAGE_DATA.content}</div>
        </main>
        <section className="flex justify-between w-full px-5 pb-5 border-b border-gray-600 mt-7">
          <article className="">
            <Profile />
          </article>
          <article className="flex items-center justify-around lg:w-96 w-60">
            <div className="flex items-center w-1/2 h-12 ml-6 bg-gray-600 rounded-md cursor-pointer md:ml-10 justify-evenly hover:opacity-70">
              <div className="w-100% ml-1 md:ml-3">←</div>
              <div className="flex-col hidden w-full sm:flex">
                <div className="text-xs text-center">이전 포스트</div>
                <div className="h-5 mx-1 overflow-hidden text-sm font-bold text-center lg:text-md flex-nowrap lg:w-32">
                  나는 매우매우 긴 제목입니다.
                </div>
              </div>
            </div>
            <div className="flex items-center w-1/2 h-12 ml-1 bg-gray-600 rounded-md cursor-pointer justify-evenly hover:opacity-70">
              <div className="flex-col hidden w-full sm:flex">
                <div className="text-xs text-center">다음 포스트</div>
                <div className="h-5 mx-1 overflow-hidden text-sm font-bold text-center lg:text-md flex-nowrap lg:w-32">
                  제목
                </div>
              </div>
              <div className="w-100%  mr-1 md:mr-3 ">→</div>
            </div>
          </article>
        </section>
        <CommentBox />
      </div>
    </div>
  );
};

export default Detail;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const DETAILPAGE_DATA = {
  id: 0,
  title: '제목입니다.',
  content: <Test />,
};

const formatDate = (date: Date) =>
  Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'narrow',
    day: 'numeric',
    localeMatcher: 'lookup',
  }).format(date);
