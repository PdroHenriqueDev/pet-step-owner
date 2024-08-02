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

function DogWalkerList() {
  const {receivedLocation} = useRequest();
  const [dogWalkers, setDogWalkers] = useState<DogWalker[]>([]);

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
          />
        ))
      )}
      <View />
    </View>
  );
}

export default DogWalkerList;
