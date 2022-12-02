import { useContext } from 'react';
import Moon from '../../assets/icons/icon-moon.svg';
import Sun from '../../assets/icons/icon-sun.svg';
import { AppThemeContext } from '../../contexts/AppThemeProvider';
import { Button } from './styles';


export function ThemeToggler() {
  const { theme, handleToggleTheme } = useContext(AppThemeContext);
  return (
    <Button onClick={handleToggleTheme}>
      <img src={theme === 'dark' ? Sun : Moon} alt="Theme switcher"/>
    </Button>
  );
}
