export interface UserInfo {
  data: UserInfoType;
  success: boolean;
}
export interface UserInfoType {
  created_at: string;
  deleted_at: null;
  description: null | string;
  github_id: string;
  id: number;
  name: string;
  profile_image: string;
  refresh_token: string;
  updated_at: string;
}

export interface UserId {
  id: number;
}
