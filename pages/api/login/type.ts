export interface GetNewTokenApi {
  headers: {
    refreshToken: string;
    Authorization: string;
  };
}

export interface GetRefreshTokenApi {
  data: {
    headers: {
      refreshToken: string;
      Authorization: string;
    };
    success: boolean;
  };
}

export interface UserInfoApi {
  accessToken: string;
}
