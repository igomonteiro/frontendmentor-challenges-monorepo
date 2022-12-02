import styled from 'styled-components';

export const Button = styled.button`
  border: 0;
  background: transparent;
  border-radius: ${({ theme }) => theme.rounded.sm };
  transition: all 0.2s ease-in-out;
`;
