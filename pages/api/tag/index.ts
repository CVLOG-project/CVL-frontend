import axios from 'axios';
import { GetListType } from 'pages/article/ListView';
import {
  GetTagsFolderRes,
  CreateTagsFolderReq,
  CreateTagsFolderRes,
  RemoveTagsFolderRes,
  PutTagsFolderRes,
  UpdateForm,
} from './type';
import { BASE_URL } from '../axios';

export const getList = async () => {
  const { data } = await axios.get<GetListType>(`${BASE_URL}/posts`, {
    // headers: {
    //   Authorization: `Bearer ${refreshToken}`,
    // },
  });

  return data.data;
};

export const fetchGetTagsFolders = async () => {
  const { data } = await axios.get<GetTagsFolderRes>(
    `${BASE_URL}/tag_folders`,
    {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    }
  );

  return data.data;
};

export const fetchCreateTagsFolders = async (
  params: CreateTagsFolderReq
): Promise<CreateTagsFolderRes> => {
  const { data } = await axios.post<CreateTagsFolderRes>(
    `${BASE_URL}/tag_folders`,
    params,
    {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    }
  );
  return data;
};

export const fetchRemoveTagsFolders = async (params: number) => {
  const { data } = await axios.delete<RemoveTagsFolderRes>(
    `${BASE_URL}/tag_folders/${params}`,
    {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    }
  );
  return data;
};

export const putTagsFolders = async (params: UpdateForm) => {
  const { data } = await axios.put<PutTagsFolderRes>(
    `${BASE_URL}/tags/${params.tag_id}/${params.folder_id}`,
    {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    }
  );
  return data;
};
