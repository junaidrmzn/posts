import { FC } from 'react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Modal,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type Input = {
  title: string;
  content: string;
};

type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (body: Input) => void;
  isSubmitting: boolean;
};

const CreatePostModal: FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Input>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleFormSubmit = (data: Input) => {
    onSubmit(data);
    reset({ title: '', content: '' });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSubmitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          component="form"
          className="w-3/5 py-10 px-5 bg-white dark:bg-slate-700 rounded-xl"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            defaultValue="" // Ensure defaultValue is set
            render={({ field }) => (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  {...field}
                  error={!!errors.title}
                  label="Post Title"
                />
                {errors.title && (
                  <FormHelperText error>{errors.title.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            defaultValue="" // Ensure defaultValue is set
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  error={!!errors.content}
                  label="Post Content"
                  multiline
                  rows={4}
                />
                {errors.content && (
                  <FormHelperText error>
                    {errors.content.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <div className="mt-5 flex justify-end">
            <Button type="submit" size="small" variant="contained">
              Submit
            </Button>
          </div>
        </Box>
      </>
    </Modal>
  );
};

export default CreatePostModal;
