import {
  useNavigation,
  useRoute,
  NavigationProp,
} from '@react-navigation/native';

type RootStackParamList = {
  HomeScreen: undefined;
  LocationSelector: undefined;
  WalkRequest: undefined;
  WalkStart: {requestId: string};
};

type AppNavigationProp = NavigationProp<RootStackParamList>;

export const useAppNavigation = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute();

  return {navigation, route};
};
