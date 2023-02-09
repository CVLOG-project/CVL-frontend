import axios from 'axios';
import { CreateNewPostReq } from './type';

export const fetchCreateNewPost = async (params: CreateNewPostReq) => {
  const { data } = await axios.post<CreateNewPostReq>(
    'https://9fa3-121-169-182-117.jp.ngrok.io/posts',
    params
  );

  return data;
};
