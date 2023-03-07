import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userIdAtom } from 'components/core/nav';
import { userInfoAtom } from 'components/core/nav/Profile';
import { BASE_URL } from 'pages/api/axios';
import { accessTokenAtom, refreshTokenAtom } from 'public/recoil/atoms/atoms';
import Cookie from 'public/utils/Cookie';
import LocalStorage from 'public/utils/Localstorage';
axios.defaults.withCredentials = true;

const Join = ({ info, cookie }: { info: Info; cookie: string }) => {
  const [, setRefreshToken] = useRecoilState(refreshTokenAtom);
  const [, setAccessToken] = useRecoilState(accessTokenAtom);
  const [, setUerInfo] = useRecoilState(userInfoAtom);
  const [, setUserId] = useRecoilState(userIdAtom);
  const router = useRouter();

  //쿠키 분해
  const cookies = Object.fromEntries(
    cookie.split(';').map((cookie: string) => cookie.trim().split('='))
  );

  //localstorge,쿠키 저장
  LocalStorage.setItem('CVtoken', info.data.accessToken);
  Cookie.setItem('refreshToken', cookies.refreshToken, 1);

  const localCookie = Cookie.getItem('refreshToken');

  useEffect(() => {
    router.push('/about');
  }, [router]);

  //유저 정보 전역처리
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/info`, {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${info.data.accessToken}`,
        },
      })
      .then(res => {
        setUerInfo(res.data);
        setUserId(res.data.data.id);
      });
    localCookie && setRefreshToken(localCookie);
    setAccessToken(info.data.accessToken);
  }, [
    info.data.accessToken,
    localCookie,
    setRefreshToken,
    setAccessToken,
    setUerInfo,
  ]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="text-5xl">Loading....</div>
    </div>
  );
};
export default Join;

//ssr 소셜 로그인 애러 해결
export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { code } = query;

  const response = await axios.get(`${BASE_URL}/auth/login?code=${code}`, {
    withCredentials: true,
  });

  const info = response.data;
  const setLocalCookie: string[] = response.headers['set-cookie'] as string[];
  const cookie: string = setLocalCookie[0];

  return { props: { info, cookie } };
};
export interface Info {
  data: AccessToken;
}

interface AccessToken {
  accessToken: string;
}
