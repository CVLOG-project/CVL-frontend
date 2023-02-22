import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import CommentBox from 'components/core/Detail/Comment';
import Tag from 'components/core/Detail/Tag';
import { DeleteDetail, useGetDetail } from 'hooks/Detail';
import { useGetList } from 'hooks/List';
import { listIndexAtom } from 'public/recoil/atoms/atoms';
import LocalStorage from 'public/utils/Localstorage';
import Content from './content';
import Profile from './Profile';

const Detail = ({ pid }: { pid: string }) => {
  const router = useRouter();
  const [patchMessage, setPatchMessage] = useState(false);
  const [listIndex, setListIndex] = useRecoilState(listIndexAtom);

  const accessToken = LocalStorage.getItem('CVtoken') as string;
  //데이터 받기
  const getDetailData = useGetDetail(parseInt(pid), accessToken);
  const List = useGetList(accessToken);
  const queryClient = useQueryClient();

  //나만보기 메세지 창
  // const patchDetail = () => {
  //   PatchDetail(parseInt(pid));
  //   if (patchMessage) {
  //     alert('이 게시물은 나에게만 보입니다.');
  //   } else {
  //     alert('이 게시물은 "나만보기"가 해제 되었습니다.');
  //   }
  // };

  // 삭제 창
  const deleteCheck = () => {
    const check = confirm('삭제하시겠습니까?');
    if (check == true) {
      DeleteDetail(parseInt(pid), accessToken);
      alert('삭제되었습니다.');
      router.push('/article');
    }
  };

  // 수정 창
  const updateCheck = () => {
    const check = confirm('수정하시겠습니까?');
    if (check == true) {
      router.push(`/article/modify/${pid}`);
    }
  };

  //다음, 이전 게시물

  if (listIndex === 999999) {
    const resetIndex =
      List.data && List.data.findIndex(e => e.id === parseInt(pid));
    resetIndex && setListIndex(resetIndex);
  }

  const movePage = (where: string) => {
    if (where === 'prev') {
      return listIndex === 0 ? '' : indexMin(listIndex);
    } else if (where === 'next') {
      return List.data && List.data.length - 1 === listIndex
        ? ''
        : indexMax(listIndex);
    }
    queryClient.invalidateQueries(['detail']);
    getDetailData.refetch();
  };

  const indexMin = async (params: number) => {
    if (params > 0) {
      setListIndex(params - 1);
    }
  };
  const indexMax = (params: number) => {
    if (List.data && params < List.data.length - 1) {
      setListIndex(params + 1);
    }
  };

  return (
    <div className="flex justify-center lg:mx-12 xl:mx-16">
      <div className="flex flex-col items-center justify-center w-full md:p-4 bg-bgWhite rounded-lg my-7 sm:w-[88%] md:my-15">
        <header className="flex justify-between w-full h-12 py-2 border-b-[0.5px]  border-gray-200 min-[400px]:border-hidden md:pl-2 sm:h-16">
          <h1 className="mr-1 text-xl truncate text-ftBlick ">
            {getDetailData?.data?.title}
          </h1>
          <div className="flex items-end h-full">
            <time className="text-[6px] text-gray-600 ">
              {getDetailData && getDetailData.data?.created_at.slice(0, 10)}
            </time>
          </div>
        </header>
        <section className="flex items-center justify-between w-full h-full py-2 border-b border-gray-800 ">
          <div className="flex flex-wrap justify-start w-full mr-1 text-ftBlick ">
            {getDetailData.data?.tags.map((tag: TagType) => (
              <Tag id={tag.id} name={tag.name} key={tag.id} />
            ))}
          </div>
          <div className="flex flex-row items-center justify-center text-[6px] w-12 lg:text-[9px]">
            <div
              className="cursor-pointer hover:text-blue-400 text-ftBlick "
              onClick={() => {
                updateCheck();
              }}
            >
              수정
            </div>
            <div
              className="ml-1 cursor-pointer hover:text-blue-400 text-ftBlick"
              onClick={() => {
                deleteCheck();
              }}
            >
              삭제
            </div>
          </div>
        </section>
        <main className="w-full h-full pt-3 md:pb-12">
          <section>
            <div className="flex justify-end w-full">
              <button
                className="flex justify-end text-gray-600 cursor-pointer hover:text-blue-400 text-[6px] w-12 mr-1"
                onClick={() => {
                  setPatchMessage(!patchMessage);
                  // patchDetail();
                }}
              >
                나만보기
              </button>
            </div>
            <div className="p-2 px-3 text-ftBlick">
              {getDetailData.data && (
                <Content data={getDetailData.data?.content} />
              )}
            </div>
          </section>
        </main>
        <section className="flex justify-between w-full px-5 pb-2 border-b border-gray-700 sm:pb-5 mt-7">
          <article className="mb-4 sm:mb-0">
            <Profile />
          </article>
          <div className="flex items-center justify-around lg:w-96 w-60">
            <div
              className={`flex items-center w-1/2 h-8 sm:ml-6  bg-gray-200 text-ftBlick rounded-md
                ${
                  listIndex === 0
                    ? 'hover:cursor-not-allowed opacity-20 '
                    : 'cursor-pointer hover:opacity-70'
                }
               sm:h-12 md:ml-10 justify-evenly `}
            >
              <Link
                href={`/article/content/${
                  listIndex === 0
                    ? List.data && List.data[listIndex].id
                    : List.data && List.data[listIndex - 1]?.id
                }`}
                onClick={() => movePage('prev')}
                className={` flex items-center
                  ${
                    listIndex === 0
                      ? 'hover:cursor-not-allowed opacity-20 '
                      : 'cursor-pointer hover:opacity-70'
                  }
                `}
              >
                <div className="ml-1 md:ml-3">←</div>
                <div className="flex-col hidden w-[90px] md:w-full sm:flex truncate">
                  <div className="text-[8px] text-center lg:text-xs ">
                    이전 포스트
                  </div>
                  <div className="h-5 mx-1 overflow-hidden text-[8px] font-bold text-center md:text-[10px] lg:text-xs flex-nowrap lg:w-32 md:w-20 mt-[2px]">
                    {listIndex === 0
                      ? ''
                      : List.data && List.data[listIndex - 1]?.title}
                  </div>
                </div>
              </Link>
            </div>
            <div
              className={`flex items-center w-1/2 h-8 ml-1 bg-gray-200 text-ftBlick rounded-md cursor-pointer sm:h-12 justify-evenly
                ${
                  List.data && List.data.length - 1 === listIndex
                    ? 'hover:cursor-not-allowed opacity-20 '
                    : 'cursor-pointer hover:opacity-70'
                }`}
            >
              <Link
                href={`/article/content/${
                  List.data && List.data.length - 1 === listIndex
                    ? List.data && List.data[listIndex].id
                    : List.data && List.data[listIndex + 1]?.id
                }`}
                onClick={() => movePage('next')}
                className={` flex items-center
                  ${
                    List.data && List.data.length - 1 === listIndex
                      ? 'hover:cursor-not-allowed opacity-20 '
                      : 'cursor-pointer hover:opacity-70'
                  }
                `}
              >
                <div className="flex-col hidden  w-[90px] md:w-full sm:flex truncate">
                  <div className="text-[8px] text-center lg:text-xs">
                    다음 포스트
                  </div>
                  <div className="h-5 mx-1  overflow-hidden text-[8px] font-bold text-center md:text-[10px] lg:text-xs flex-nowrap lg:w-32 md:w-20 mt-[2px]">
                    {List.data && List.data.length - 1 === listIndex
                      ? ''
                      : List.data && List.data[listIndex + 1]?.title}
                  </div>
                </div>
                <div className="w-100%  mr-1 md:mr-3 ">→</div>
              </Link>
            </div>
          </div>
        </section>
        <CommentBox pid={pid} />
      </div>
    </div>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async context => {
  const pid = context.params?.pid;
  return { props: { pid } };
};
export interface Content {
  success: boolean;
  data: ContentData;
}

export interface ContentData {
  id: number;
  title: string;
  content: string;
  user_id: number;
  public_status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  tags: TagType[];
}

export interface TagType {
  id: number;
  name: string;
}

export interface ContentParams {
  accessToken: string;
  content_id: number;
}
