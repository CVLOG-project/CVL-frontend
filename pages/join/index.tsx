import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Image from 'next/image';

axios.defaults.withCredentials = true;

const Join = ({ info, refreshToken }: { info: Info; refreshToken: string }) => {
  //쿠키 분해
  const cookies = Object.fromEntries(
    refreshToken.split(';').map((cookie: string) => cookie.trim().split('='))
  );
  //쿠키 저장
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
  }, [info]);

  //jwt 분해
  // function parseJwt(token: string) {
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   if (typeof window === 'undefined') return;
  //   const jsonPayload = decodeURIComponent(
  //     window
  //       .atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );

  //   return JSON.parse(jsonPayload);
  // }

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
    { withCredentials: true }
  );
  const info = response.data;
  const setLocalCookie: string[] = response.headers['set-cookie'] as string[];
  const refreshToken: string = setLocalCookie[0];

  return { props: { info, refreshToken } };
};
export interface Info {
  data: AccessToken;
}

interface AccessToken {
  accessToken: string;
}
