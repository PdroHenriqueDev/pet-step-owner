import React from 'react';
import {ScrollView, View} from 'react-native';
import Request from './components/request';
import DogWalkerCardList from './components/dogWalkerCardList';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={globalStyles.container}>
          <Request navigation={navigation} />
          <DogWalkerCardList />
        </View>
      </ScrollView>
    </>
  );
}

export default Home;
