import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getCustomerProfile, 
  getTailorProfile, 
  login as apiLogin,
  updateProfile,
  updateTailorProfile,
  updateCustomerProfile,
  getProfilePictureUrl
} from '../services/api';

interface User {
  data: {
    name: string;
    email: string;
    location: {
      type: string;
      coordinates: number[];
    };
    specialties: string[];
    profilePictureUrl?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateTailor: (userData: Partial<User>) => Promise<boolean>;
  updateCustomer: (userData: Partial<User>) => Promise<boolean>;
  updateProfilePicture: (file: File) => Promise<boolean>;
  fetchProfilePictureUrl: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const role = localStorage.getItem('userRole');
      const response = role === 'customer' ? await getCustomerProfile() : await getTailorProfile();
      setUser(response.data);
      localStorage.setItem('userDetails', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await updateProfile(userData);
      setUser(prevUser => ({ ...prevUser, ...response.data }));
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return false;
    }
  };

  const updateTailor = async (userData: Partial<User>) => {
    try {
      const response = await updateTailorProfile(userData);
      setUser(prevUser => ({ ...prevUser, ...response.data }));
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return false;
    }
  };

  const updateCustomer = async (userData: Partial<User>) => {
    try {
      const response = await updateCustomerProfile(userData);
      setUser(prevUser => ({ ...prevUser, ...response.data }));
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error('Failed to update customer profile:', error);
      return false;
    }
  };

  const login = async (credentials: any) => {
    try {
      const response = await apiLogin(credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      await fetchUserProfile();
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  const updateProfilePicture = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      const response = await updateProfile(formData);
      if (response.data.success) {
        setUser(prevUser => ({
          ...prevUser,
          data: { ...prevUser!.data, profilePictureUrl: response.data.data.profilePictureUrl }
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update profile picture:', error);
      return false;
    }
  };

  const fetchProfilePictureUrl = async () => {
    try {
      const response = await getProfilePictureUrl();
      return response.data.url;
    } catch (error) {
      console.error('Failed to fetch profile picture URL:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    updateUser,
    updateTailor,
    updateCustomer,
    updateProfilePicture,
    fetchProfilePictureUrl
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
