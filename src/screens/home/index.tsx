import React from 'react';
import { View } from 'react-native';
import Request from './components/request';
import globalStyles from '../../styles/globalStyles';

function Home() {
  return (
    <View style={globalStyles.container}>
      <Request />
    </View>
  );
}

export default Home;