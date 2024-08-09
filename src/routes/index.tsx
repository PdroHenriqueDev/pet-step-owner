import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabs from './homeTabs';
import LocationSelector from '../screens/home/locationSelector';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Header from '../components/header';
import WalkRequest from '../screens/home/walkRequest';
import CustomHeader from '../components/header/customHeader';

const {Navigator, Screen} = createStackNavigator();
const header = (props: StackHeaderProps) => <CustomHeader {...props} />;
function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Inicio"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="LocationSelector"
          component={LocationSelector}
          options={{
            title: 'Selecionar localização',
            header,
            headerTransparent: true,
          }}
        />
        <Screen
          name="WalkRequest"
          component={WalkRequest}
          options={{
            header,
            headerTransparent: true,
          }}
        />

        {/* <Screen
          name="ListPayment"
          component={ListPayments}
          options={{
            title: 'Selecionar localização',
            headerShown: true,
            headerTransparent: true,
          }}
        /> */}
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
