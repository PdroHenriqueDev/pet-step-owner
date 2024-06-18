import React from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import Request from './components/request';
import DogWalkerCardList from './components/dogWalkerCardList';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import InputAddress from './inputAddress';

function Home() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <InputAddress />
          {/* <Request navigation={navigation} />
          <DogWalkerCardList /> */}
        </View>
      </ScrollView>
    </>
  );
}

export default Home;
