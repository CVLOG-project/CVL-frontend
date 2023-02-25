import { useMutation, useQuery } from 'react-query';
import {
  deleteDetail,
  fetchCreateModifyPost,
  getDetail,
  patchDetail,
} from 'pages/api/detail';
import { CreateNewPostReq } from 'pages/api/new/type';
import {
  ErrorResponse,
  handleGetErrors,
  handleMutateErrors,
} from 'pages/api/login';
import { useRouter } from 'next/router';

export const useGetDetail = (params: number, accessToken: string) => {
  return useQuery({
    queryKey: ['detail'],
    queryFn: () => {
      return getDetail(params, accessToken);
    },
    retry: 0,
    onError: handleGetErrors,
  });
};

export const DeleteDetail = (params: number, accessToken: string) => {
  return useMutation(
    () => {
      return deleteDetail(params, accessToken);
    },
    {
      retry: 0,
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};

export const PatchDetail = (params: number, accessToken: string) => {
  return useMutation(
    () => {
      return patchDetail(params, accessToken);
    },
    {
      retry: 0,
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};

export const useModifyPost = (accessToken: string, pid: number) => {
  const router = useRouter();
  return useMutation<CreateNewPostReq, ErrorResponse, CreateNewPostReq>(
    (params: CreateNewPostReq) => {
      return fetchCreateModifyPost(params, accessToken, pid);
    },
    {
      onSuccess: async () => {
        await alert('성공적으로 저장되었습니다.');
        await router.push('/article');
      },
      retry: 0,
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};
