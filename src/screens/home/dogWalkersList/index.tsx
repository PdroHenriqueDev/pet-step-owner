import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon} from '@rneui/base';
import colors from '../../../styles/colors';
import {DogWalker} from '../../../interfaces/dogWalker';
import {getRecommedDogWalkers} from '../../../services/dogWalkerService';
import DogWalkerCard from '../../../components/dogWalkerCard';
import globalStyles from '../../../styles/globalStyles';
import {useRequest} from '../../../contexts/requestContext';
import {useDialog} from '../../../contexts/dialogContext';
import {useNavigation} from '@react-navigation/native';

function DogWalkerList() {
  const [dogWalkers, setDogWalkers] = useState<DogWalker[]>([]);

  const {receivedLocation, onselectedDogWalker, selectedDogIds} = useRequest();
  const {showDialog, hideDialog} = useDialog();

  const navigation = useNavigation() as any;

  useEffect(() => {
    const fetchOwner = async () => {
      if (!receivedLocation) {
        return;
      }

      try {
        const recommedDogWalkers = await getRecommedDogWalkers({
          latitude: receivedLocation?.latitude,
          longitude: receivedLocation?.longitude,
        });
        setDogWalkers(recommedDogWalkers);
      } catch (error) {
        console.error('Failed to fetch recommed DogWalkers:', error);
      }
    };

    fetchOwner();
  }, [receivedLocation]);

  const handleSelectDogWalker = (id: string) => {
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

    onselectedDogWalker(id);

    navigation.navigate('WalkRequest');
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Dog Walkers recomendados</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>ver todos</Text>
          <Icon
            type="material"
            name="arrow-forward-ios"
            size={12}
            color={colors.dark}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {dogWalkers.length === 0 ? (
        <Text style={globalStyles.infoText}>
          {!receivedLocation
            ? 'Selecione o inicio do passeio para podermos mostrar os dog walkers recomendados'
            : 'Ainda não há nenhum dog waker recomendado para você'}
        </Text>
      ) : (
        dogWalkers.map((dogWalker, index) => (
          <DogWalkerCard
            key={dogWalker._id}
            dogWalker={dogWalker}
            isLastItem={index === dogWalkers.length - 1}
            isSelected={false}
            onSelect={handleSelectDogWalker}
          />
        ))
      )}
      <View />
    </View>
  );
}

export default DogWalkerList;
