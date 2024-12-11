import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useSignupMutation, useLoginMutation } from '@/features/auth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const navigate = useNavigate();
  const { mutate: signup, status } = useSignupMutation();
  const signupLoading = status === 'pending';

  const { mutate: login, status: s } = useLoginMutation();
  const loginLoading = s === 'pending';

  const handleAuthModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'login' | 'signup',
  ) => {
    console.log(event);
    if (newMode) setAuthMode(newMode);
  };

  const handleSignup = () => {
    signup(
      { email, password, firstname, lastname },
      {
        onSuccess: () => {
          navigate('/home');
        },
      },
    );
  };

  const handleLogin = () => {
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate('/home');
        },
      },
    );
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <ToggleButtonGroup
          value={authMode}
          exclusive
          onChange={handleAuthModeChange}
          aria-label="authentication mode"
        >
          <ToggleButton value="login" aria-label="login">
            Login
          </ToggleButton>
          <ToggleButton value="signup" aria-label="signup">
            Signup
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {authMode === 'signup' && (
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSignup}
            disabled={signupLoading}
            sx={{ mb: 2 }}
          >
            {signupLoading ? <CircularProgress size={24} /> : 'Signup'}
          </Button>
        </Box>
      )}

      {authMode === 'login' && (
        <Box>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loginLoading}
          >
            {loginLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AuthPage;
