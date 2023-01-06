import React, { useState } from 'react';
import Profile from './profile';

const Mypage = () => {
  const [write, setWrite] = useState(true);

  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col justify-center w-5/6 py-10 my-20 bg-gray-900 rounded-lg">
        <Profile />
        <section>
          <article className="flex flex-col justify-center w-full lg:px-10">
            <div className="flex justify-center w-full">
              <div className="flex w-5/6 mt-10 border-t border-gray-500 ">
                <div className="p-3 ml-1 text-lg font-bold w-44 lg:ml-0">
                  이메일 주소
                </div>
                <div className="w-full p-3 ml-2 overflow-hidden lg:mx-10 ">
                  {MYPAGE_DATA.email}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full text-xs text-gray-600 lg:justify-start lg:text-base lg:mx-20">
              회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
            </div>
          </article>
          <article className="flex flex-col justify-center w-full lg:px-10">
            <div className="flex justify-center w-full">
              <div className="flex w-5/6 mt-10 border-t border-gray-500 ">
                <div className="p-3 ml-1 text-lg font-bold lg:ml-0">
                  회원 탈퇴
                </div>
                <div
                  className="flex items-center justify-center h-8 p-1 mt-2 ml-12 text-xs bg-red-400 rounded-sm cursor-pointer hover:text-gray-900 lg:h-10 lg:ml-24 lg:w-20 lg:text-sm hover:opacity-70"
                  onClick={() => setWrite(!write)}
                >
                  회원 탈퇴
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full text-xs text-gray-600 lg:text-base lg:justify-start lg:mx-20 lg:mt-3">
              탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Mypage;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.
const MYPAGE_DATA = {
  id: 0,
  email: 'wjdrhksgns7602@github.com',
};
