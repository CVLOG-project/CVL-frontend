import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Dropdown } from 'flowbite-react';
import { atom, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfo } from 'public/recoil/atoms/type';
import Cookie from 'public/utils/Cookie';
import LocalStorage from 'public/utils/Localstorage';
import Sessionstorage from 'public/utils/Sessionstorage';

const NavPriofile = ({ setAuthority }: Props) => {
  const [render, setRender] = useState<UserInfo>();
  const user = useRecoilValue(userInfoAtom);

  const accessToken = LocalStorage.getItem('CVtoken');
  const [cvAccessToken, setCvAcessToken] = useState(accessToken);

  const refreshToken = Cookie.getItem('refreshToken');
  const [cvRefreshToken, setCvRefreshToken] = useState(refreshToken);

  useEffect(() => {
    setRender(user);
    setCvAcessToken(accessToken);
    setCvRefreshToken(cvRefreshToken);
  }, [user, accessToken, cvRefreshToken]);

  //로그아웃
  const signOut = () => {
    if (window.confirm('로그아웃 하십니까?')) {
      axios
        .get('https://6239-121-169-182-117.jp.ngrok.io/auth/logout', {
          headers: {
            Authorization: `Bearer ${cvAccessToken}`,
            refreshToken: cvRefreshToken,
          },
        })
        .then(() => alert('로그아웃 되셨습니다.'));
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
      {render && (
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img={`${user && user.data?.profile_image}`}
              size="sm"
              rounded={true}
              className="lg:ml-1"
            />
          }
        >
          <Dropdown.Header className="flex justify-center w-40 m-1 mr-5 overflow-hidden text-black">
            {user && user.data ? user.data?.github_id : '아이디가 없어요'}
          </Dropdown.Header>
          <Dropdown.Header className="flex justify-center w-40 m-1 mr-5 overflow-hidden text-black">
            {user && user.data ? user.data?.name + '님 환영합니다' : ''}
          </Dropdown.Header>
          <Dropdown.Item
            className="flex justify-center"
            onClick={() => signOut()}
          >
            <div>로그아웃</div>
          </Dropdown.Item>
        </Dropdown>
      )}
    </nav>
  );
};

export default NavPriofile;

const recoilLocalStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: recoilLocalStorage,
});

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: {
    data: {
      created_at: '',
      deleted_at: null,
      description: null,
      github_id: '',
      id: 0,
      name: '',
      profile_image: '',
      refresh_token: '',
      updated_at: '',
    },
    success: false,
  },
  effects_UNSTABLE: [persistAtom],
});

interface Props {
  setAuthority: Dispatch<SetStateAction<boolean>>;
}
