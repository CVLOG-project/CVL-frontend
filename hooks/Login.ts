import { useMutation, useQuery } from 'react-query';
import { getUserInfo, postRefreshToken } from 'pages/api/login';
import { GetRefreshToken } from 'pages/api/login/type';

export const useRefreshToken = (params: GetRefreshToken) => {
  return useMutation(() => {
    return postRefreshToken(params);
  });
};

export const useGetUserInfo = (params: string) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      return getUserInfo(params);
    },
  });
};
