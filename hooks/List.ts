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

export const useGetList = () => {
  return useQuery({
    queryKey: ['list'],
    queryFn: () => {
      return getList();
    },
  });
};

export const useGetFolders = () => {
  return useQuery({
    queryKey: ['tagsFolder'],
    queryFn: () => {
      return fetchGetTagsFolders();
    },
  });
};

export const useCreateFolders = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateTagsFolderRes, void, CreateTagsFolderReq>(
    (params: CreateTagsFolderReq) => {
      return fetchCreateTagsFolders(params);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries();
      },
    }
  );
};

export const useRemoveFolders = (params: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return fetchRemoveTagsFolders(params);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries();
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
        return queryClient.invalidateQueries();
      },
    }
  );
};
