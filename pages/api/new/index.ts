import axios from 'axios';
import { CreateNewPostReq } from './type';
import { BASE_URL } from '../axios';

export const fetchCreateNewPost = async (params: CreateNewPostReq) => {
  const { data } = await axios.post<CreateNewPostReq>(
    `${BASE_URL}/posts`,
    params,
    {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    }
  );

  return data;
};
