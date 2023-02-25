import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { fetchCreateNewPost } from 'pages/api/new';
import { CreateNewPostReq } from 'pages/api/new/type';
import { ErrorResponse, handleMutateErrors } from 'pages/api/login';

export const useCreatePost = (accessToken: string) => {
  const router = useRouter();
  return useMutation<CreateNewPostReq, ErrorResponse, CreateNewPostReq>(
    (params: CreateNewPostReq) => {
      return fetchCreateNewPost(params, accessToken);
    },
    {
      onSuccess: () => {
        alert('성공적으로 저장되었습니다.');
        router.push('/article');
      },
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};
