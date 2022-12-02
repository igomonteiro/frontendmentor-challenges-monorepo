import styled from 'styled-components';

type ButtonProps = {
  weight: 'light' | 'bold';
  active: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: 0;
  background: transparent;
  font-weight: ${({ weight }) => weight };
  color: ${({ theme, active }) => active ? theme.colors.primary.main : theme.colors.neutral[500] };

  &:hover {
    color: ${({ theme }) => theme.colors.body };
    transition: color .2s ease-in-out;
  }
`;
