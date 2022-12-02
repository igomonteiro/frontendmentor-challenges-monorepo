import { DefaultTheme } from 'styled-components';

const light : DefaultTheme = {
  rounded: {
    sm: '4px',
    md: '8px'
  },
  backgroundUrl: {
    desktop: 'bg-desktop-light.jpg',
    mobile: 'bg-mobile-light.jpg'
  },
  colors: {
    primary: {
      main: 'hsl(220, 98%, 61%)',
      gradient: 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      bg: '#fff'
    },
    body: 'hsl(235, 19%, 35%)',
    background: 'hsl(0, 0%, 98%)',
    separator: 'hsl(233, 11%, 84%)',
    neutral: {
      200: 'hsl(0, 0%, 98%)',
      300: 'hsl(236, 33%, 92%)',
      400: 'hsl(233, 11%, 84%)',
      500: 'hsl(236, 9%, 61%)',
      600: 'hsl(235, 19%, 35%)'
    }
  }
};

export default light;
