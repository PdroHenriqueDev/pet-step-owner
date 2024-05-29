import React from 'react';
import { ScrollView, View } from 'react-native';
import Request from './components/request';
import DogWalkerCardList from './components/dogWalkerCardList';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const route = useRoute() as any;

  const address = route.params?.address;

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={globalStyles.container}>
        <Request address={address}  navigation={navigation}/>
        <DogWalkerCardList />
      </View>
    </ScrollView>
    </>
  );
}

export default Home;