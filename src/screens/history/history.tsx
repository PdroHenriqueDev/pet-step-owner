import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import Spinner from '../../components/spinner/spinner';
import HistoryCard from './historyCard/historyCard';
import {listWalks} from '../../services/walkService';
// import {useOwner} from '../../contexts/ownerContext';
import {WalkProps} from '../../interfaces/walk';
import {useFocusEffect} from '@react-navigation/native';
import ItemSeparator from '../../components/itemSeparator/itemSeparator';
import {useAuth} from '../../contexts/authContext';

const separator = () => <ItemSeparator />;

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [walks, setWalks] = useState<WalkProps[]>([]);
  // const {owner} = useOwner();
  const {user} = useAuth();

  useFocusEffect(
    useCallback(() => {
      const getWalks = async () => {
        if (!user) {
          return;
        }

        try {
          const list = await listWalks(user._id as string, 1);
          setWalks(list);
        } catch (error) {
          console.error('Failed to fetch recommed DogWalkers:', error);
        } finally {
          setIsLoading(false);
        }
      };

      getWalks();
    }, [user]),
  );

  const renderItem = ({item}: {item: WalkProps}) => (
    <HistoryCard key={item._id} {...item} />
  );

  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerTitle}>Histórico</Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <View style={styles.contentContainer}>
          {walks.length === 0 ? (
            <Text style={globalStyles.infoText}>
              Não há histórico disponível.
            </Text>
          ) : (
            <FlatList
              data={walks}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.list}
              ItemSeparatorComponent={separator}
            />
          )}
        </View>
      )}
    </View>
  );
}
