import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {FieldOwnerProps} from '../interfaces/owner';
import {FieldsUser} from '../interfaces/fieldsUser';
import {Dog} from '../interfaces/dog';

type RootStackParamList = {
  HomeScreen: undefined;
  LocationSelector: undefined;
  WalkRequest: undefined;
  WalkStart: {requestId: string};
  WalkInProgress: {requestId: string};
  Chat: {requestId: string; dogWalkerId: string};
  AddPaymentScreen: undefined;
  CardActionsScreen: {cardId: string};
  UpdateOwnerScreen: {field: FieldOwnerProps};
  ForgotPasswordScreen: undefined;
  AddDogs: undefined;
  RecommendedDogWalkersScreen: undefined;
  AccountScreen: undefined;
  UpdateProfileImgScreen: undefined;
  UpdateUserScreen: {field: FieldsUser};
  DogListScreen: undefined;
  DogUpdate: {dog: Dog};
};

type AppNavigationProp = NavigationProp<RootStackParamList>;
type AppRouteProp<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

export const useAppNavigation = <
  RouteName extends keyof RootStackParamList,
>() => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<AppRouteProp<RouteName>>();

  return {navigation, route};
};
