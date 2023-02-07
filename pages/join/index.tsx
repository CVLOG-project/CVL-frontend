import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {
  accessTokenAtom,
  refreshTokenAtom,
  userInfoAtom,
} from 'recoil/atoms/atoms';
axios.defaults.withCredentials = true;

const Join = ({ info, cookie }: { info: Info; cookie: string }) => {
  const [, setRefreshToken] = useRecoilState(refreshTokenAtom);
  const [, setAccessToken] = useRecoilState(accessTokenAtom);
  const [, setUerInfo] = useRecoilState(userInfoAtom);
  const router = useRouter();

  //쿠키 분해
  const cookies = Object.fromEntries(
    cookie.split(';').map((cookie: string) => cookie.trim().split('='))
  );

  //쿠키 저장 함수
  const setCookie = function (name: string, value: string, exp: number) {
    const date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie =
      name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  };

  //localstorge,쿠키 저장
  useEffect(() => {
    window.localStorage.setItem('CVtoken', info.data.accessToken);
    setCookie('refreshToken', cookies.refreshToken, 1);
  }, [info, cookies]);

  const getCookie = (name: string) => {
    const value =
      typeof window !== 'undefined'
        ? document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
        : '';
    return value ? value[2] : null;
  };
  const localCookie = getCookie('refreshToken');
  if (localCookie) {
    setRefreshToken(localCookie);
    setAccessToken(info.data.accessToken);
  }

  //페이지 전환
  setTimeout(() => {
    router.push('/');
  }, 0);

  //유저 정보 전역처리
  axios
    .get('https://d682-211-106-114-186.jp.ngrok.io/users/info', {
      headers: {
        Authorization: `Bearer ${info.data.accessToken}`,
      },
    })
    .then(res => setUerInfo(res.data));

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Image src="/images/github.png" alt="setting" width={300} height={300} />
      <div className="text-5xl">Loading....</div>
    </div>
  );
};
export default Join;

//ssr 소셜 로그인 애러 해결
export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { code } = query;

  const response = await axios.get(
    `https://d682-211-106-114-186.jp.ngrok.io/auth/login?code=${code}`,
    {
      withCredentials: true,
    }
  );

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
