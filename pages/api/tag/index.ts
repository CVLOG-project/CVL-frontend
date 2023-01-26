import axios from 'axios';
import {
  GetTagsFolderRes,
  CreateTagsFolderReq,
  CreateTagsFolderRes,
  RemoveTagsFolderRes,
} from './type';

export const fetchGetTagsFolders = async () => {
  const { data } = await axios.get<GetTagsFolderRes>(
    'https://6a5b-121-169-182-117.jp.ngrok.io/tag_folders '
  );
  return data.data;
};

export const fetchCreateTagsFolders = async (
  params: CreateTagsFolderReq
): Promise<CreateTagsFolderRes> => {
  const { data } = await axios.post<CreateTagsFolderRes>(
    'https://6a5b-121-169-182-117.jp.ngrok.io/tag_folders',
    params
  );
  return data;
};

export const fetchRemoveTagsFolders = async (params: number) => {
  const { data } = await axios.delete<RemoveTagsFolderRes>(
    `https://6a5b-121-169-182-117.jp.ngrok.io/tag_folders/${params}`
  );
  return data;
};
