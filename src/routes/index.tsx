import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabs from './homeTabs';
import LocationSelector from '../screens/home/components/locationSelector';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Inicio" component={HomeTabs} />
        <Screen
          name="LocationSelector"
          component={LocationSelector}
          options={{
            title: 'Selecionar localização',
            // headerBackImage: () => (
            //   <View style={{marginLeft: 10}}>
            //     <Icon
            //       type="material"
            //       name="arrow-back"
            //       size={26}
            //       color={colors.primary}
            //     />
            //   </View>
            // ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
