import axios from 'axios';
import { UserInfo } from 'public/recoil/atoms/type';
import Cookie from 'public/utils/Cookie';
import LocalStorage from 'public/utils/Localstorage';
import { GetNewTokenApi } from '../login/type';

export const handleGetErrors = async (error: ErrorResponse) => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;
  const refreshToken = Cookie.getItem('refreshToken') as string;
  const refreshParams = {
    headers: {
      refreshToken: refreshToken,
      Authorization: `Bearer ${accessToken}`,
    },
  };
  if (error.response && error.response.status === 401) {
    const newToken = await postRefreshToken(refreshParams);
    await LocalStorage.setItem('CVtoken', newToken.data.accessToken);
    await window.location.reload();
  }
};

export const handleMutateErrors = async (
  error: ErrorResponse
): Promise<void> => {
  const accessToken = LocalStorage.getItem('CVtoken') as string;
  const refreshToken = Cookie.getItem('refreshToken') as string;
  const refreshParams = {
    headers: {
      refreshToken: refreshToken,
      Authorization: `Bearer ${accessToken}`,
    },
  };
  if (error.response?.status === 401) {
    await alert('다시 시도해주세요.');
    const newToken = await postRefreshToken(refreshParams);
    await LocalStorage.setItem('CVtoken', newToken.data.accessToken);
  }
};

export const postRefreshToken = async (params: GetNewTokenApi) => {
  const { data } = await axios.post(
    `${process.env.NEXT_API_BASE_URL}/auth/refresh`,
    {},
    params
  );
  return data;
};

export const getUserInfo = async (params: string) => {
  const { data } = await axios.get<UserInfo>(
    `${process.env.NEXT_API_BASE_URL}/users/info`,
    {
      headers: {
        Authorization: `Bearer ${params}`,
      },
    }
  );

  return data.data;
};

export interface ErrorResponse {
  response: {
    status: number;
  };
}
