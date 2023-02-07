import axios from 'axios';
import { UserInfo } from 'recoil/atoms/type';
import { GetNewToken } from '../login/type';

export const postRefreshToken = async (params: GetNewToken) => {
  const { data } = await axios.post<GetNewToken>(
    'https://d682-211-106-114-186.jp.ngrok.io/auth/refresh',
    {},
    params
  );
  return data;
};

export const getUserInfo = async (params: string) => {
  const { data } = await axios.get<UserInfo>(
    'https://d682-211-106-114-186.jp.ngrok.io/users/info',
    {
      headers: {
        Authorization: `Bearer ${params}`,
      },
    }
  );

  return data.data;
};
