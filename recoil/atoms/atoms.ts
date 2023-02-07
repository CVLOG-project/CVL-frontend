import { atom } from 'recoil';
import { UserInfo } from './type';

export const refreshTokenAtom = atom<string>({
  key: 'refreshToken',
  default: '',
});

export const accessTokenAtom = atom<string | boolean>({
  key: 'accessToken',
  default: '',
});

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: {
    data: {
      created_at: '',
      deleted_at: null,
      description: null,
      github_id: '',
      id: 0,
      name: '',
      profile_image: '',
      refresh_token: '',
      updated_at: '',
    },
    success: false,
  },
});
