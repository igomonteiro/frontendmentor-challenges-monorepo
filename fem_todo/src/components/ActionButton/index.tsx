import { Button } from './styles';

type ActionButtonProps = {
  weight?: 'light' | 'bold';
  active?: boolean;
  title: string;
  onClick: () => void;
}

export function ActionButton({ weight = 'light', active = false, title, onClick } : ActionButtonProps) {
  return (
    <Button weight={weight} active={active} onClick={onClick}>
      { title }
    </Button>
  );
}
