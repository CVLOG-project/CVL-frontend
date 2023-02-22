import axios from 'axios';
import { UserInfo } from 'public/recoil/atoms/type';
import { BASE_URL } from '../axios';
import { GetNewToken } from '../login/type';

export const postRefreshToken = async (params: GetNewToken) => {
  const { data } = await axios.post<GetNewToken>(
    `${BASE_URL}/auth/refresh`,
    {},
    params
  );
  return data;
};

export const getUserInfo = async (params: string) => {
  const { data } = await axios.get<UserInfo>(`${BASE_URL}/users/info`, {
    headers: {
      Authorization: `Bearer ${params}`,
    },
  });

  return data.data;
};
