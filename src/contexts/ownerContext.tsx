import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Owner} from '../interfaces/owner';

interface OwnerContextProps {
  owner: Owner | null;
  setOwner: (owner: Owner) => void;
}

const OwnerContext = createContext<OwnerContextProps | undefined>(undefined);

export const OwnerProvider = ({children}: {children: ReactNode}) => {
  const [owner, setOwner] = useState<Owner | null>(null);

  return (
    <OwnerContext.Provider value={{owner, setOwner}}>
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwner = (): OwnerContextProps => {
  const context = useContext(OwnerContext);
  if (!context) {
    throw new Error('useOwner must be used within an OwnerProvider');
  }
  return context;
};
