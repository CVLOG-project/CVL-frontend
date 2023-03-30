import axios from 'axios';
import { CreateNewPostReq } from './type';

export const fetchCreateNewPost = async (
  params: CreateNewPostReq,
  accessToken: string
) => {
  const { data } = await axios.post<CreateNewPostReq>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,
    params,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};
