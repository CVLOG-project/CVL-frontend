import { useMutation, useQuery } from 'react-query';
import {
  fetchCreateTagsFolders,
  fetchGetTagsFolders,
  fetchRemoveTagsFolders,
} from 'pages/api/tag';
import { CreateTagsFolderReq, CreateTagsFolderRes } from 'pages/api/tag/type';

export const useGetFolders = () => {
  return useQuery({
    queryKey: ['tagsFolder'],
    queryFn: () => {
      return fetchGetTagsFolders();
    },
  });
};

export const useCreateFolders = () => {
  return useMutation<CreateTagsFolderRes, void, CreateTagsFolderReq>(
    async (params: CreateTagsFolderReq) => {
      return await fetchCreateTagsFolders(params);
    }
  );
};

export const useRemoveFolders = (params: number) => {
  return useMutation(async () => {
    return await fetchRemoveTagsFolders(params);
  });
};
