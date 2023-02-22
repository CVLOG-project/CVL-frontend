import axios from 'axios';
import { CommentType, NewPostComment } from './type';
import { BASE_URL } from '../axios';

export const postNewComment = async (
  params: NewPostComment,
  accessToken: string
) => {
  const { data } = await axios.post(
    `${BASE_URL}/comments`,
    { post_id: params.post_id, content: params.content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const modifyComment = async (params: number, accessToken: string) => {
  const { data } = await axios.put(`${BASE_URL}/comment/${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const deleteComment = async (params: number, accessToken: string) => {
  const { data } = await axios.delete(`${BASE_URL}/comment/${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getCommentList = async (params: number, accessToken: string) => {
  const { data } = await axios.get<CommentType>(
    `${BASE_URL}/comments/${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};
