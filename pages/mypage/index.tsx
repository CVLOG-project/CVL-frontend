import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'components/Shared/LogmeNav/Profile';
import { UserInfo } from 'service/atoms/type';
import Profile from './components/profile';

const Mypage = () => {
  const [write, setWrite] = useState(true);
  const userInfo = useRecoilValue(userInfoAtom);

  const [render, setRender] = useState<UserInfo>();
  useEffect(() => {
    setRender(userInfo);
  }, [userInfo]);

  return (
    <div className="flex justify-center w-full min-h-screen ">
      <div className="flex flex-col justify-center py-10 my-10 rounded-lg sm:w-5/6 lg:w-4/6">
        <Profile />
        <section>
          <article className="flex flex-col justify-center w-full lg:px-10">
            <div className="flex justify-center w-full text-ftBlick">
              <div className="flex flex-col w-5/6 mt-4 border-t border-gray-500 md:mt-10 sm:flex-row ">
                <div className="p-3 text-xs font-bold w-28 sm:ml-1 sm:text-lg sm:w-44 lg:ml-0 ">
                  이메일 주소
                </div>
                <div className="w-full p-3 overflow-hidden text-xs truncate sm:ml-2 sm:text-base lg:mx-10">
                  {render && render.data.github_id}@github.com
                </div>
              </div>
            </div>
            <div className="justify-center hidden w-full text-xs text-gray-600 sm:flex lg:justify-start lg:text-base lg:mx-20 ">
              회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
            </div>
          </article>
          <article className="flex flex-col justify-center w-full lg:px-10">
            <div className="flex justify-center w-full">
              <div className="flex w-5/6 mt-4 border-t border-gray-500 md:mt-10 ">
                <div className="p-3 text-xs font-bold sm:ml-1 sm:text-lg lg:ml-0 text-ftBlick">
                  회원 탈퇴
                </div>
                <div
                  className="flex items-center justify-center h-8 p-1 mt-2 mb-3 ml-5 text-xs bg-red-400 rounded-sm cursor-pointer sm:mb-0 sm:ml-12 hover:text-gray-900 lg:h-10 lg:ml-24 lg:w-20 lg:text-sm hover:opacity-70"
                  onClick={() => alert('업데이트 중입니다')}
                >
                  회원 탈퇴
                </div>
              </div>
            </div>
            <div className="justify-center hidden w-full text-xs text-gray-600 sm:flex lg:text-base lg:justify-start lg:mx-20 lg:mt-3">
              탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Mypage;
