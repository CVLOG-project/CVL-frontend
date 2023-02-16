import { atom } from 'recoil';

export const refreshTokenAtom = atom<string>({
  key: 'refreshToken',
  default: '',
});

export const accessTokenAtom = atom<string | boolean>({
  key: 'accessToken',
  default: '',
});
