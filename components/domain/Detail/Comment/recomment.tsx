import React from 'react';
import CommentLayout from 'components/commentLayout';
import { Avatar } from 'flowbite-react';

const ReComment = () => {
  return (
    <CommentLayout>
      <div className="mt-5">
        <div className="flex justify-between w-full ">
          <Avatar
            img={RECOMMENT_DATA.img}
            rounded={true}
            className="flex justify-start cursor-pointer"
          >
            <div className="space-y-1 font-medium dark:text-white ">
              <div>{RECOMMENT_DATA.name}</div>
              <div className="h-5 overflow-hidden text-sm text-gray-500 w-28 md:w-40 lg:w-80 dark:text-gray-400">
                {formatDate(new Date())}
              </div>
            </div>
          </Avatar>
          <section className="flex">
            <article className="flex m-3 md:mt-1 md:m-0">
              <div className="m-1 text-xs cursor-pointer md:p-1 md:text-sm hover:text-blue-400">
                수정
              </div>
              <div className="m-1 text-xs cursor-pointer md:p-1 md:text-sm hover:text-blue-400">
                삭제
              </div>
            </article>
          </section>
        </div>
        <main className="w-full p-2 pl-5">{RECOMMENT_DATA.content}</main>
      </div>
    </CommentLayout>
  );
};

export default ReComment;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const RECOMMENT_DATA = {
  id: 0,
  name: 'wjdrhksgns7602',
  img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
  content:
    '댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용 댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용',
};

const formatDate = (date: Date) =>
  Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'narrow',
    day: 'numeric',
    localeMatcher: 'lookup',
  }).format(date);
