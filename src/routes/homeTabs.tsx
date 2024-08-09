import React from 'react';
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Account from '../screens/account';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import HomeIcon from './icons/home';
import Payment from '../screens/payment';
import PaymentIcon from './icons/payment';
import Header from '../components/header';
import NotificationHeader from '../components/header/notificationHeader';

const {Navigator, Screen} = createBottomTabNavigator();
const header = (props: BottomTabHeaderProps) => (
  <NotificationHeader {...props} />
);
function HomeTabs() {
  return (
    <Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.accent,
        tabBarStyle: globalStyles.tabar,
        tabBarLabelStyle: globalStyles.tabBarLabel,
        tabBarHideOnKeyboard: true,
      })}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
          header,
        }}
      />
      <Screen
        name="Pagamento"
        component={Payment}
        options={{
          tabBarIcon: PaymentIcon,
          headerShown: false,
        }}
      />
      <Screen name="Conta" component={Account} />
    </Navigator>
  );
}

export default HomeTabs;
