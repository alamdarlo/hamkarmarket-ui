import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData, AuthContextType } from '@/types/auth';
import Cookies from 'js-cookie';
import api from '@/lib/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get('token');
      const storedUser = Cookies.get('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        // Verify token is still valid
        try {
          await api.get('/auth/verify');
        } catch (error) {
          // Token is invalid, clear storage
          Cookies.remove('token');
          Cookies.remove('user');
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      
      Cookies.set('token', newToken, { expires: 7 });
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('user');
    delete api.defaults.headers.common['Authorization'];
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    hasRole,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};