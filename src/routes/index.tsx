import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabs from './tabs';
import {AuthStack} from './authStack';
import {useAuth} from '../contexts/authContext';
import SplashScreen from '../components/splash/splash';

function Routes() {
  const {
    accessToken,
    refreshToken,
    userId,
    setAuthTSession,
    fetchUser,
    isLoading,
  } = useAuth();

  useEffect(() => {
    setAuthTSession();
    fetchUser();
  }, [fetchUser, setAuthTSession]);

  const renderContent = () => {
    if (isLoading) {
      return <SplashScreen />;
    }

    if (!accessToken || !refreshToken || !userId) {
      return <AuthStack />;
    }

    return <HomeTabs />;
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
}

export default Routes;
