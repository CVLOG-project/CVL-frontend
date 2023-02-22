import React from 'react';
import { useGetCommentList } from 'hooks/Comment';
import LocalStorage from 'public/utils/Localstorage';
import Comment from './Comment';

const CommentList = ({ pid }: { pid: string }) => {
  //댓글 리스트 불러오기
  const accessToken = LocalStorage.getItem('CVtoken') as string;
  const commentList = useGetCommentList(parseInt(pid), accessToken);

  return (
    <>
      {commentList.data &&
        commentList?.data.data.map(({ id, content, user_id }) => {
          return (
            <Comment id={id} content={content} user_id={user_id} key={id} />
          );
        })}
    </>
  );
};

export default CommentList;
