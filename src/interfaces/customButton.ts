import {ViewStyle} from 'react-native';

export interface CustomButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  isLoading?: boolean;
}
