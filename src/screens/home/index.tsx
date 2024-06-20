import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import InputAddress from './inputAddress';
import DogsList from './dogsList';
import DogWalkerList from './dogWalkersList';

function Home() {
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.requestContainer}>
          <InputAddress />
          <DogsList />
        </View>
        <DogWalkerList />
      </View>
    </ScrollView>
  );
}

export default Home;
