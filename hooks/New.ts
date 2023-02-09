import { useMutation } from 'react-query';
import { fetchCreateNewPost } from 'pages/api/new';
import { CreateNewPostReq } from 'pages/api/new/type';

export const useCreatePost = () => {
  return useMutation<CreateNewPostReq, void, CreateNewPostReq>(
    (params: CreateNewPostReq) => {
      return fetchCreateNewPost(params);
    },
    {
      onSuccess: () => {
        alert('성공적으로 저장되었습니다.');
      },
    }
  );
};
