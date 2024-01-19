// AppContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = { //initialState is the initial state of the application. It is an object with the following properties(categories) and their initial values:
  
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

};

const reducer = (state, action) => { 
  //reducer is a function that takes the current state and an action as arguments and returns a new state based on that action. It is a pure function that only depends on the arguments passed to it. It does not depend on any external state or change its arguments.
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
    case 'SET_MAS':
        return { ...state, mas: action.payload };
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

const AppProvider = ({ children }) => { //AppProvider is a component that provides the application state to all its children. It takes the children as a prop and returns the AppContext.Provider component with the value prop set to the current state and the dispatch function.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => { //useAppContext is a custom hook that returns the current state and the dispatch function. It is a wrapper around the useContext hook.
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };