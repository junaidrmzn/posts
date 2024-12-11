import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '@/pages/auth';
import { useSignupMutation, useLoginMutation } from '@/features/auth';

jest.mock('@/features/auth', () => ({
  useSignupMutation: jest.fn(),
  useLoginMutation: jest.fn(),
}));

describe('AuthPage', () => {
  const mockSignup = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useSignupMutation as jest.Mock).mockReturnValue({
      mutate: mockSignup,
      isLoading: false,
    });
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mockLogin,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login and signup toggle buttons', () => {
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText('login')).toBeInTheDocument();
    expect(screen.getByLabelText('signup')).toBeInTheDocument();
  });

  it('switches between login and signup modes', () => {
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>,
    );

    // Verify default is login
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    // Switch to signup
    fireEvent.click(screen.getByLabelText('signup'));
    expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
  });

  it('calls signup on signup button click', async () => {
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByLabelText('signup')); // Switch to signup

    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    const signupButton = screen.getByRole('button', { name: 'Signup' });
    fireEvent.click(signupButton);

    await waitFor(() =>
      expect(mockSignup).toHaveBeenCalledWith(
        {
          email: 'john@example.com',
          password: 'password123',
          firstname: 'John',
          lastname: 'Doe',
        },
        expect.any(Object),
      ),
    );
  });

  it('calls login on login button click', async () => {
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith(
        {
          email: 'john@example.com',
          password: 'password123',
        },
        expect.any(Object),
      ),
    );
  });
});
