import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = ({ email, password }) => api.post('/auth/login', { email, password });
export const register = (userData: any) => api.post('/auth/register', userData);
export const getCustomerProfile = () => api.get('/customers/profile');
export const getTailorProfile = () => api.get('/tailors/profile');
export const updateProfile = (profileData: any) => api.put('/users/profile', profileData);
export const updateTailorProfile = (profileData: any) => api.put('/tailors/profile', profileData);
export const updateCustomerProfile = (profileData: any) => api.put('/customers/profile', profileData);
export const getSignedUrl = (fileType: string) => api.get(`/upload/signedUrl?fileType=${fileType}`);
export const getProfilePictureUrl = () => api.get('/tailors/profile-picture-url');
export const updateProfilePicture = (formData: FormData) => api.put('/users/profile-picture', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export default api;
