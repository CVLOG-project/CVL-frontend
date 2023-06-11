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

export interface SignOut {
  success: boolean;
  data: string;
}

export interface ErrorResponse {
  response: {
    status: number;
  };
}
