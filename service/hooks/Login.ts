import { useMutation, useQuery } from 'react-query';
import {
  getUserInfo,
  handleGetErrors,
  postRefreshToken,
} from 'service/api/login';
import { GetNewTokenApi } from 'service/api/login/type';

export const useRefreshToken = (params: GetNewTokenApi) => {
  return useMutation(() => {
    return postRefreshToken(params);
  });
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      return getUserInfo();
    },
    onError: handleGetErrors,
    retry: 0,
  });
};
