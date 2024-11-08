import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import HomeIcon from '../components/icons/home';
import PaymentIcon from '../components/icons/payment';
import HomeStack from './homeStack';
import PaymentStack from './paymentStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HistoryStack from './historyStack';
import HistorytIcon from '../components/icons/history';
import AccountStack from './accountStack';
import AccountIcon from '../components/icons/account';
import HelpStack from './helpStack';
import HelpIcon from '../components/icons/support';

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
        name="Histórico"
        component={HistoryStack}
        options={({route}) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'HistoryScreen';
          const isHiddenRoute = routeName !== 'HistoryScreen';

          return {
            tabBarIcon: HistorytIcon,
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
      <Screen
        name="Ajuda"
        component={HelpStack}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HelpScreen';
          const isHiddenRoute = routeName !== 'HelpScreen';

          return {
            tabBarIcon: HelpIcon,
            headerShown: false,
            tabBarStyle: {
              ...globalStyles.tabar,
              display: isHiddenRoute ? 'none' : 'flex',
            },
          };
        }}
      />
      <Screen
        name="Conta"
        component={AccountStack}
        options={({route}) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'AccountScreen';
          const isHiddenRoute = routeName !== 'AccountScreen';

          return {
            tabBarIcon: AccountIcon,
            headerShown: false,
            tabBarStyle: {
              ...globalStyles.tabar,
              display: isHiddenRoute ? 'none' : 'flex',
            },
          };
        }}
      />
    </Navigator>
  );
}

export default HomeTabs;
