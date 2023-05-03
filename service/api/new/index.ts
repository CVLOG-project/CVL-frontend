import { CreateNewPostReq } from './type';
import axios from '../../axios';

export const fetchCreateNewPost = async (params: CreateNewPostReq) => {
  const { data } = await axios.post<CreateNewPostReq>('/posts', params);

  return data;
};
