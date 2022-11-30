import { useContext } from 'react';
import { HiMoon, HiOutlineSun } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeProvider';

export function Header() {
  const { theme, handleToggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <header className="w-full dark:bg-brand-blue-700 h-20 px-4 md:px-16 py-8 flex items-center justify-between dark:text-brand-gray-light shadow-md">
      <h2 className="text-md md:text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>Where in the world?</h2>
      <button type="button" className="flex items-center justify-between gap-2" onClick={handleToggleTheme}>
        {theme === 'dark' ? <HiOutlineSun size={16}/> : <HiMoon size={16}/>}
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  );
}
