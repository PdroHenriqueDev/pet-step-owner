import {DogWalker} from './dogWalker';

export interface DogWalkerCardProps {
  dogWalker: DogWalker;
  isLastItem: boolean;
  isSelect?: boolean;
  isSelected: boolean;
  onPress?: (_id: string) => void;
  onSelect: (_id: string) => void;
}
