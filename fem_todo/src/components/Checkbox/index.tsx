import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, Text } from './styles';

import CheckIcon from '../../assets/icons/icon-check.svg';

type CheckboxProps = {
  title: string;
  checked: boolean;
  onChange: () => void;
}

export function Checkbox({ title, checked, onChange}: CheckboxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox onChange={onChange} defaultChecked={checked} />
      <StyledCheckbox onClick={onChange} checked={checked}>
        {checked && <img src={CheckIcon} alt="Check"/>}
      </StyledCheckbox>
      <Text checked={checked}>{title}</Text>
    </CheckboxContainer>
  );
}

