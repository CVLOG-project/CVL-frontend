import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { fetchCreateNewPost } from 'pages/api/new';
import { CreateNewPostReq } from 'pages/api/new/type';

export const useCreatePost = (accessToken: string) => {
  const router = useRouter();
  return useMutation<CreateNewPostReq, void, CreateNewPostReq>(
    (params: CreateNewPostReq) => {
      return fetchCreateNewPost(params, accessToken);
    },
    {
      onSuccess: () => {
        alert('성공적으로 저장되었습니다.');
        router.push('/article');
      },
    }
  );
};
