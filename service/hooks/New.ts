import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { ErrorResponse, handleMutateErrors } from 'service/api/login';
import { fetchCreateNewPost } from 'service/api/new';
import { CreateNewPostReq } from 'service/api/new/type';

export const useCreatePost = () => {
  const router = useRouter();
  return useMutation<CreateNewPostReq, ErrorResponse, CreateNewPostReq>(
    (params: CreateNewPostReq) => {
      return fetchCreateNewPost(params);
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
