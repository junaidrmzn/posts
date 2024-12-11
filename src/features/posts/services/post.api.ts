import { PostData, PostDataMutation } from './types';
import axiosClient from '@/apis/axios-client';

const baseUrl = 'posts';

const postApi = {
  getList: (): Promise<PostData[]> => axiosClient.get(baseUrl),
  add: (body: PostDataMutation): Promise<PostData> =>
    axiosClient.post(baseUrl, body),
};

export default postApi;
