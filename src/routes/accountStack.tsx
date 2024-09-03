import React from 'react';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/account/account';
import UpdateOwner from '../screens/account/updateOwner/updateOwner';
import CustomHeader from '../components/header/customHeader';

const {Navigator, Screen} = createStackNavigator();
const customHeader = (props: StackHeaderProps) => <CustomHeader {...props} />;

function AccountStack() {
  return (
    <Navigator>
      <Screen
        name="AccountScreen"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="UpdateOwnerScreen"
        component={UpdateOwner}
        options={{
          header: customHeader,
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
}

export default AccountStack;
