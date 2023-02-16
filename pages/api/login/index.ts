import axios from 'axios';
import { UserInfo } from 'public/recoil/atoms/type';
import { GetNewToken } from '../login/type';

export const postRefreshToken = async (params: GetNewToken) => {
  const { data } = await axios.post<GetNewToken>(
    'https://6239-121-169-182-117.jp.ngrok.io/auth/refresh',
    {},
    params
  );
  return data;
};

export const getUserInfo = async (params: string) => {
  const { data } = await axios.get<UserInfo>(
    'https://6239-121-169-182-117.jp.ngrok.io/users/info',
    {
      headers: {
        Authorization: `Bearer ${params}`,
      },
    }
  );

  return data.data;
};
