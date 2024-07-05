import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import InputAddress from './inputAddress';
import DogsList from './dogsList';
import DogWalkerList from './dogWalkersList';
import CustomButton from '../../components/customButton';
import {useDialog} from '../../contexts/dialogContext';
import {useRequest} from '../../contexts/requestContext';
import {useOwner} from '../../contexts/ownerContext';
import {getOwner} from '../../services/ownerService';

function Home() {
  const {setOwner} = useOwner();
  const {showDialog, hideDialog} = useDialog();
  const {selectedDogIds, receivedLocation} = useRequest();

  const handleClick = () => {
    if (!receivedLocation) {
      showDialog({
        title: 'É preciso selecionar o início do passeio',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

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

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const ownerData = await getOwner('6685a46cc8ccd21d41f50991');
        setOwner(ownerData);
      } catch (error) {
        console.error('Failed to fetch owner data:', error);
      }
    };

    fetchOwner();
  }, [setOwner]);

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
