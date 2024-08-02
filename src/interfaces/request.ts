import {Location} from './location';

export interface RequestContextProps {
  receivedLocation: Location | null;
  onLocationReceived: (location: Location) => void;
  selectedDogIds: string[];
  onDogSelectionChanged: (dogIds: (prev: string[]) => string[]) => void;
  selectedTime: number;
  onselectedTime: (selectedTime: number) => void;
  selectedDogWalkerId: string;
  onselectedDogWalker: (selectedTime: string) => void;
}
