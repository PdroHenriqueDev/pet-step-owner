import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Account from '../screens/account';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import HomeIcon from '../components/icons/home';
import PaymentIcon from '../components/icons/payment';
import HomeStack from './homeStack';
import PaymentStack from './paymentStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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
      })}>
      <Screen
        name="Home"
        component={HomeStack}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
          const isHiddenRoute = routeName !== 'HomeScreen';

          return {
            tabBarIcon: HomeIcon,
            headerShown: false,
            tabBarStyle: {
              ...globalStyles.tabar,
              display: isHiddenRoute ? 'none' : 'flex',
            },
          };
        }}
      />
      <Screen
        name="Pagamento"
        component={PaymentStack}
        options={({route}) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'PaymentScreen';
          const isHiddenRoute = routeName !== 'PaymentScreen';

          return {
            tabBarIcon: PaymentIcon,
            headerShown: false,
            tabBarStyle: {
              ...globalStyles.tabar,
              display: isHiddenRoute ? 'none' : 'flex',
            },
          };
        }}
      />
      <Screen name="Conta" component={Account} />
    </Navigator>
  );
}

export default HomeTabs;
