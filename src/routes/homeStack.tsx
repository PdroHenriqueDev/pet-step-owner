import React, {useLayoutEffect} from 'react';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import LocationSelector from '../screens/home/locationSelector';
import WalkRequest from '../screens/home/walkRequest';
import CustomHeader from '../components/header/customHeader';
import NotificationHeader from '../components/header/notificationHeader';
import {useNavigation, useRoute} from '@react-navigation/native';

const {Navigator, Screen} = createStackNavigator();

const notificationHeader = (props: StackHeaderProps) => (
  <NotificationHeader {...props} />
);

const headerTe = (props: StackHeaderProps) => <CustomHeader {...props} />;

function HomeStack() {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      const tabBarVisible =
        route.name !== 'LocationSelector' && route.name !== 'WalkRequest';
      parent.setOptions({
        tabBarStyle: {
          display: tabBarVisible ? 'flex' : 'none',
        },
      });
    }
  }, [navigation, route]);

  return (
    <Navigator>
      <Screen
        name="HomeScreen"
        component={Home}
        options={{
          header: notificationHeader,
        }}
      />
      <Screen
        name="LocationSelector"
        component={LocationSelector}
        options={{
          title: 'Selecionar localização',
          header: headerTe,
          headerTransparent: true,
        }}
      />
      <Screen
        name="WalkRequest"
        component={WalkRequest}
        options={{
          header: headerTe,
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
}

export default HomeStack;
