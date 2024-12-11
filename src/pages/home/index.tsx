import React, { FC, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Grid,
  TextField,
} from '@mui/material';

import {
  PostDataMutation,
  useAddPostMutation,
  usePostListQuery,
} from '@/features/posts';
import { useModalStore } from '@/hooks';
import CreatePostModal from '@/layout/modal';
import { useAuth } from '@/provider/auth-provider';

const Posts: FC = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);
  const { isAuthenticated } = useAuth();

  const { data: posts, isLoading: loadingFetch } = usePostListQuery();
  const { mutate: addPost, status } = useAddPostMutation();

  const loadingCreate = status === 'pending';

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [posts, searchQuery]);

  const handleCreatePost = (body: PostDataMutation) => {
    addPost(body, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <React.Fragment>
      <CreatePostModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={handleCreatePost}
        isSubmitting={loadingCreate}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Posts
        </Typography>

        {isAuthenticated && (
          <IconButton onClick={open}>
            <AddIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {loadingFetch ? (
        <Box className="flex justify-center">
          <CircularProgress />
        </Box>
      ) : filteredPosts.length === 0 ? (
        <Box className="flex justify-center">
          <Typography>No posts match your search.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  boxShadow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {post.content}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Posts;
