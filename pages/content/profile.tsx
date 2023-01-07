import React from 'react';
import { Avatar } from 'flowbite-react';

const Profile = () => {
  return (
    <>
      <Avatar
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        rounded={true}
        className="w-40 pl-3 cursor-pointer md:w-full"
        size="lg"
      >
        <div className="space-y-1 font-medium dark:text-white ">
          <div className="text-md md:text-xs">{PROFILE_DATA.name}</div>
          <div className="h-4 overflow-hidden text-xs text-gray-500 w-36 sm:w-40 lg:w-80 dark:text-gray-400">
            {PROFILE_DATA.introduce}
          </div>
        </div>
      </Avatar>
    </>
  );
};

export default Profile;

//FIXME 백엔드 통신 시 삭제 될 목 데이터입니다.

const PROFILE_DATA = {
  id: 1,
  name: 'wjdrhksgns7602',
  introduce:
    '간단 자기소개 간단 자기소개 간단 자기소개 간단 자기소개 간단 자기소개 간단 자기소개 간단 자기소개',
};
