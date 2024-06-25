import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import InputAddress from './inputAddress';
import DogsList from './dogsList';
import DogWalkerList from './dogWalkersList';
import CustomButton from '../../components/customButton';
import {useDialog} from '../../contexts/dialogContext';
import {useRequest} from '../../contexts/requestContext';

function Home() {
  const {showDialog, hideDialog} = useDialog();
  const {selectedDogIds} = useRequest();

  const handleClick = () => {
    if (selectedDogIds.length === 0 || selectedDogIds.length > 3) {
      showDialog({
        title:
          selectedDogIds.length === 0
            ? 'É preciso no mínimo 1 dog'
            : 'Só é permitido no máximo 3 dogs',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.requestContainer}>
          <InputAddress />
          <DogsList />
          <View style={styles.buttonContainer}>
            <CustomButton onPress={handleClick} label="Solicitar passeio" />
          </View>
        </View>
        <DogWalkerList />
      </View>
    </ScrollView>
  );
}

export default Home;
