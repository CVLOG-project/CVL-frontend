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

export const useGetList = (accessToken: string) => {
  return useQuery({
    queryKey: ['list'],
    queryFn: () => {
      return getList(accessToken);
    },
  });
};

export const useGetFolders = (accessToken: string) => {
  return useQuery({
    queryKey: ['tagsFolder'],
    queryFn: () => {
      return fetchGetTagsFolders(accessToken);
    },
  });
};

export const useCreateFolders = (accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation<CreateTagsFolderRes, void, CreateTagsFolderReq>(
    (params: CreateTagsFolderReq) => {
      return fetchCreateTagsFolders(params, accessToken);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(accessToken);
      },
    }
  );
};

export const useRemoveFolders = (params: number, accessToken: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return fetchRemoveTagsFolders(params, accessToken);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries();
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
        return queryClient.invalidateQueries();
      },
    }
  );
};
