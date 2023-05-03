import axios from 'axios';
import LocalStorage from 'public/utils/Localstorage';

const accessToken = LocalStorage.getItem('CVtoken') as string;

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const instance = axios.create(config);

export default instance;
