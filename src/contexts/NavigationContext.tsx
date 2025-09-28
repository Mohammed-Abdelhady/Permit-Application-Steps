import { createContext, useMemo, useState, type ReactNode } from 'react';
import type {
  NavigationContextType,
  NavigationDirection,
} from './NavigationTypes';

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [direction, setDirection] = useState<NavigationDirection>('none');

  const value = useMemo(
    () => ({ direction, setDirection }),
    [direction, setDirection]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
