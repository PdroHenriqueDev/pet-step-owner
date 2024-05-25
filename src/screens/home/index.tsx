import React from 'react';
import { ScrollView, View } from 'react-native';
import Request from './components/request';
import DogWalkerCardList from './components/dogWalkerCardList';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';

function Home() {
  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={globalStyles.container}>
        <Request />
        <DogWalkerCardList />
      </View>
    </ScrollView>
    </>
  );
}

export default Home;