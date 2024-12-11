import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import postApi from '../services/post.api';
import { PostData } from '../services/types';

export const usePostListQuery = () => {
  return useQuery<PostData[]>({
    queryKey: ['posts'],
    queryFn: async () => await postApi.getList(),
  });
};

export const useAddPostMutation = () => {
  return useMutation({
    mutationFn: postApi.add,
    onSuccess: () => {
      toast.success('Post created successfully');
    },
    onError: () => {
      toast.error('Failed to create post');
    },
  });
};
