import React, { useState } from 'react';
import { Avatar } from 'flowbite-react';

const Profile = () => {
  const [write, setWrite] = useState(true);

  return (
    <Avatar img={MYPAGE_PROFILE_DATA.img} rounded={true} size="2xl">
      <div className="flex flex-col space-y-1 font-medium dark:text-white lg:w-full ">
        {write ? (
          <>
            <div className="overflow-hidden text-2xl w-52 lg:w-96 lg:ml-20">
              {MYPAGE_PROFILE_DATA.name}
            </div>
            <div className="w-48 overflow-hidden text-sm lg:w-96 lg:ml-20 lg:py-2">
              {MYPAGE_PROFILE_DATA.introduce}
            </div>
            <div
              className="w-20 p-2 text-xs text-center bg-blue-400 rounded-sm cursor-pointer lg:w-96 lg:ml-20 md:w-20 md:text-base hover:opacity-70"
              onClick={() => setWrite(!write)}
            >
              수정
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full h-8 text-white rounded-lg focus:pointer-events-none lg:h-base lg:w-96 lg:ml-20 bg-inherit"
              defaultValue={MYPAGE_PROFILE_DATA.name}
              spellCheck={false}
            />
            <input
              type="text"
              className="w-full h-8 text-white rounded-lg lg:h-base lg:w-96 lg:ml-20 bg-inherit"
              defaultValue={MYPAGE_PROFILE_DATA.introduce}
              spellCheck={false}
            />
            <div className="flex flex-col justify-between mt-3 lg:flex-row ">
              <div className="flex ">
                <div className="w-full p-2 text-xs text-center bg-blue-400 rounded-sm cursor-pointer lg:ml-20 md:w-28 md:text-base hover:opacity-70">
                  이미지 업로드
                </div>
                <div className="w-full p-2 text-xs text-center bg-red-400 rounded-sm cursor-pointer lg:ml-4 md:w-24 md:text-base hover:opacity-70">
                  이미지 제거
                </div>
              </div>
              <div
                className="w-full p-2 mt-1 text-xs text-center bg-blue-400 rounded-sm cursor-pointer lg:mt-0 lg:mt-base lg:ml-4 md:w-20 md:text-base hover:opacity-70"
                onClick={() => setWrite(!write)}
              >
                완료
              </div>
            </div>
          </>
        )}
      </div>
    </Avatar>
  );
};

export default Profile;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.
const MYPAGE_PROFILE_DATA = {
  id: 0,
  img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
  name: 'wjdrhksgns7602',
  introduce: '간단 자기소개',
};
