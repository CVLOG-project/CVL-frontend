import React from 'react';
import { GetServerSideProps } from 'next';
import { useGetCommentList } from 'service/hooks/Comment';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';

const CommentBox = ({ pid }: { pid: string }) => {
  const commentList = useGetCommentList(parseInt(pid));
  return (
    <section className="flex flex-col w-full p-3 md:mt-3 md:p-5">
      <h2 className="flex justify-start my-2 ml-1 text-xs sm:text-base text-ftBlick">
        {commentList.data && commentList.data.data.length} 개의 댓글
      </h2>
      <article>
        <CommentWrite pid={pid} />
      </article>
      <section>
        <CommentList pid={pid} />
      </section>
    </section>
  );
};

export default CommentBox;

export const getServerSideProps: GetServerSideProps = async context => {
  const pid = context.params?.pid;
  return { props: { pid } };
};
