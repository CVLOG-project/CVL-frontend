import React from 'react';
import { Pagination } from 'flowbite-react';
import Card from 'components/core/Card/Card';
import { useGetList } from 'hooks/List';
import LocalStorage from 'public/utils/Localstorage';

type TagType = {
  id: number;
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
  tags: TagType[];
};

export type GetListType = {
  success: boolean;
  data: BlogType[];
};

const ListView = () => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;
  //데이터 받기

  const List = useGetList(accessToken);

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
      {List?.data?.map(({ id, title, content, tags }) => (
        <Card key={id} title={title} content={content} tags={tags} />
      ))}
      <div className="flex items-center justify-center">
        <Pagination
          className="white"
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
