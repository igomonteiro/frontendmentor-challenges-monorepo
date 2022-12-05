import { ActionButton } from '../../components/ActionButton';
import { Todo } from '../../components/Todo';
import { Todo as TodoType } from '../../@types/Todo';
import { Actions, Container, Footer, Header, Input, OuterFooter, TodoContainer, TodoList } from './styles';
import { FormEvent, useMemo, useState } from 'react';
import { ThemeToggler } from '../../components/ThemeToggler';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const todosMock: TodoType[] = [
  {
    id: uuidv4(),
    title: 'Complete online JavaScript course',
    completed: true
  },
  {
    id: uuidv4(),
    title: 'Jog around the park 3x',
    completed: false
  },
  {
    id: uuidv4(),
    title: '10 minutes meditation',
    completed: false
  },
  {
    id: uuidv4(),
    title: 'Read for 1 hour',
    completed: false
  },
  {
    id: uuidv4(),
    title: 'Pick up groceries',
    completed: false
  },
  {
    id: uuidv4(),
    title: 'Complete Todo App on Frontend Mentor',
    completed: false
  }
];

enum FilterEnum {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

export function Home() {
  const [todos, setTodos] = useState<TodoType[]>(todosMock);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [currentFilter, setCurrentFilter] = useState<FilterEnum>(FilterEnum.All);
  const [activeAction, setActiveAction] = useState(0);

  const filteredTodos = useMemo(() => {
    if (currentFilter === FilterEnum.Active) {
      return todos.filter(todo => !todo.completed);
    } else if (currentFilter === FilterEnum.Completed) {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }, [currentFilter, todos]);

  const leftTodosCount = useMemo(() =>  todos.filter(todo => !todo.completed).length, [todos]);

  function handleOnChange(id: string) {
    const mapTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }

      return todo;
    });

    setTodos(mapTodos);
  }

  function handleCreateTodo(e: FormEvent) {
    e.preventDefault();
    if (!newTodoTitle) return;

    const newTodo: TodoType = {
      id: uuidv4(),
      title: newTodoTitle,
      completed: false
    };

    setTodos(prevState => [newTodo, ...prevState]);
  }

  function handleRemove(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleAllFilter() {
    setCurrentFilter(FilterEnum.All);
    setActiveAction(0);
  }

  function handleActiveFilter() {
    setCurrentFilter(FilterEnum.Active);
    setActiveAction(1);
  }

  function handleCompletedFilter() {
    setCurrentFilter(FilterEnum.Completed);
    setActiveAction(2);
  }

  function handleClearCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    // easy order if the list isn't filtered, just get the reordered item and add it to it's new index
    if (currentFilter === FilterEnum.All) {
      const toOrderTodos = todos;
      const [reorderedItem] = toOrderTodos.splice(result.source.index, 1);
      toOrderTodos.splice(result.destination.index, 0, reorderedItem);
      return setTodos(toOrderTodos);
    }

    // when filtered, not working properly!
    const toOrderTodos = filteredTodos;
    const [reorderedItem] = filteredTodos.splice(result.source.index, 1);
    toOrderTodos.splice(result.destination.index, 0, reorderedItem);

    return setTodos(toOrderTodos);
  }

  return (
    <Container>
      <Header>
        <h1>TODO</h1>
        <ThemeToggler/>
      </Header>

      <form onSubmit={handleCreateTodo}>
        <Input onChange={(e) => setNewTodoTitle(e.target.value)} placeholder="Create a new todo..." />
      </form>

      <TodoContainer>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <TodoList {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Todo
                          todo={todo}
                          onChange={handleOnChange}
                          onRemove={handleRemove}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TodoList>
            )}
          </Droppable>
        </DragDropContext>

        <Footer>
          <span>{ leftTodosCount } items left</span>

          <Actions>
            <ActionButton
              weight="bold"
              title="All"
              active={activeAction === 0}
              onClick={handleAllFilter}
            />

            <ActionButton
              weight="bold"
              title="Active"
              active={activeAction === 1}
              onClick={handleActiveFilter}
            />

            <ActionButton
              weight="bold"
              title="Completed"
              active={activeAction === 2}
              onClick={handleCompletedFilter}
            />
          </Actions>

          <ActionButton
            weight="light"
            title="Clear completed"
            onClick={handleClearCompleted}
          />
        </Footer>
      </TodoContainer>

      <OuterFooter>
        <ActionButton
          weight="bold"
          title="All"
          active={activeAction === 0}
          onClick={handleAllFilter}
        />

        <ActionButton
          weight="bold"
          title="Active"
          active={activeAction === 1}
          onClick={handleActiveFilter}
        />

        <ActionButton
          weight="bold"
          title="Completed"
          active={activeAction === 2}
          onClick={handleCompletedFilter}
        />
      </OuterFooter>
      <span>Drag and drop to reorder list</span>
    </Container>
  );
}
