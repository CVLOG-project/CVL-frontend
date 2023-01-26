import React from 'react';
import { Pagination } from 'flowbite-react';
import { useQuery } from 'react-query';
import Card from 'components/core/Card/Card';
import { axiosMock } from '../api/axios';

type TagType = {
  id: string;
  name: string;
};

type BlogType = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  public_status: boolean;
  created_at: string;
  updated_at: string;
  image: string;
  tags: TagType;
};

type ResponseType = {
  data: BlogType[];
};

const ListView = () => {
  const {
    isLoading,
    error,
    data: listData,
  } = useQuery<ResponseType>('listitem', () => axiosMock('list'));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <h1>error !!!</h1>;
  const onPageChange = () => {
    // TODO : onPageChange 함수를 통해 axios params로 페이지네이션 구현 예정
  };

  return (
    <div className="flex flex-col gap-5">
      {/* <div className="hidden p-1 mr-4 border border-gray-800 rounded-md lg:block">
        <input
          className="bg-transparent focus:outline-none "
          placeholder="검색"
        />
      </div> */}
      {listData?.data.map(({ id, ...cards }) => (
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
  );
};

export default ListView;
