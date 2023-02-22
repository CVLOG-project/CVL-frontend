import axios from 'axios';
import { Content } from 'pages/article/content/[pid]';
import { DeleteDetail, PatchDetailType } from './type';
import { BASE_URL } from '../axios';
import { CreateNewPostReq } from '../new/type';

export const getDetail = async (params: number, accessToken: string) => {
  const { data } = await axios.get<Content>(`${BASE_URL}/posts/${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data;
};

export const deleteDetail = async (params: number, accessToken: string) => {
  const { data } = await axios.delete<DeleteDetail>(
    `${BASE_URL}/posts/${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const patchDetail = async (params: number, accessToken: string) => {
  const { data } = await axios.patch<PatchDetailType>(
    `${BASE_URL}/posts/${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const fetchCreateModifyPost = async (
  params: CreateNewPostReq,
  accessToken: string,
  pid: number
) => {
  const { data } = await axios.put<CreateNewPostReq>(
    `${BASE_URL}/posts/${pid}`,
    params,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};
