import React from 'react';
import {DogWalker} from '../../../../../interfaces/dogWalker';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import globalStyles from '../../../../../styles/globalStyles';
import DogWalkerCard from '../../../../../components/dogWalkerCard';

interface NearestDogWalkersProps {
  recommededDogWalkers: DogWalker[];
  selectedDogWalkerId: string | null;
  handleSelect: (id: string) => void;
  loadMore: () => void;
  isLoadingMore: boolean;
}

export default function NearestDogWalkers({
  recommededDogWalkers,
  selectedDogWalkerId,
  handleSelect,
  loadMore,
  isLoadingMore,
}: NearestDogWalkersProps) {
  return (
    <View>
      {recommededDogWalkers.length === 0 ? (
        <Text style={globalStyles.infoText}>
          Não há Dog Walkers disponíveis
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          data={recommededDogWalkers}
          keyExtractor={item => item._id}
          renderItem={({item, index}) => (
            <DogWalkerCard
              dogWalker={item}
              isSelect={true}
              isLastItem={index === recommededDogWalkers.length - 1}
              isSelected={item._id === selectedDogWalkerId}
              onPress={handleSelect}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore ? (
              <Text style={globalStyles.infoText}>Carregando mais...</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
