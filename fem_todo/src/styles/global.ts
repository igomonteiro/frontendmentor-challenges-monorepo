import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Josefin Sans', sans-serif;
  }

  body {
    font-size: 18px;
    background-image: url(${({ theme}) => theme.backgroundUrl.mobile });
    background-repeat: no-repeat;
    background-color: ${({ theme }) => theme.colors.background};
    background-size: 100%;
    color: ${({ theme }) => theme.colors.body};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  @media screen and (min-width: 375px) {
    body {
      background-image: url(${({ theme}) => theme.backgroundUrl.desktop });
    }
  }

  button {
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.rounded.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.gradient};
    border-radius: ${({ theme }) => theme.rounded.sm};
  }
`;
