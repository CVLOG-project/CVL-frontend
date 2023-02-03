import axios from 'axios';
import { GetListType } from 'pages/list/ListView';
import {
  GetTagsFolderRes,
  CreateTagsFolderReq,
  CreateTagsFolderRes,
  RemoveTagsFolderRes,
  PutTagsFolderRes,
  UpdateForm,
} from './type';

export const getList = async () => {
  const { data } = await axios.get<GetListType>(
    'https://9fa3-121-169-182-117.jp.ngrok.io/posts'
  );

  return data.data;
};

export const fetchGetTagsFolders = async () => {
  const { data } = await axios.get<GetTagsFolderRes>(
    'https://9fa3-121-169-182-117.jp.ngrok.io/tag_folders'
  );

  return data.data;
};

export const fetchCreateTagsFolders = async (
  params: CreateTagsFolderReq
): Promise<CreateTagsFolderRes> => {
  const { data } = await axios.post<CreateTagsFolderRes>(
    'https://9fa3-121-169-182-117.jp.ngrok.io/tag_folders',
    params
  );
  return data;
};

export const fetchRemoveTagsFolders = async (params: number) => {
  const { data } = await axios.delete<RemoveTagsFolderRes>(
    `https://9fa3-121-169-182-117.jp.ngrok.io/tag_folders/${params}`
  );
  return data;
};

export const putTagsFolders = async (params: UpdateForm) => {
  const { data } = await axios.put<PutTagsFolderRes>(
    `https://9fa3-121-169-182-117.jp.ngrok.io/tags/${params.tag_id}/${params.folder_id}`
  );
  return data;
};
