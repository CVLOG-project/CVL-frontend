import React from 'react';
import { Avatar } from 'flowbite-react';
import { Comment } from 'service/api/comment/type';
import { useDeleteComment, useModifyComment } from 'service/hooks/Comment';

const Comment = ({ id, content, user_id, created_at }: Comment) => {
  const modify = useModifyComment(id);
  const remove = useDeleteComment(id);
  //수정
  const modifyComment = () => {
    modify.mutate();
  };

  //삭제
  const deletComent = () => {
    remove.mutate();
  };

  return (
    <article className="mt-2 border-b border-gray-300 sm:mt-5">
      <div className="flex justify-between w-full ">
        <Avatar
          img={user_id.profile_image}
          rounded={true}
          className="flex justify-start "
        >
          <div className="flex flex-col space-y-1 font-medium dark:text-white">
            <div className="text-[11px] md:text-base text-ftBlick">
              {user_id.github_id}
            </div>
            <time className="text-[5px] md:text-xs overflow-hidden  text-gray-500 w-28 md:w-40 lg:w-80 dark:text-gray-400">
              {created_at.slice(0, 10)}
            </time>
          </div>
        </Avatar>
        <section className="flex">
          <article className="flex flex-row mt-1 mr-1 md:mt-1 md:m-0">
            <button
              className="m-1 text-[10px] cursor-pointer md:p-1 md:text-sm hover:text-blue-400 text-ftBlick "
              onClick={() => modifyComment()}
            >
              수정
            </button>
            <button
              className="m-1 text-[10px] cursor-pointer md:p-1 md:text-sm hover:text-blue-400 text-ftBlick"
              onClick={() => deletComent()}
            >
              삭제
            </button>
          </article>
        </section>
      </div>
      <div className="w-full p-2 pl-6 text-sm lg:py-5 md:text-base sm:text-md text-ftBlick">
        {content}
      </div>
      {/* FIXME 대댓글 기능 구현 후 수정
      {!write ? (
        <div
          className="w-16 p-1 mb-2 ml-5 text-[10px] text-center bg-blue-500 rounded-sm cursor-pointer md:p-2 md:w-24 md:text-sm hover:opacity-70"
          onClick={() => setWrite(!write)}
        >
          + 답글 달기
        </div>
      ) : (
        <>
          <div
            className="w-16 p-1 ml-5 text-[10px] text-center bg-red-500 rounded-sm cursor-pointer md:p-2 md:w-24 md:text-sm hover:opacity-70"
            onClick={() => setWrite(!write)}
          >
            - 답글 닫기
          </div>
          <CommentWrite />
        </>
      )}
      {recomment.length > 0 && <ReComment id={id} recomment={recomment} />} */}
    </article>
  );
};

export default Comment;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const formatDate = (date: Date) =>
  Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'narrow',
    day: 'numeric',
    localeMatcher: 'lookup',
  }).format(date);
