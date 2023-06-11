import React, { Dispatch, SetStateAction } from 'react';
import { Avatar, Dropdown } from 'flowbite-react';
import Sessionstorage from 'public/utils/Sessionstorage';
import { useGetUserInfo } from 'service/hooks/Login';
import { signOut } from '../../../service/api/login/index';
import Loader from '../Loader';

const NavPriofile = ({ setAuthority }: Props) => {
  const info = useGetUserInfo().data;

  //로그아웃

  const handleSignOut = () => {
    if (window.confirm('로그아웃 하십니까?')) {
      signOut();
      //쿠키 삭제
      const deleteCookie = function (name: string) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
      };
      deleteCookie('refreshToken');
      localStorage.removeItem('CVtoken');
      Sessionstorage.removeItem('recoil-persist');
      setAuthority(false);
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  };

  return (
    <nav>
      {info ? (
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img={`${info && info.profile_image}`}
              size="md"
              rounded={true}
              className="lg:ml-1"
            />
          }
        >
          <Dropdown.Header className="flex justify-center w-40 m-1  overflow-hidden text-black ">
            {info ? info.github_id : '아이디가 없어요'}
          </Dropdown.Header>
          <Dropdown.Header className="flex justify-center w-40 m-1  overflow-hidden text-black">
            {info && info.name !== null
              ? info.name + '님 환영합니다'
              : '이름을 등록해주세요'}
          </Dropdown.Header>
          <Dropdown.Item
            className="flex justify-center"
            onClick={() => handleSignOut()}
          >
            <div>로그아웃</div>
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Loader />
      )}
    </nav>
  );
};

export default NavPriofile;

interface Props {
  setAuthority: Dispatch<SetStateAction<boolean>>;
}
