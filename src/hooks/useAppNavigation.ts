import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';

type RootStackParamList = {
  HomeScreen: undefined;
  LocationSelector: undefined;
  WalkRequest: undefined;
  WalkStart: {requestId: string};
  WalkInProgress: {requestId: string};
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
