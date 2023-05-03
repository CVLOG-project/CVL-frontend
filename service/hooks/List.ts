import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ErrorResponse,
  handleGetErrors,
  handleMutateErrors,
} from 'service/api/login';
import {
  fetchCreateTagsFolders,
  fetchGetTagsFolders,
  fetchRemoveTagsFolders,
  getList,
  putTagsFolders,
} from 'service/api/tag';
import {
  CreateTagsFolderReq,
  CreateTagsFolderRes,
  UpdateForm,
} from 'service/api/tag/type';

export const useGetList = (page: number) => {
  return useQuery({
    queryKey: ['list'],
    queryFn: () => {
      return getList(page);
    },
    onError: handleGetErrors,
    retry: 0,
  });
};

export const useGetFolders = () => {
  return useQuery({
    queryKey: ['tagsFolder'],
    queryFn: () => {
      return fetchGetTagsFolders();
    },
    onError: handleGetErrors,
    retry: 0,
  });
};

export const useCreateFolders = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateTagsFolderRes, ErrorResponse, CreateTagsFolderReq>(
    (params: CreateTagsFolderReq) => {
      return fetchCreateTagsFolders(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tagsFolder');
      },
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};

export const useRemoveFolders = (params: number) => {
  const queryClient = useQueryClient();
  const queryGetTagsFolders = useGetFolders();
  return useMutation(
    () => {
      return fetchRemoveTagsFolders(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        queryGetTagsFolders.refetch();
      },
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};

export const usePutTagsFolder = (params: UpdateForm) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return putTagsFolders(params);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('tagsFolder');
      },
      onError: (error: ErrorResponse) => {
        handleMutateErrors(error);
      },
    }
  );
};
