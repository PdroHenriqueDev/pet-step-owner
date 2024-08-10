import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabs from './tabs';

function Routes() {
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  );
}

export default Routes;
