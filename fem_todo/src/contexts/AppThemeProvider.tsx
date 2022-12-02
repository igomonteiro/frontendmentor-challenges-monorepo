import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface ITheme {
  theme: 'dark' | 'light',
  handleToggleTheme: () => void;
}

const getInitialTheme = () : 'dark' | 'light' => {
  const userTheme = localStorage.getItem('theme');

  if (typeof userTheme === 'string') {
    return userTheme === 'dark' ? 'dark' : 'light';
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'dark';
};

export const AppThemeContext = createContext<ITheme>({} as ITheme);

export function AppThemeProvider({children} : PropsWithChildren) {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  function handleToggleTheme() {
    setTheme((prevState) => prevState === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
  });

  return (
    <AppThemeContext.Provider value={{
      theme,
      handleToggleTheme
    }}>
      { children }
    </AppThemeContext.Provider>
  );
}
