import { atom } from 'recoil';
import { UserInfo } from './type';

export const refreshTokenAtom = atom<string>({
  key: 'refreshToken',
  default: '',
});

export const accessTokenAtom = atom<string>({
  key: 'accessToken',
  default: '',
});

export const listIndexAtom = atom<number>({
  key: 'listIndex',
  default: 999999,
});
