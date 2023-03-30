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

export const getList = async (accessToken: string, page: number) => {
  const { data } = await axios.get<GetListType>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/page/${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data.data;
};

export const fetchGetTagsFolders = async (accessToken: string) => {
  const { data } = await axios.get<GetTagsFolderRes>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag_folders`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data.data;
};

export const fetchCreateTagsFolders = async (
  params: CreateTagsFolderReq,
  accessToken: string
): Promise<CreateTagsFolderRes> => {
  const { data } = await axios.post<CreateTagsFolderRes>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag_folders`,
    params,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const fetchRemoveTagsFolders = async (
  params: number,
  accessToken: string
) => {
  const { data } = await axios.delete<RemoveTagsFolderRes>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag_folders/${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const putTagsFolders = async (
  params: UpdateForm,
  accessToken: string
) => {
  const { data } = await axios.put<PutTagsFolderRes>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/${params.tag_id}/${params.folder_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};
