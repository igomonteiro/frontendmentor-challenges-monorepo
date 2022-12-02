import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral[600] };
    align-self: center;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: 700;
    letter-spacing: 14px;
    color: #fff;
  }
`;

export const Input = styled.input`
  border: 0;
  outline: none;
  font-size: 18px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.primary.bg };
  border-radius: ${({ theme }) => theme.rounded.sm };
  color: ${({ theme }) => theme.colors.body };
  caret-color: ${({ theme }) => theme.colors.primary.main };
  margin-top: 36px;

  box-shadow: 0px 8px 14px 4px rgba(0,0,0,0.16);
`;

export const TodoContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  background-color: ${({ theme }) => theme.colors.primary.bg };
  border-radius: ${({ theme }) => theme.rounded.sm };
  box-shadow: 0px 8px 14px 4px rgba(0,0,0,0.16);
`;

export const TodoList = styled.ul`
  list-style: none;
  max-height: 440px;
  overflow: auto;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;

  > span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral[600]}
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
