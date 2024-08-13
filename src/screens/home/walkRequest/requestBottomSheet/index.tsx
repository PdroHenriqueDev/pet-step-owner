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
import {useOwner} from '../../../../contexts/ownerContext';

const stepsConfig = [
  {
    title: 'Dog walkers nas proximidades',
    component: (props: {
      recommededDogWalkers: DogWalker[];
      selectedDogWalkerId: string | null;
      handleSelect: (id: string) => void;
    }) => (
      <NearestDogWalkers
        recommededDogWalkers={props.recommededDogWalkers}
        selectedDogWalkerId={props.selectedDogWalkerId}
        handleSelect={props.handleSelect}
      />
    ),
  },
  {
    title: 'Tempo de passeio',
    component: () => <TimeSelector />,
  },
  {
    title: 'Resumo do Preço',
    component: (props: {costData: CostDataProps}) => (
      <SummarySection costData={props.costData} />
    ),
  },
];

function RequestBottomSheet() {
  const {
    receivedLocation,
    selectedTime,
    selectedDogIds,
    selectedDogWalkerId,
    onselectedDogWalker,
  } = useRequest();
  const {owner} = useOwner();

  const snapPoints = useMemo(() => [340, '90%'], []);
  const [recommededDogWalkers, setRecommededDogWalkers] = useState<DogWalker[]>(
    [],
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [costData, setCostData] = useState<CostDataProps>(null!);

  useEffect(() => {
    const fetchRecommededDogWalkers = async () => {
      try {
        const dogWalkers = await getNearestsDogWalkers({
          latitude: receivedLocation!.latitude,
          longitude: receivedLocation!.longitude,
        });
        if (dogWalkers.length > 0) {
          onselectedDogWalker(dogWalkers[0]._id);
        }
        setRecommededDogWalkers(dogWalkers);
      } catch (error) {
        console.error('Failed to fetch owner data:', error);
      }
    };

    fetchRecommededDogWalkers();
  }, [onselectedDogWalker, receivedLocation]);

  const handleSelect = (id: string) => {
    onselectedDogWalker(id);
  };

  const handleConfirm = async () => {
    if (currentStep === 0 && selectedDogWalkerId) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 1 && selectedTime) {
      try {
        const data = await calculateCost({
          ownerId: owner!._id,
          dogWalkerId: selectedDogWalkerId,
          walkDurationMinutes: selectedTime,
          numberOfDogs: selectedDogIds.length,
        });

        setCostData(data as unknown as CostDataProps);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.log('got error calculating', error);
      } finally {
      }
    }

    // if (currentStep === 2) {
    //   setCurrentStep(currentStep + 1);
    // }
  };

  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  const currentConfig = stepsConfig[currentStep];

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
            <View className="flex flex-row items-center mb-2.5">
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
              <Text style={styles.titleText}>{currentConfig.title}</Text>
            </View>
            <ScrollView>
              {currentConfig.component({
                recommededDogWalkers,
                selectedDogWalkerId,
                handleSelect,
                costData,
              })}
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
