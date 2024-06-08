import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Location } from '../interfaces/location';

interface LocationContextProps {
  receivedLocation: Location | null;
  onLocationReceived: (location: Location) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [receivedLocation, setReceivedLocation] = useState<Location | null>(null);

  const onLocationReceived = (location: Location) => {
    setReceivedLocation(location);
  };

  return (
    <LocationContext.Provider value={{ receivedLocation, onLocationReceived }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
