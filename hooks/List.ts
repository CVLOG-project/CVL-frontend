import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  fetchCreateTagsFolders,
  fetchGetTagsFolders,
  fetchRemoveTagsFolders,
  getList,
  putTagsFolders,
} from 'pages/api/tag';
import {
  CreateTagsFolderReq,
  CreateTagsFolderRes,
  UpdateForm,
} from 'pages/api/tag/type';
import {
  ErrorResponse,
  handleGetErrors,
  handleMutateErrors,
} from 'pages/api/login';

export const useGetList = (accessToken: string, page: number) => {
  return useQuery({
    queryKey: ['list'],
    queryFn: () => {
      return getList(accessToken, page);
    },
    onError: handleGetErrors,
    retry: 0,
  });
};

export const useGetFolders = (accessToken: string) => {
  return useQuery({
    queryKey: ['tagsFolder'],
    queryFn: () => {
      return fetchGetTagsFolders(accessToken);
    },
    onError: handleGetErrors,
    retry: 0,
  });
};

export const useCreateFolders = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation<CreateTagsFolderRes, ErrorResponse, CreateTagsFolderReq>(
    (params: CreateTagsFolderReq) => {
      return fetchCreateTagsFolders(params, accessToken);
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

export const useRemoveFolders = (params: number, accessToken: string) => {
  const queryClient = useQueryClient();
  const queryGetTagsFolders = useGetFolders(accessToken);
  return useMutation(
    () => {
      return fetchRemoveTagsFolders(params, accessToken);
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

export const usePutTagsFolder = (params: UpdateForm, accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return putTagsFolders(params, accessToken);
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
