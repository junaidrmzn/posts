import { AuthResponse, SignupData, SigninData } from '@/features/posts';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import authApi from '../services/auth.api';
import { useAuth } from '@/provider/auth-provider';

export const useSignupMutation = () => {
  const { login } = useAuth();
  return useMutation<AuthResponse, unknown, SignupData>({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      login(data.accessToken, 'data.refreshToken');
      toast.success('Signup successful!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Signup failed');
    },
  });
};

// Hook for Login
export const useLoginMutation = () => {
  const { login } = useAuth();
  return useMutation<AuthResponse, unknown, SigninData>({
    mutationFn: authApi.signin,
    onSuccess: (data) => {
      login(data.accessToken, 'data.refreshToken');
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });
};
