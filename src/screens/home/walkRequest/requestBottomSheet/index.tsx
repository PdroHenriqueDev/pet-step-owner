import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {useRequest} from '../../../../contexts/requestContext';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {getNearestsDogWalkers} from '../../../../services/dogWalkerService';
import {DogWalker} from '../../../../interfaces/dogWalker';
import DogWalkerCard from '../../../../components/dogWalkerCard';
import globalStyles from '../../../../styles/globalStyles';
import SummarySection from './summarySection';

function RequestBottomSheet() {
  const {receivedLocation} = useRequest();
  const snapPoints = useMemo(() => [250, '90%'], []);
  const [recommededDogWalkers, setRecommededDogWalkers] = useState<DogWalker[]>(
    [],
  );
  const [selectedDogWalkerId, setSelectedDogWalkerId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchRecommededDogWalkers = async () => {
      try {
        const dogWalkers = await getNearestsDogWalkers({
          latitude: receivedLocation!.latitude,
          longitude: receivedLocation!.longitude,
        });
        if (dogWalkers.length > 0) {
          setSelectedDogWalkerId(dogWalkers[0]._id);
        }
        setRecommededDogWalkers(dogWalkers);
      } catch (error) {
        console.error('Failed to fetch owner data:', error);
      }
    };

    fetchRecommededDogWalkers();
  }, [receivedLocation]);

  const handleSelect = (id: string) => {
    setSelectedDogWalkerId(id);
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        // ref={bottomSheetRef}
        // onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={false}
        handleIndicatorStyle={styles.indicator}>
        <BottomSheetView>
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.titleText}>Dog walkers nas proximidades</Text>
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
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <SummarySection />
    </View>
  );
}

export default RequestBottomSheet;
