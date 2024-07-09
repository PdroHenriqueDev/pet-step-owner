import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {useRequest} from '../../../../contexts/requestContext';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {getNearestsDogWalkers} from '../../../../services/dogWalkerService';
import {DogWalker} from '../../../../interfaces/dogWalker';
import SummarySection from './summarySection';
import NearestDogWalkers from './nearestDogWalkers';
import TimeSelector from './timeSelector';

function RequestBottomSheet() {
  const {receivedLocation} = useRequest();
  const snapPoints = useMemo(() => [250, '90%'], []);
  const [recommededDogWalkers, setRecommededDogWalkers] = useState<DogWalker[]>(
    [],
  );
  const [selectedDogWalkerId, setSelectedDogWalkerId] = useState<string | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState<number>(0);

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

  const handleConfirm = () => {
    if (currentStep < 1 && selectedDogWalkerId) {
      setCurrentStep(currentStep + 1);
    }
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
            <Text style={styles.titleText}>
              {currentStep === 0
                ? 'Dog walkers nas proximidades'
                : 'Tempo de passeio'}
            </Text>
            <ScrollView>
              {currentStep === 0 && (
                <NearestDogWalkers
                  recommededDogWalkers={recommededDogWalkers}
                  selectedDogWalkerId={selectedDogWalkerId}
                  handleSelect={handleSelect}
                />
              )}
              {currentStep === 1 && <TimeSelector />}
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <SummarySection onConfirm={handleConfirm} />
    </View>
  );
}

export default RequestBottomSheet;
