export interface GetNewToken {
  headers: {
    refreshToken: string;
    Authorization: string;
  };
}

export interface GetRefreshToken {
  headers: {
    refreshToken: string;
    Authorization: string;
  };
}
