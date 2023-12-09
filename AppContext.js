// AppContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  
  personalInfo: [],
  sports: [],
  educations: [],
  volunteerServices: [],
  ecs: [],
  acs: [],
  sas: [],
  mas: [],
  leaderships: [],
  hcs: [],
  aI: [],

  // ... other state variables
};

const reducer = (state, action) => {
  switch (action.type) {
    
    case 'SET_PERSONALINFO':
      return { ...state, personalInfo: action.payload };
    case 'SET_SPORTS':
      return { ...state, sports: action.payload };
    case 'SET_EDUCATIONS':
      return { ...state, educations: action.payload };
    case 'SET_VOLUNTEERSERVICES':
      return { ...state, volunteerServices: action.payload };
    case 'SET_ECS':
        return { ...state, ecs: action.payload };
    case 'SET_ACS':
        return { ...state, acs: action.payload };
    case 'SET_SAS':
        return { ...state, sas: action.payload };
    case 'SET_MA':
        return { ...state, ma: action.payload };
    case 'SET_LEADERSHIPS':
        return { ...state, leaderships: action.payload };
    case 'SET_HCS':
        return { ...state, hcs: action.payload };
    case 'SET_AI':
        return { ...state, aI: action.payload };      
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };