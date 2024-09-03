import React from 'react';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Payment from '../screens/payment';
import AddPayment from '../screens/payment/addPayment.tsx/addPayment';
import CustomHeader from '../components/header/customHeader';
import CardActions from '../screens/payment/cardActions/cardActions';

const {Navigator, Screen} = createStackNavigator();
const customHeader = (props: StackHeaderProps) => <CustomHeader {...props} />;

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
      <Screen
        name="AddPaymentScreen"
        component={AddPayment}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
      <Screen
        name="CardActionsScreen"
        component={CardActions}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
}

export default PaymentStack;
