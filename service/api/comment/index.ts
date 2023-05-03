import { CommentType, NewPostComment } from './type';
import axios from '../../axios';

export const postNewComment = async (params: NewPostComment) => {
  const { data } = await axios.post('/comments', {
    post_id: params.post_id,
    content: params.content,
  });
  return data;
};

export const modifyComment = async (params: number) => {
  const { data } = await axios.put(`/comment/${params}`);
  return data;
};

export const deleteComment = async (params: number) => {
  const { data } = await axios.delete(`/comment/${params}`);
  return data;
};

export const getCommentList = async (params: number) => {
  const { data } = await axios.get<CommentType>(`/comments/${params}`);

  return data;
};
