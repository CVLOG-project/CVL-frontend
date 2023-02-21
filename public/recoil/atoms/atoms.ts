import { atom } from 'recoil';

export const refreshTokenAtom = atom<string>({
  key: 'refreshToken',
  default: '',
});

export const accessTokenAtom = atom<string>({
  key: 'accessToken',
  default: '',
});
