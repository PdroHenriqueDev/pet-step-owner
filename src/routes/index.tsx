import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabs from './homeTabs';
import LocationSelector from '../screens/home/locationSelector';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Header from '../components/header';
import WalkRequest from '../screens/home/walkRequest';

const {Navigator, Screen} = createStackNavigator();
const CustomHeader = (props: StackHeaderProps) => <Header {...props} />;
function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: CustomHeader,
        }}>
        <Screen name="Inicio" component={HomeTabs} />
        <Screen
          name="LocationSelector"
          component={LocationSelector}
          options={{
            title: 'Selecionar localização',
            headerShown: true,
            headerTransparent: true,
          }}
        />
        <Screen
          name="WalkRequest"
          component={WalkRequest}
          options={{
            headerShown: true,
            headerTransparent: true,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
