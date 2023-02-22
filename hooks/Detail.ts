import {
  deleteDetail,
  fetchCreateModifyPost,
  getDetail,
  patchDetail,
} from 'pages/api/detail';
import { CreateNewPostReq } from 'pages/api/new/type';
import { useMutation, useQuery } from 'react-query';

export const useGetDetail = (params: number, accessToken: string) => {
  return useQuery({
    queryKey: ['detail'],
    queryFn: () => {
      return getDetail(params, accessToken);
    },
  });
};

export const DeleteDetail = (params: number, accessToken: string) => {
  deleteDetail(params, accessToken);
};

export const PatchDetail = (params: number, accessToken: string) => {
  patchDetail(params, accessToken);
};

export const useModifyPost = (accessToken: string, pid: number) => {
  return useMutation<CreateNewPostReq, void, CreateNewPostReq>(
    (params: CreateNewPostReq) => {
      return fetchCreateModifyPost(params, accessToken, pid);
    },
    {
      onSuccess: () => {
        alert('성공적으로 저장되었습니다.');
      },
    }
  );
};
