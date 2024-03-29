import React, { ChangeEvent, useState } from 'react';
import { useGetCommentList, usePostNewComment } from 'service/hooks/Comment';

const CommentWrite = ({ pid }: { pid: string }) => {
  const [comment, setComment] = useState<string>('');
  const commentList = useGetCommentList(parseInt(pid));

  const commentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const valueToForm = (comment: string, pid: number) => {
    return {
      post_id: pid,
      content: comment,
    };
  };

  const postNewComment = usePostNewComment();

  return (
    <>
      <textarea
        spellCheck="false"
        className="flex justify-center w-full px-2 py-2 mt-1 bg-gray-200 rounded-lg sm:mt-2 sm:py-5 text-ftBlick"
        onChange={e => {
          commentHandler(e);
        }}
        value={comment}
      />
      <div className="flex justify-end mt-1 sm:mt-2 sm:mb-5 bg-bgWhite ">
        <div
          className="w-full p-1 text-xs text-center bg-blue-500 rounded-sm cursor-pointer md:p-2 md:w-1/6 md:text-base hover:opacity-70"
          onClick={() => {
            if (window.confirm('정말 작성합니까?')) {
              postNewComment.mutate(valueToForm(comment, parseInt(pid)));
              setComment('');
              commentList.refetch();
              alert('작성되었습니다.');
            } else {
              alert('취소합니다.');
            }
          }}
        >
          댓글 작성
        </div>
      </div>
    </>
  );
};

export default CommentWrite;
