import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabs from './tabs';
import {AuthStack} from './authStack';
import {useAuth} from '../contexts/authContext';

function Routes() {
  const {
    accessToken,
    refreshToken,
    userId,
    setAuthTSession,
    fetchUser,
    logout,
  } = useAuth();

  // useEffect(() => {
  //   logout();
  // }, []);

  useEffect(() => {
    setAuthTSession();
    fetchUser();
  }, [fetchUser, setAuthTSession]);

  const renderContent = () => {
    // if (isLoading) {
    //   return <SplashScreen />;
    // }

    if (!accessToken || !refreshToken || !userId) {
      return <AuthStack />;
    }

    // if (user?.status === DogWalkerApplicationStatus.PendingTerms) {
    //   return <TermsOfService />;
    // }

    return <HomeTabs />;
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
}

export default Routes;
