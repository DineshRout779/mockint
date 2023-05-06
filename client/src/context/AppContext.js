import { createContext, useContext, useEffect, useReducer } from 'react';
import { reducers } from './reducers';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  theme: localStorage.getItem('theme') || 'light',
  isAuthenticated: localStorage.getItem('isAuthenticated') || false,
};

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  useEffect(() => {
    if (
      state.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', state.isAuthenticated);
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
