import React, {useLayoutEffect} from 'react';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import LocationSelector from '../screens/home/locationSelector';
import WalkRequest from '../screens/home/walkRequest';
import CustomHeader from '../components/header/customHeader';
import NotificationHeader from '../components/notificationHeader/notificationHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import WalkStart from '../screens/home/walkStart/walkStart';
import WalkInProgress from '../screens/home/walkInProgess/walkInProgess';
import Chat from '../screens/home/chat/chat';
import AddDogScreen from '../components/addDog/addDogScreen';
import RecommendedDogWalkersScreen from '../screens/home/recommendedDogWalkers/recommendedDogWalkers';
import NotificationList from '../screens/home/notification/notificationList/notificationList';
import NotificationDetail from '../screens/home/notification/notificationDetail/notificationDetail';

const {Navigator, Screen} = createStackNavigator();

const notificationHeader = () => <NotificationHeader />;

const customHeader = (props: StackHeaderProps) => <CustomHeader {...props} />;

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
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="WalkRequest"
        component={WalkRequest}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="WalkStart"
        component={WalkStart}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="WalkInProgress"
        component={WalkInProgress}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="Chat"
        component={Chat}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="AddDogs"
        component={AddDogScreen}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="RecommendedDogWalkersScreen"
        component={RecommendedDogWalkersScreen}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="NotificationList"
        component={NotificationList}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="NotificationDetail"
        component={NotificationDetail}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
}

export default HomeStack;
