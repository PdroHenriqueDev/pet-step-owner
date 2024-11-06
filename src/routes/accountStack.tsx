import React from 'react';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/account/account';
import CustomHeader from '../components/header/customHeader';
import UpdateUser from '../screens/account/updateUser/updateUser';
import UpdateProfileImgScreen from '../screens/account/uploadProfileImg/uploadProfileImage';
import DogListScreen from '../screens/account/dogList/dogListScreen';
import DogRegistration from '../components/addDog/addDogScreen';

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
      <Screen
        name="DogListScreen"
        component={DogListScreen}
        options={{header: customHeader, headerTransparent: true}}
      />
      <Screen
        name="DogUpdate"
        component={DogRegistration}
        options={{header: customHeader, headerTransparent: true}}
      />
      <Screen
        name="AddDogs"
        component={DogRegistration}
        options={{header: customHeader, headerTransparent: true}}
      />
    </Navigator>
  );
}

export default AccountStack;
