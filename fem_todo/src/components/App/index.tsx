import { ThemeProvider } from 'styled-components';
import { Home } from '../../pages/Home';
import { GlobalStyles } from '../..//styles/global';
import dark from '../../styles/themes/dark';
import light from '../../styles/themes/light';
import { Container } from './styles';
import { useContext } from 'react';
import { AppThemeContext } from '../../contexts/AppThemeProvider';

export default function App() {
  const { theme } = useContext(AppThemeContext);

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <GlobalStyles />
      <Container>
        <Home/>
      </Container>
    </ThemeProvider>
  );
}

