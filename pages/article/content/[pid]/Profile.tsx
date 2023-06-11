import React from 'react';
import Image from 'next/image';
import { useGetUserInfo } from 'service/hooks/Login';

const Profile = () => {
  const getUserInfo = useGetUserInfo();
  return (
    <>
      <article className="flex items-end justify-center sm:mb-2">
        <figure className="w-14 h-14 sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] rounded-full">
          {getUserInfo.data && (
            <Image
              src={getUserInfo.data?.profile_image}
              alt={'프로필 이미지'}
              width={130}
              height={130}
              className="rounded-full"
            />
          )}
        </figure>
        <div className="mb-1 space-y-1 font-medium md:mb-5 dark:text-white">
          <h2 className="text-[7px] md:text-xs text-ftBlick pl-5">
            {getUserInfo.data && getUserInfo.data.name !== null
              ? getUserInfo.data.name
              : getUserInfo.data?.github_id}
          </h2>
          <div className="h-4 overflow-hidden text-[4px] text-gray-700 lg:text-xs w-36 sm:w-40 lg:w-60 xl:w-full dark:text-gray-400 pl-2 truncate">
            {getUserInfo.data && getUserInfo.data.description}
          </div>
        </div>
      </article>
    </>
  );
};

export default Profile;
