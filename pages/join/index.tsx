import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from 'components/Shared/Loader';
import Cookie from 'public/utils/Cookie';
import LocalStorage from 'public/utils/Localstorage';
axios.defaults.withCredentials = true;

const Join = ({ info, cookie }: JoinProps) => {
  const router = useRouter();

  //쿠키 분해
  const cookies = Object.fromEntries(
    cookie.split(';').map((cookie: string) => cookie.trim().split('='))
  );

  //localstorge,쿠키 저장
  useEffect(() => {
    LocalStorage.setItem('CVtoken', info.data.accessToken);
    Cookie.setItem('refreshToken', cookies.refreshToken, 1);
  }, [cookies.refreshToken, info.data.accessToken]);

  useEffect(() => {
    router.push('/about');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Loader />
    </div>
  );
};
export default Join;

//ssr 소셜 로그인 애러 해결
export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { code } = query;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login?code=${code}`,
    {
      withCredentials: true,
      timeout: 5000, // 5초 타임아웃 설정
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

type JoinProps = {
  info: Info;
  cookie: string;
};
