import React from 'react';

const CommentWrite = () => {
  return (
    <>
      <textarea className="flex justify-center w-full py-5 mt-2 rounded-lg bg-slate-600" />
      <div className="flex justify-end mt-2 mb-5">
        <div className="w-full p-2 text-xs text-center bg-blue-400 rounded-sm cursor-pointer md:w-20 md:text-base hover:opacity-70">
          댓글 작성
        </div>
      </div>
    </>
  );
};

export default CommentWrite;
