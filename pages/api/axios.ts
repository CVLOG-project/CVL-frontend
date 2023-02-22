import axios from 'axios';

export const axiosMock = async (mockType: string) => {
  const axiosMockBase = axios.create({
    baseURL: `/mockData/${mockType}MockData.json`,
  });

  const response = await axiosMockBase.get('');

  return response.data;
};

export const BASE_URL = 'https://6239-121-169-182-117.jp.ngrok.io';
