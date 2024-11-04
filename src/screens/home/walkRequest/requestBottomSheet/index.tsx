import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useRequest} from '../../../../contexts/requestContext';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {getNearestsDogWalkers} from '../../../../services/dogWalkerService';
import {DogWalker} from '../../../../interfaces/dogWalker';
import SummarySection from './summarySection';
import NearestDogWalkers from './nearestDogWalkers';
import TimeSelector from './timeSelector';
import CustomButton from '../../../../components/customButton';
import colors from '../../../../styles/colors';
import {Icon} from '@rneui/base';
import {CostDataProps} from '../../../../interfaces/costData';
import Spinner from '../../../../components/spinner/spinner';
import {useDialog} from '../../../../contexts/dialogContext';
import {useAppNavigation} from '../../../../hooks/useAppNavigation';
import {calculateCost, requestWalk} from '../../../../services/walkService';
import {AxiosError} from 'axios';
import {useAuth} from '../../../../contexts/authContext';

const stepsConfig = [
  {
    title: 'Dog walkers nas proximidades',
    component: (props: {
      recommededDogWalkers: DogWalker[];
      selectedDogWalkerId: string | null;
      handleSelect: (id: string) => void;
      loadMore: () => void;
      isLoadingMore: boolean;
    }) => (
      <NearestDogWalkers
        recommededDogWalkers={props.recommededDogWalkers}
        selectedDogWalkerId={props.selectedDogWalkerId}
        handleSelect={props.handleSelect}
        loadMore={props.loadMore}
        isLoadingMore={props.isLoadingMore}
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
  const {user} = useAuth();

  const {showDialog, hideDialog} = useDialog();

  const {navigation} = useAppNavigation();

  const snapPoints = useMemo(() => [250, '85%'], []);

  const [recommededDogWalkers, setRecommededDogWalkers] = useState<DogWalker[]>(
    [],
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [costData, setCostData] = useState<CostDataProps>({
    costDetails: {
      totalCost: '',
      dogPrice: {
        numberOfDogs: 0,
        pricePerDog: 0,
        totalDogCost: '',
      },
      walkPrice: {
        durationMinutes: 0,
        price: 0,
      },
    },
    receivedLocation: {
      description: '',
      latitude: 0,
      longitude: 0,
    },
    calculationId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [clickedButton, setClickedButton] = useState(false);
  const [calculation, setCalculation] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedDogWalkerId) {
      setCurrentStep(1);
    }

    if (!receivedLocation) {
      return;
    }

    fetchRecommededDogWalkers(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedLocation]);

  const fetchRecommededDogWalkers = async (pageToLoad: number) => {
    setIsLoading(true);

    if (!receivedLocation || !hasMore) {
      return;
    }

    setIsLoading(pageToLoad === 0);
    setIsLoadingMore(pageToLoad > 0);

    try {
      const dogWalkers = await getNearestsDogWalkers({
        latitude: receivedLocation!.latitude,
        longitude: receivedLocation!.longitude,
        limit: 10,
        skip: pageToLoad * 10,
      });

      if (dogWalkers.length === 0) {
        setHasMore(false);
        return;
      }

      setRecommededDogWalkers(prev =>
        pageToLoad === 0 ? dogWalkers : [...prev, ...dogWalkers],
      );
      setPage(pageToLoad + 1);
    } catch {
      showDialog({
        title: 'Algo de errado',
        description: 'Tente novamente.',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchRecommededDogWalkers(page);
    }
  };

  const handleSelect = (id: string) => {
    onselectedDogWalker(id);
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      const data = await calculateCost({
        ownerId: user!._id as string,
        dogWalkerId: selectedDogWalkerId,
        walkDurationMinutes: selectedTime,
        numberOfDogs: selectedDogIds.length,
        receivedLocation: receivedLocation!,
      });

      const {calculationId} = data;

      setCalculation(calculationId);
      setCostData(data as unknown as CostDataProps);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError &&
        typeof error.response?.data?.data === 'string'
          ? error.response?.data?.data
          : 'Ocorreu um erro inesperado';

      showDialog({
        title: errorMessage,
        description: 'Tente novamente.',
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

  const handleRequest = async () => {
    setIsLoading(true);
    try {
      const {requestId} = await requestWalk(calculation);
      navigation.navigate('WalkStart', {requestId});
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError &&
        typeof error.response?.data?.data === 'string'
          ? error.response?.data?.data
          : 'Ocorreu um erro inesperado';

      showDialog({
        title: errorMessage,
        description: 'Tente novamente.',
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

  const handleConfirm = async () => {
    if (!clickedButton) {
      setClickedButton(true);
      bottomSheetRef.current?.expand();
      return;
    }
    if (currentStep === 0 && selectedDogWalkerId) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 1 && selectedTime) {
      await handleCalculate();
    }

    if (currentStep === 2) {
      await handleRequest();
    }
  };

  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  const currentConfig = stepsConfig[currentStep];

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={false}
        handleIndicatorStyle={styles.indicator}>
        <BottomSheetView>
          {isLoading ? (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          ) : (
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

              {currentConfig.component({
                recommededDogWalkers,
                selectedDogWalkerId,
                handleSelect,
                loadMore,
                isLoadingMore,
                costData,
              })}
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>

      <View style={styles.fixedFooter}>
        <CustomButton
          onPress={handleConfirm}
          label={
            !clickedButton
              ? 'Continuar'
              : currentStep === 2
              ? 'Iniciar passeio'
              : 'Confirmar'
          }
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

export default RequestBottomSheet;
