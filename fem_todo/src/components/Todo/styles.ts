import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.separator};
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;


  button {
    background: transparent;
    border: none;
    opacity: 0;
  }

  &:hover {
    button {
      opacity: 1;
    }
  }
`;
