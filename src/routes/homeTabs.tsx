import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Account from '../screens/account';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import HomeIcon from './icons/home';

const {Navigator, Screen} = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.accent,
        tabBarStyle: globalStyles.tabar,
        tabBarLabelStyle: globalStyles.tabBarLabel,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Screen name="Conta" component={Account} />
    </Navigator>
  );
}

export default HomeTabs;
