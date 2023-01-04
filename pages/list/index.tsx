import React from 'react';
import { Pagination } from 'flowbite-react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import Card from 'components/core/Card/Card';
import { axiosMock } from '../api/axios';
import type { NextPage } from 'next';

const List: NextPage = () => {
  const { isLoading, error, data } = useQuery('listitem', () =>
    axiosMock('list')
  );
  if (isLoading) return 'Loading...';
  if (error) return <h1>error !!!</h1>;
  const onPageChange = () => {
    // TODO : onPageChange 함수를 통해 axios params로 페이지네이션 구현 예정
  };

  //백단에서 태그를 받으면 레거시
  const tagArr: string[] = [];
  data?.map((item: { tag: string }) => {
    tagArr.push(item.tag);
  });
  const set = new Set(tagArr.flat(2));
  const uniqueSet = [...set];

  return (
    <div className="min-h-screen p-2 my-10 bg-black">
      <Head>
        <title>CVLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-start justify-center">
        <div className="h-screen mt-16">
          <div className="flex flex-col p-1 mr-12 border border-gray-800 rounded-md">
            <input
              className="bg-transparent focus:outline-none"
              placeholder="태그 검색"
            />
          </div>
          {uniqueSet.map((tagname, index) => {
            return <p key={index}>{tagname}</p>;
          })}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-1 mr-4 border border-gray-800 rounded-md">
            <input
              className="bg-transparent focus:outline-none"
              placeholder="검색"
            />
          </div>
          {data.map(({ id, ...cards }) => (
            <Card key={id} {...cards} />
          ))}
          <div className="flex items-center justify-center">
            <Pagination
              className="dark"
              currentPage={1}
              onPageChange={onPageChange}
              totalPages={2}
              showIcons={true}
              previousLabel=""
              nextLabel=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
