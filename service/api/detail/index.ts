import { Content } from 'pages/article/content/[pid]';
import { DeleteDetail, PatchDetailType } from './type';
import axios from '../../axios';
import { CreateNewPostReq } from '../new/type';

export const getDetail = async (params: number) => {
  const { data } = await axios.get<Content>(`/posts/${params}`);

  return data.data;
};

export const deleteDetail = async (params: number) => {
  const { data } = await axios.delete<DeleteDetail>(`/posts/${params}`);
  return data;
};

export const patchDetail = async (params: number) => {
  const { data } = await axios.patch<PatchDetailType>(`/posts/${params}`);
  return data;
};

export const fetchCreateModifyPost = async (
  params: CreateNewPostReq,
  pid: number
) => {
  const { data } = await axios.put<CreateNewPostReq>(`/posts/${pid}`, params);
  return data;
};
