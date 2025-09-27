export type NavigationDirection = 'forward' | 'backward' | 'none';

export interface NavigationContextType {
  direction: NavigationDirection;
  setDirection: (direction: NavigationDirection) => void;
}
