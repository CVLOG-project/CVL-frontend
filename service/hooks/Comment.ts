import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  deleteComment,
  getCommentList,
  modifyComment,
  postNewComment,
} from 'service/api/comment';
import { NewPostComment } from 'service/api/comment/type';
import {
  ErrorResponse,
  handleGetErrors,
  handleMutateErrors,
} from 'service/api/login';

export const usePostNewComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: NewPostComment) => {
      return postNewComment(params);
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

export const useModifyComment = (params: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return modifyComment(params);
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

export const useDeleteComment = (params: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return deleteComment(params);
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

export const useGetCommentList = (params: number) => {
  return useQuery({
    queryKey: ['commentList'],
    queryFn: () => {
      return getCommentList(params);
    },
    onError: handleGetErrors,
  });
};
