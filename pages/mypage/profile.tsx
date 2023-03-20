import React, { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from 'components/core/nav/Profile';
import { UserInfo } from 'public/recoil/atoms/type';

const Profile = () => {
  const [render, setRender] = useState<UserInfo>();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [write, setWrite] = useState(false);
  const [info, setInfo] = useState({
    name: userInfo.data.name ? userInfo.data.name : userInfo.data.github_id,
    introduce: '',
  });
  const [file, setFile] = useState<string>('');
  const [image, setImage] = useState<File>();
  useEffect(() => {
    setRender(userInfo);
  }, [userInfo]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formFile = Array.from(event.target.files || [])[0];
    if (!formFile) return;
    setImage(formFile);
    const imageUrl = URL.createObjectURL(formFile);
    setRender({
      ...userInfo,
      data: {
        ...userInfo.data,
        description: info.introduce,
        profile_image: imageUrl,
      },
    });
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [file]);

  const handleInputValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const postInfo = () => {
    alert('업데이트 중인 기능입니다. 재로그인시 초기화됩니다.');
    setWrite(!write);
    if (info.name === '' && info.introduce === '') {
      return;
    } else {
      const infoFormData: FormData = new FormData();

      infoFormData.append('name', info.name);
      infoFormData.append('introduce', info.introduce);
      image && infoFormData.append('image', image);
      setUserInfo({
        ...userInfo,
        data: {
          ...userInfo.data,
          name: info.name,
          profile_image: render ? render.data.profile_image : '',
        },
      });
      //FIXME formdata 확인용 삭제 예정

      // let entries = infoFormData.entries();
      // for (const pair of entries) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      // addInfo.mutate(infoFormData);
    } // 데이터 전송
  };
  return (
    <>
      {render && (
        <div className="flex flex-col px-5 xl:flex-row xl:mx-20">
          <div className="flex justify-center w-full xl:flex-col xl:w-60">
            <Image
              src={`${
                render.data ? render.data.profile_image : '/images/user.png'
              }`}
              alt="프로필 이미지"
              width={300}
              height={300}
              className="w-32 h-32 mx-3 mb-3 rounded-full sm:w-40 sm:h-40"
            />
            {write && (
              <div className="flex flex-col justify-end mb-10 ml-2 w-44 xl:mb-0">
                <>
                  <label
                    className="w-full p-2 text-xs text-center bg-gray-500 rounded-sm cursor-pointer lg:p-1 md:text-base hover:bg-black "
                    htmlFor="uploder"
                  >
                    이미지 업로드
                  </label>
                  <input
                    className="hidden"
                    id="uploder"
                    type="file"
                    onChange={handleChange}
                  />
                  <div
                    className="w-full p-2 mt-3 text-xs text-center bg-gray-500 rounded-sm cursor-pointer lg:p-1 lg:mt-0 md:text-base hover:bg-black"
                    onClick={async () => {
                      await setRender({
                        ...userInfo,
                        data: {
                          ...userInfo.data,
                          profile_image: '/images/user.png',
                        },
                      });
                      await setUserInfo(render);
                    }}
                  >
                    이미지 초기화
                  </div>
                </>
              </div>
            )}
          </div>
          <div className="flex flex-col md:px-5 lg:w-full lg:px-16 xl:px-0 lg:h-full lg:justify-center ">
            {write ? (
              <div className="flex flex-col justify-center md:mx-4 lg:mx-6 lg:mt-2">
                <input
                  type="text"
                  className="w-full h-8 rounded-lg text-ftBlick md:my-2 focus:pointer-events-none bg-inherit"
                  defaultValue={
                    render.data.name !== null
                      ? render.data.name
                      : '닉네임을 입력해주세요'
                  }
                  spellCheck={false}
                  onChange={handleInputValue}
                  name="name"
                />
                <textarea
                  defaultValue={info.introduce}
                  spellCheck={false}
                  onChange={handleInputValue}
                  name="introduce"
                  className="h-20 my-1 text-xs rounded-lg text-ftBlick md:text-base border-solid bg-inherit bg-bgWhite lg:h-32 border-[0.5px] border-gray-300 focus:border-gray-300 focus:border-solid focus:border-[0.5px] p-1"
                />
              </div>
            ) : (
              <div className=" w-60 sm:w-full lg:px-2 text-ftBlick">
                <div className="flex ">
                  <div className="w-20 p-1 ml-1 text-sm font-bold md:p-3 md:mt-1 sm:mt-0 sm:text-lg sm:w-32">
                    닉네임
                  </div>
                  <div className="flex items-center text-sm truncate md:p-3 text-ftBlick md:mt-1 md:text-base">
                    {info.name !== null ? info.name : '닉네임을 입력해주세요'}
                  </div>
                </div>
                <div className="h-12 mt-1 mb-1 text-xs md:mb-5 sm:px-4 sm:h-20 md:text-base ">
                  {info.introduce === ''
                    ? '간단한 자기소개를 해주세요.'
                    : info.introduce}
                </div>
              </div>
            )}
            <div className="flex justify-center ">
              {write ? (
                <div
                  className="w-full p-2 text-xs text-center bg-gray-500 rounded-sm cursor-pointer md:mx-4 md:mt-3 lg:mx-6 hover:bg-black"
                  onClick={() => {
                    postInfo();
                  }}
                >
                  완료
                </div>
              ) : (
                <div
                  className="w-full p-2 text-xs text-center bg-gray-500 rounded-sm cursor-pointer md:mx-4 md:mt-3 lg:mx-6 hover:bg-black"
                  onClick={() => setWrite(!write)}
                >
                  수정
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
