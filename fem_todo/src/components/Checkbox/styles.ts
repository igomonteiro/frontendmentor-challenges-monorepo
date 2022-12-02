import styled, { css } from 'styled-components';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

type CheckboxProps = {
  checked: boolean;
};

export const StyledCheckbox = styled.label<CheckboxProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  ${({ theme, checked }) => checked ? css`border: 0;` : css`border: 1px solid ${theme.colors.neutral[600]};`}
  background: ${({ theme, checked }) => checked ? theme.colors.primary.gradient : 'transparent' };

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Text = styled.label<CheckboxProps>`
  margin: 0 16px;
  color: ${({ theme, checked }) => checked && theme.colors.neutral[600] };
  text-decoration: ${({ checked }) => checked ? 'line-through' : 'none' };
  max-height: 44px;
  overflow: auto;
  flex: 1;
`;
