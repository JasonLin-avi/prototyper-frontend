import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GenerationState } from '../types';

type GenerationAction = 
  | { type: 'SET_CODE'; payload: { code: string; previewProps: { componentName: string } } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' };

const generationReducer = (state: GenerationState, action: GenerationAction): GenerationState => {
  switch (action.type) {
    case 'SET_CODE':
      return { ...state, generatedCode: action.payload.code, previewProps: action.payload.previewProps, error: null, isLoading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESET':
      return { generatedCode: '', previewProps: { componentName: '' }, error: null, isLoading: false };
    default:
      return state;
  }
};

const initialState: GenerationState = {
  generatedCode: '',
  previewProps: { componentName: '' },
  error: null,
  isLoading: false,
};

const GenerationContext = createContext<{
  state: GenerationState;
  dispatch: React.Dispatch<GenerationAction>;
} | undefined>(undefined);

export const GenerationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(generationReducer, initialState);

  return (
    <GenerationContext.Provider value={{ state, dispatch }}>
      {children}
    </GenerationContext.Provider>
  );
};

export const useGeneration = () => {
  const context = useContext(GenerationContext);
  if (context === undefined) {
    throw new Error('useGeneration must be used within a GenerationProvider');
  }
  return context;
};