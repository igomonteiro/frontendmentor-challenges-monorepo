import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    rounded: {
      sm: string;
      md: string;
    },
    backgroundUrl: {
      mobile: string;
      desktop: string;
    },
    colors: {
      primary: {
        main: string;
        gradient: string;
        bg: string;
      },
      background: string;
      body: string;
      separator: string;
      neutral: {
        [key: number]: string;
      };
    }
  }
}
