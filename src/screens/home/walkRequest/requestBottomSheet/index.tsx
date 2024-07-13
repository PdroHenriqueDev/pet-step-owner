import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useRequest} from '../../../../contexts/requestContext';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {
  calculateCost,
  getNearestsDogWalkers,
} from '../../../../services/dogWalkerService';
import {DogWalker} from '../../../../interfaces/dogWalker';
import SummarySection from './summarySection';
import NearestDogWalkers from './nearestDogWalkers';
import TimeSelector from './timeSelector';
import CustomButton from '../../../../components/customButton';
import colors from '../../../../styles/colors';
import {Icon} from '@rneui/base';
import {CostDataProps} from '../../../../interfaces/costData';

const title: {[key: number]: string} = {
  0: 'Dog walkers nas proximidades',
  1: 'Tempo de passeio',
  2: 'Resumo do Preço',
};

function RequestBottomSheet() {
  const {receivedLocation, selectedTime, selectedDogIds} = useRequest();
  const snapPoints = useMemo(() => [340, '90%'], []);
  const [recommededDogWalkers, setRecommededDogWalkers] = useState<DogWalker[]>(
    [],
  );
  const [selectedDogWalkerId, setSelectedDogWalkerId] = useState<string | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [costData, setCostData] = useState<CostDataProps>();

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

  const handleConfirm = async () => {
    if (currentStep === 0 && selectedDogWalkerId) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 1 && selectedTime) {
      try {
        const data = await calculateCost({
          walkDuration: selectedTime,
          numberOfDogs: selectedDogIds.length,
        });

        setCostData(data as unknown as CostDataProps);
        setCurrentStep(currentStep + 1);
      } catch {
      } finally {
      }
    }
  };

  const back = () => {
    setCurrentStep(currentStep - 1);
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
            <View className="flex flex-row items-center mb-3">
              {currentStep > 0 && (
                <TouchableOpacity onPress={back}>
                  <Icon
                    type="material"
                    name="arrow-back-ios-new"
                    size={14}
                    color={colors.dark}
                    className="mr-2"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}
              <Text style={styles.titleText}>{title[currentStep]}</Text>
            </View>
            <ScrollView>
              {currentStep === 0 && (
                <NearestDogWalkers
                  recommededDogWalkers={recommededDogWalkers}
                  selectedDogWalkerId={selectedDogWalkerId}
                  handleSelect={handleSelect}
                />
              )}
              {currentStep === 1 && <TimeSelector />}
              {currentStep === 2 && <SummarySection costData={costData} />}
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheet>

      <View style={styles.fixedFooter}>
        <CustomButton
          onPress={handleConfirm}
          label={currentStep === 2 ? 'Iniciar passeio' : 'Confirmar'}
        />
      </View>
    </View>
  );
}

export default RequestBottomSheet;
