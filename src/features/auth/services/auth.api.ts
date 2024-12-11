import axiosClient from '@/apis/axios-client';
import { SignupData, AuthResponse, SigninData } from './types';

const authApi = {
  signup: (data: SignupData): Promise<AuthResponse> =>
    axiosClient.post('/auth/signup', data),
  signin: (data: SigninData): Promise<AuthResponse> =>
    axiosClient.post('/auth/login', data),
};

export default authApi;
