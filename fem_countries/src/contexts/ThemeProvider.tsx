import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface ITheme {
  theme: 'dark' | 'light',
  handleToggleTheme: () => void;
}

const getInitialTheme = () : 'dark' | 'light' => {
  const userTheme = localStorage.getItem('theme');

  if (typeof userTheme === 'string') {
    // typescript trolling...
    return userTheme === 'dark' ? 'dark' : 'light';
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

export const ThemeContext = createContext<ITheme>({} as ITheme);

export function ThemeProvider({children} : PropsWithChildren) {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  function handleToggleTheme() {
    setTheme((prevState) => prevState === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  });

  return (
    <ThemeContext.Provider value={{
      theme,
      handleToggleTheme
    }}>
      { children }
    </ThemeContext.Provider>
  );
}
