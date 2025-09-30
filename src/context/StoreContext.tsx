import React, { createContext, useContext, ReactNode } from 'react';
import { cartStore, CartStore } from '../store';

interface StoreContextProps {
  cartStore: CartStore;
}

const StoreContext = createContext<StoreContextProps | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={{ cartStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};