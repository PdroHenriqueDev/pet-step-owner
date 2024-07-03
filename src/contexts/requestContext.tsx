import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Location} from '../interfaces/location';

interface RequestContextProps {
  receivedLocation: Location | null;
  onLocationReceived: (location: Location) => void;
  selectedDogIds: string[];
  onDogSelectionChanged: (dogIds: (prev: string[]) => string[]) => void;
}

const RequestContext = createContext<RequestContextProps | undefined>(
  undefined,
);

export const RequestProvider = ({children}: {children: ReactNode}) => {
  const [receivedLocation, setReceivedLocation] = useState<Location | null>(
    null,
  );
  const [selectedDogIds, setSelectedDogIds] = useState<string[]>([]);

  const onLocationReceived = (location: Location) => {
    setReceivedLocation(location);
  };

  const onDogSelectionChanged = (dogIds: (prev: string[]) => string[]) => {
    setSelectedDogIds(dogIds);
  };

  return (
    <RequestContext.Provider
      value={{
        receivedLocation,
        onLocationReceived,
        selectedDogIds,
        onDogSelectionChanged,
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
