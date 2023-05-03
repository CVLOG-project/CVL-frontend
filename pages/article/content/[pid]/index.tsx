import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import CommentBox from 'components/Shared/LogmeComment';
import Tag from 'components/Shared/LogmeTag';
import { useGetCommentList } from 'service/hooks/Comment';
import { DeleteDetail, useGetDetail } from 'service/hooks/Detail';
import Content from './content';
import Profile from './Profile';

const Detail = ({ pid }: { pid: string }) => {
  const router = useRouter();
  const [patchMessage, setPatchMessage] = useState(false);
  //데이터 받기
  const getDetailData = useGetDetail(parseInt(pid));
  const commentList = useGetCommentList(parseInt(pid));

  //나만보기 메세지 창
  // const patchDetail = () => {
  //   PatchDetail(parseInt(pid));
  //   if (patchMessage) {
  //     alert('이 게시물은 나에게만 보입니다.');
  //   } else {
  //     alert('이 게시물은 "나만보기"가 해제 되었습니다.');
  //   }
  // };
  const queryClient = useQueryClient();

  // 삭제 창
  const deleteContent = DeleteDetail(parseInt(pid));
  const deleteCheck = async () => {
    const check = confirm('삭제하시겠습니까?');
    if (check == true) {
      await deleteContent.mutate();
      await queryClient.invalidateQueries('tagsFolder');
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

  useEffect(() => {
    getDetailData.refetch();
    commentList.refetch();
  }, [pid]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-[70vw] lg:w-[50.23vw]  rounded-lg bg-bgWhite my-7 md:my-15">
        <header className="flex justify-between w-full h-12 py-2 border-b-[0.5px]  border-gray-200 min-[400px]:border-hidden md:pl-2 sm:h-16">
          <h1 className="mr-1 text-xl truncate text-ftBlick sm:text-3xl lg:text-4xl ">
            {getDetailData?.data?.post.title}
          </h1>
          <div className="flex items-end h-full">
            <time className="text-[6px] text-gray-600 ">
              {getDetailData &&
                getDetailData.data?.post.created_at.slice(0, 10)}
            </time>
          </div>
        </header>
        <section className="flex items-center justify-between w-full h-full py-2 border-b border-gray-400 ">
          <div
            className="flex flex-wrap justify-start w-full mr-1 text-ftBlick "
            onClick={() => alert('v1.1에서 만나요 🥰')}
          >
            {getDetailData.data?.post.tags.map((tag: TagType) => (
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
            <div className="flex justify-center">
              {getDetailData.data && (
                <Content data={getDetailData.data?.post.content} />
              )}
            </div>
          </section>
        </main>
        <section className="flex justify-between w-full px-5 pb-2 border-b border-gray-400 sm:pb-5 mt-7">
          <article className="mb-4 sm:mb-0">
            <Profile />
          </article>
          <div className="flex items-center justify-around lg:w-96 w-60">
            <div
              className={`${
                !getDetailData.data?.prevPostInfo && 'hover:cursor-not-allowed'
              } flex items-center w-1/2 h-8 bg-gray-200 rounded-md cursor-pointer sm:ml-6 text-ftBlick hover:opacity-70 sm:h-12 md:ml-10 justify-evenly`}
            >
              {getDetailData.data?.prevPostInfo && (
                <Link
                  href={`/article/content/${getDetailData.data?.prevPostInfo.id}`}
                  className="flex items-center cursor-pointer hover:opacity-70 "
                >
                  <div className="ml-1 md:ml-3">←</div>
                  <div className="flex-col hidden w-[90px] md:w-full sm:flex truncate">
                    <div className="text-[8px] text-center lg:text-xs ">
                      이전 포스트
                    </div>
                    <div className="h-5 mx-1 overflow-hidden text-[8px] font-bold text-center md:text-[10px] lg:text-xs flex-nowrap lg:w-32 md:w-20 mt-[2px]">
                      {getDetailData.data.prevPostInfo.title}
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div
              className={`${
                !getDetailData.data?.nextPostInfo && 'hover:cursor-not-allowed'
              } flex items-center w-1/2 h-8 ml-1 bg-gray-200 rounded-md cursor-pointer text-ftBlick sm:h-12 justify-evenly hover:opacity-70 `}
            >
              {getDetailData.data?.nextPostInfo && (
                <Link
                  href={`/article/content/${getDetailData.data?.nextPostInfo?.id}`}
                  className="flex items-center cursor-pointer hover:opacity-70"
                >
                  <div className="flex-col hidden  w-[90px] md:w-full sm:flex truncate">
                    <div className="text-[8px] text-center lg:text-xs">
                      다음 포스트
                    </div>
                    <div className="h-5 mx-1  overflow-hidden text-[8px] font-bold text-center md:text-[10px] lg:text-xs flex-nowrap lg:w-32 md:w-20 mt-[2px]">
                      {getDetailData.data.nextPostInfo.title}
                    </div>
                  </div>
                  <div className="w-100%  mr-1 md:mr-3 ">→</div>
                </Link>
              )}
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
  data: {
    post: ContentData;
    prevPostInfo: {
      id: number;
      title: string;
    } | null;
    nextPostInfo: {
      id: number;
      title: string;
    } | null;
  };
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
  content_id: number;
}
