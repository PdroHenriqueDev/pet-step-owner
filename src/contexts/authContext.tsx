import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Owner} from '../interfaces/owner';
import {getOwner} from '../services/ownerService';

interface AuthContextProps {
  user: Owner | null;
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  logout: () => void;
  setAuthTSession: () => Promise<void>;
  storeTokens: (
    accessToken: string,
    refreshToken: string,
    userId: string,
  ) => Promise<void>;
  handleSetUser: (newUser: Owner) => void;
  fetchUser: () => void;
  refreshUserData: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  userId: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  setIsLoading: () => {},
  logout: () => {},
  setAuthTSession: async () => {},
  storeTokens: async () => {},
  handleSetUser: (_newUser: Owner) => {},
  fetchUser: async () => {},
  refreshUserData: async () => {},
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<Owner | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTokens = async (
    newAccessToken: string,
    newRefreshToken: string,
    newUserId: string,
  ) => {
    setIsLoading(true);
    try {
      await EncryptedStorage.setItem('accessToken', newAccessToken);
      await EncryptedStorage.setItem('refreshToken', newRefreshToken);
      await EncryptedStorage.setItem('userId', newUserId);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setUserId(newUserId);
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthTSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const resultAccessToken = await EncryptedStorage.getItem('accessToken');
      const resultRefreshToken = await EncryptedStorage.getItem('refreshToken');
      const resultUserId = await EncryptedStorage.getItem('userId');

      if (resultAccessToken && resultRefreshToken && resultUserId) {
        setAccessToken(resultAccessToken);
        setRefreshToken(resultRefreshToken);
        setUserId(resultUserId);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      await EncryptedStorage.removeItem('userId');

      setAccessToken(null);
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setUserId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = useCallback(async () => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await getOwner(userId);
      setUser(result);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const handleSetUser = (newUser: Owner) => {
    setUser(newUser);
  };

  const refreshUserData = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      const result = await getOwner(userId);
      setUser(result);
    } catch (error) {
      throw error;
    }
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        accessToken,
        refreshToken,
        isLoading,
        setIsLoading: handleLoading,
        logout: handleLogout,
        setAuthTSession,
        storeTokens: handleTokens,
        fetchUser,
        refreshUserData,
        handleSetUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
