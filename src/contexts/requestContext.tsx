import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Location} from '../interfaces/location';
import {RequestContextProps} from '../interfaces/request';

const RequestContext = createContext<RequestContextProps | undefined>(
  undefined,
);

export const RequestProvider = ({children}: {children: ReactNode}) => {
  const [receivedLocation, setReceivedLocation] = useState<Location | null>(
    null,
  );
  const [selectedDogIds, setSelectedDogIds] = useState<string[]>([]);
  const [selectedDogWalkerId, setSelectedDogWalkerId] = useState('');
  const [selectedTime, setSelectedTime] = useState<number>(15);

  const onLocationReceived = (location: Location) => {
    setReceivedLocation(location);
  };
  const onDogSelectionChanged = (dogIds: (prev: string[]) => string[]) => {
    setSelectedDogIds(dogIds);
  };
  const onselectedTime = (time: number) => {
    setSelectedTime(time);
  };
  const onselectedDogWalker = (dogWalkerId: string) => {
    setSelectedDogWalkerId(dogWalkerId);
  };

  const cleanSelectedDogWalker = () => {
    setSelectedDogWalkerId('');
  };

  return (
    <RequestContext.Provider
      value={{
        receivedLocation,
        onLocationReceived,
        selectedDogIds,
        onDogSelectionChanged,
        selectedTime,
        onselectedTime,
        selectedDogWalkerId,
        onselectedDogWalker,
        cleanSelectedDogWalker,
      }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = (): RequestContextProps => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
};
