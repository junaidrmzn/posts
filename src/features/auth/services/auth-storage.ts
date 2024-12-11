export const saveAuthToken = (token: string, id: string) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('userId', id);
};

export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
};

export const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};
