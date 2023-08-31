import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';

export const useToggle = (initialState: boolean = false): [
  boolean, 
  (newState?: boolean) => void
] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = (newState: boolean | undefined) => {
    setState((prevState) => typeof newState === 'boolean' ? newState : !prevState);
  }
  return [state, toggle];
};

export const useFocusedIndex = (): {
  focusedIndex: number | null;
  setFocusedIndex: Dispatch<SetStateAction<number | null>>;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: MouseEventHandler<HTMLLIElement>;
} => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const handleMouseEnter = (index: number) => setFocusedIndex(index);
  const handleMouseLeave = () => setFocusedIndex(null);

  return { focusedIndex, setFocusedIndex, handleMouseEnter, handleMouseLeave };
};
