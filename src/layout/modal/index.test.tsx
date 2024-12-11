import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePostModal from '.';

describe('CreatePostModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  const renderComponent = (isOpen = true, isSubmitting = false) => {
    render(
      <CreatePostModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        isSubmitting={isSubmitting}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when open', () => {
    renderComponent();

    expect(screen.getByLabelText(/Post Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Post Content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('does not render the modal when not open', () => {
    renderComponent(false);

    expect(screen.queryByLabelText(/Post Title/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Post Content/i)).not.toBeInTheDocument();
  });

  it('displays validation errors when submitting an empty form', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Content is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is valid', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Post Title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/Post Content/i), {
      target: { value: 'Test Content' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Title',
        content: 'Test Content',
      });
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('resets the form after submission', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Post Title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/Post Content/i), {
      target: { value: 'Test Content' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Post Title/i)).toHaveValue('');
      expect(screen.getByLabelText(/Post Content/i)).toHaveValue('');
    });
  });

  it('calls onClose when the modal is closed', () => {
    renderComponent();

    fireEvent.click(document.querySelector('.MuiBackdrop-root')!);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
