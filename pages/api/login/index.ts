import axios from 'axios';
import { UserInfo } from 'public/recoil/atoms/type';
import { BASE_URL } from '../axios';
import { GetNewTokenApi } from '../login/type';

export const postRefreshToken = async (params: GetNewTokenApi) => {
  const { data } = await axios.post<GetNewTokenApi>(
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
