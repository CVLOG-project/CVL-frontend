export interface GetNewTokenApi {
  headers: {
    refreshToken: string;
    Authorization: string;
  };
}

export interface GetRefreshTokenApi {
  headers: {
    refreshToken: string;
    Authorization: string;
  };
}

export interface UserInfoApi {
  accessToken: string;
}
