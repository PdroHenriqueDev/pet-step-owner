import React, {useEffect} from 'react';
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
import messaging from '@react-native-firebase/messaging';
import {useDialog} from '../contexts/dialogContext';
import {Linking} from 'react-native';
import {useAuth} from '../contexts/authContext';
import {updateDeviceToken} from '../services/ownerService';

const {Navigator, Screen} = createBottomTabNavigator();

function HomeTabs() {
  const {user} = useAuth();
  const {showDialog, hideDialog} = useDialog();

  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error('Erro ao abrir as configurações');
    }
  };

  useEffect(() => {
    const handleToken = async () => {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }

        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          showDialog({
            title: 'Permissão para notificações necessária',
            description:
              'Para garantir que você receba atualizações importantes e notificações em tempo real, precisamos da sua permissão para enviar notificações. Por favor, habilite-as nas configurações.',
            confirm: {
              confirmLabel: 'Abrir Configurações',
              onConfirm: async () => {
                await openSettings();
                hideDialog();
              },
            },
            cancel: {
              cancelLabel: 'Não quero receber notificacões',
              onCancel() {
                hideDialog();
              },
            },
          });

          return;
        }

        const token = await messaging().getToken();
        if (!user?.deviceToken || token !== user?.deviceToken) {
          await updateDeviceToken(token);
        }
      } catch (error) {
        showDialog({
          title: 'Erro de conexão',
          description:
            'Houve um problema ao tentar configurar suas notificações. Por favor, tente novamente mais tarde.',
          confirm: {
            confirmLabel: 'Entendi',
            onConfirm: () => {
              hideDialog();
            },
          },
        });
      }
    };

    handleToken();
  }, [hideDialog, showDialog, user?.deviceToken]);

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
