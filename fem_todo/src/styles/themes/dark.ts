import { DefaultTheme } from 'styled-components';

const dark: DefaultTheme = {
  rounded: {
    sm: '4px',
    md: '8px'
  },
  backgroundUrl: {
    desktop: 'bg-desktop-dark.jpg',
    mobile: 'bg-mobile-dark.jpg'
  },
  colors: {
    primary: {
      main: 'hsl(220, 98%, 61%)',
      gradient: 'linear-gradient(-45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      bg: 'hsl(235, 24%, 19%)'
    },
    body: 'hsl(236, 33%, 92%)',
    background: 'hsl(235, 21%, 11%)',
    separator: 'hsl(233, 14%, 35%)',
    neutral: {
      300: 'hsl(236, 33%, 92%)',
      400: 'hsl(234, 39%, 85%)',
      500: 'hsl(234, 11%, 52%)',
      600: 'hsl(233, 14%, 35%)',
      700: 'hsl(237, 14%, 26%)',
      800: 'hsl(235, 24%, 19%)',
      900: 'hsl(235, 21%, 11%)'
    }
  }
};

export default dark;
