import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {DogWalker} from '../../../interfaces/dogWalker';
import {getRecommendedDogWalkers} from '../../../services/dogWalkerService';
import DogWalkerCard from '../../../components/dogWalkerCard';
import globalStyles from '../../../styles/globalStyles';
import {useRequest} from '../../../contexts/requestContext';
import {useDialog} from '../../../contexts/dialogContext';
import Spinner from '../../../components/spinner/spinner';
import {AxiosError} from 'axios';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import {useAuth} from '../../../contexts/authContext';

function DogWalkerList() {
  const [dogWalkers, setDogWalkers] = useState<DogWalker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {receivedLocation, onselectedDogWalker, selectedDogIds} = useRequest();
  const {showDialog, hideDialog} = useDialog();
  const {navigation} = useAppNavigation();
  const {user} = useAuth();

  useEffect(() => {
    const fetchDogWalkers = async () => {
      if (!receivedLocation) {
        return;
      }

      setIsLoading(true);

      try {
        const recommendedDogWalkers = await getRecommendedDogWalkers({
          latitude: receivedLocation?.latitude,
          longitude: receivedLocation?.longitude,
        });
        setDogWalkers(recommendedDogWalkers);
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError &&
          typeof error.response?.data?.data === 'string'
            ? error.response?.data?.data
            : 'Ocorreu um erro inesperado';
        showDialog({
          title: errorMessage,
          confirm: {
            confirmLabel: 'Entendi',
            onConfirm: () => {
              hideDialog();
            },
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogWalkers();
  }, [hideDialog, receivedLocation, showDialog]);

  const handleSelectDogWalker = (id: string) => {
    if (!user?.defaultPayment) {
      showDialog({
        title: 'É preciso selecionar um meio de pagamento',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }

    if (selectedDogIds.length === 0 || selectedDogIds.length > 4) {
      showDialog({
        title:
          selectedDogIds.length === 0
            ? 'É preciso no mínimo 1 dog'
            : 'Só é permitido no máximo 4 dogs',
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

  // const seeAllDogWalkers = () => {
  //   navigation.navigate('RecommendedDogWalkersScreen');
  // };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Dog Walkers recomendados</Text>
        {/* <TouchableOpacity
          style={styles.buttonContainer}
          onPress={seeAllDogWalkers}>
          <Text style={styles.buttonLabel}>ver todos</Text>
          <Icon
            type="material"
            name="arrow-forward-ios"
            size={12}
            color={colors.dark}
            style={styles.icon}
          />
        </TouchableOpacity> */}
      </View>
      {isLoading ? (
        <Spinner />
      ) : dogWalkers.length === 0 ? (
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
            onPress={handleSelectDogWalker}
            buttonInfo={{title: 'Contratar'}}
          />
        ))
      )}
      <View />
    </View>
  );
}

export default DogWalkerList;
