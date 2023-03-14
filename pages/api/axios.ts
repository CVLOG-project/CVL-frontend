import axios from 'axios';

export const axiosMock = async (mockType: string) => {
  const axiosMockBase = axios.create({
    baseURL: `/mockData/${mockType}MockData.json`,
  });

  const response = await axiosMockBase.get('');

  return response.data;
};

export const BASE_URL =
  'http://logme-env.eba-9wyuhgza.ap-northeast-2.elasticbeanstalk.com';
