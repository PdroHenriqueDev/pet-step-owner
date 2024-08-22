import {ReactNode} from 'react';
import {DogWalker} from './dogWalker';

export interface DogWalkerCardProps {
  dogWalker: DogWalker;
  isLastItem?: boolean;
  isSelect?: boolean;
  isSelected: boolean;
  buttonInfo?: {
    title: string;
    icon?: ReactNode;
  };
  onPress?: (_id: string) => void;
}
