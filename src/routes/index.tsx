import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Account from '../screens/account';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import HomeStackNavigator from '../screens/home/routes';
import Header from '../components/header';
import HomeIcon from './icons/home';
const {Navigator, Screen} = createBottomTabNavigator();

const CustomHeader = (props: BottomTabHeaderProps) => <Header {...props} />;

function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: colors.dark,
          tabBarInactiveTintColor: colors.accent,
          tabBarStyle: {
            backgroundColor: colors.secondary,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 2,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: globalStyles.tabBarLabel,
          header: CustomHeader,
        })}>
        <Screen
          name="Inicio"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: HomeIcon,
          }}
        />
        <Screen name="Conta" component={Account} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
