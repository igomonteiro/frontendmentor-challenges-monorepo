import { Checkbox } from '../Checkbox';
import { Container } from './styles';

import CrossIcon from '../../assets/icons/icon-cross.svg';
import { Todo as TodoType } from '../../@types/Todo';

type TodoProps = {
  todo: TodoType;
  onChange: (id: number) => void;
  onRemove: (id: number) => void;
}

export function Todo({ todo, onChange, onRemove }: TodoProps) {
  function handleOnChange() {
    onChange(todo.id);
  }

  return (
    <Container>
      <Checkbox title={todo.title} checked={todo.completed} onChange={handleOnChange}/>
      <button onClick={() => onRemove(todo.id)}>
        <img src={CrossIcon} alt="Remove"></img>
      </button>
    </Container>
  );
}
