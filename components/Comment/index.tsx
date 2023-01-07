import React from 'react';
import CommentList from './commentList';
import CommentWrite from './commentWrite';

const CommentBox = () => {
  return (
    <div className="flex flex-col w-full p-3 md:mt-3 md:p-5">
      <div className="flex justify-start my-2 ml-1">
        {COUNT_DATA.count} 개의 댓글
      </div>
      <CommentWrite />
      <CommentList />
    </div>
  );
};

export default CommentBox;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const COUNT_DATA = {
  count: 0,
};
