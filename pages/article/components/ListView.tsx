import React, { useEffect, useState } from 'react';
import { Pagination, Spinner } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import * as Shared from 'components/Shared';
import Card from 'components/Shared/LogmeCard';
import { listIndexAtom } from 'service/atoms/atoms';
import { useGetList } from 'service/hooks/List';

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
  index: number;
  tags: TagType[];
};

export type ListDataType = {
  posts: BlogType[];
  maxPage: number;
};

export type GetListType = {
  success: boolean;
  data: ListDataType;
};

const ListView = () => {
  //데이터 받기
  const [page, setPage] = useState<number>(1);

  //TODO PARAMS 옵션 추가
  const List = useGetList(page);

  const onPageChange = (page: number) => {
    // TODO : onPageChange 함수를 통해 axios params로 페이지네이션 구현 예정
    setPage(page);
  };
  const router = useRouter();
  useEffect(() => {
    List.refetch();
  }, [page]);
  const [, setListIndex] = useRecoilState(listIndexAtom);
  const saveListIndex = (params: number) => {
    setListIndex(params);
  };
  if (List.isFetching || List.isLoading) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.code === 'Enter') {
      alert('v1.1에서 만나요 🥰');
    }
  };
  const handleNewPost = () => {
    router.push('/article/new');
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between w-full">
        <div className="flex w-full pl-3 pr-3 mr-16 border rounded-lg border-gray20">
          <input
            className="w-full text-gray-600 mb-2text-xl placeholder:text-gray-500 md:text-2xl placeholder:text-lg md:placeholder:text-xl placeholder:italic"
            name="title"
            placeholder="Search........... 👀"
            onKeyDown={handleKeyDown}
          />
          <div className="items-center hidden md:flex text-ftWhite invert">
            <Shared.LogmeIcon.LensIcon
              alt="search"
              width={24}
              height={24}
              onClick={() => alert('v1.1에서 만나요 🥰')}
              cn={' hover:cursor-not-allowed opacity-40'}
            />
          </div>
        </div>
        <div className="flex">
          <Shared.LogmeButton type="classic" size="big" onClick={handleNewPost}>
            <Shared.LogmeHeadline
              type="medium"
              fontStyle="semibold"
              style={{ color: '#fff' }}
            >
              NEW
            </Shared.LogmeHeadline>
          </Shared.LogmeButton>
        </div>
      </div>
      {List.data?.posts.map(
        ({ id, title, content, tags, updated_at }, index) => {
          return (
            <Link
              href={`/article/content/${id}`}
              key={id}
              onClick={() => saveListIndex(index)}
            >
              <Card
                title={title}
                content={content}
                tags={tags}
                updated_at={updated_at}
              />
            </Link>
          );
        }
      )}
      <div className="flex items-center justify-center">
        {List && List.data?.maxPage && List.data?.maxPage !== 1 && (
          <Pagination
            className="white"
            currentPage={page}
            onPageChange={onPageChange}
            totalPages={List.data.maxPage}
            showIcons={true}
            previousLabel=""
            nextLabel=""
          />
        )}
      </div>
    </div>
  );
};

export default ListView;
