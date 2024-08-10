import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Payment from '../screens/payment';

const {Navigator, Screen} = createStackNavigator();

function PaymentStack() {
  return (
    <Navigator>
      <Screen
        name="PaymentScreen"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}

export default PaymentStack;
