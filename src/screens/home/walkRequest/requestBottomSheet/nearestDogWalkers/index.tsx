import React from 'react';
import {DogWalker} from '../../../../../interfaces/dogWalker';
import {Text, View} from 'react-native';
import globalStyles from '../../../../../styles/globalStyles';
import DogWalkerCard from '../../../../../components/dogWalkerCard';

interface NearestDogWalkersProps {
  recommededDogWalkers: DogWalker[];
  selectedDogWalkerId: string | null;
  handleSelect: (id: string) => void;
}

export default function NearestDogWalkers({
  recommededDogWalkers,
  selectedDogWalkerId,
  handleSelect,
}: NearestDogWalkersProps) {
  return (
    <View>
      {recommededDogWalkers.length === 0 ? (
        <Text style={globalStyles.infoText}>
          Não há Dog Walkers disponíveis
        </Text>
      ) : (
        recommededDogWalkers.map((dogWalker, index) => (
          <DogWalkerCard
            key={dogWalker._id}
            dogWalker={dogWalker}
            isSelect={true}
            isLastItem={index === recommededDogWalkers.length - 1}
            isSelected={dogWalker._id === selectedDogWalkerId}
            onSelect={handleSelect}
          />
        ))
      )}
    </View>
  );
}
