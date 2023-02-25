import {
  deleteComment,
  getCommentList,
  modifyComment,
  postNewComment,
} from 'pages/api/comment';
import { NewPostComment } from 'pages/api/comment/type';
import {
  ErrorResponse,
  handleGetErrors,
  handleMutateErrors,
} from 'pages/api/login';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const usePostNewComment = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: NewPostComment) => {
      return postNewComment(params, accessToken);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries();
      },
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};

export const useModifyComment = (params: number, accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return modifyComment(params, accessToken);
    },
    {
      onSuccess: () => {
        if (window.confirm('정말 수정합니까?')) {
          alert('수정되었습니다.');
        } else {
          alert('취소합니다.');
        }
        return queryClient.invalidateQueries();
      },
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};

export const useDeleteComment = (params: number, accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return deleteComment(params, accessToken);
    },
    {
      onSuccess: () => {
        if (window.confirm('정말 수정합니까?')) {
          alert('수정되었습니다.');
        } else {
          alert('취소합니다.');
        }
        return queryClient.invalidateQueries();
      },
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};

export const useGetCommentList = (params: number, accessToken: string) => {
  return useQuery({
    queryKey: ['commentList'],
    queryFn: () => {
      return getCommentList(params, accessToken);
    },
    onError: handleGetErrors,
  });
};
