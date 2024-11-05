import React from 'react';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/account/account';
import CustomHeader from '../components/header/customHeader';
import UpdateUser from '../screens/account/updateUser/updateUser';
import UpdateProfileImgScreen from '../screens/account/uploadProfileImg/uploadProfileImage';

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
        name="UpdateUserScreen"
        component={UpdateUser}
        options={{header: customHeader, headerTransparent: true}}
      />
      <Screen
        name="UpdateProfileImgScreen"
        component={UpdateProfileImgScreen}
        options={{header: customHeader, headerTransparent: true}}
      />
    </Navigator>
  );
}

export default AccountStack;
