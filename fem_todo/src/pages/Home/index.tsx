import { ActionButton } from '../../components/ActionButton';
import { Todo } from '../../components/Todo';
import { Todo as TodoType } from '../../@types/Todo';
import { Actions, Container, Footer, Header, Input, TodoContainer, TodoList } from './styles';
import { useMemo, useState } from 'react';
import { ThemeToggler } from '../../components/ThemeToggler';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const todosMock: TodoType[] = [
  {
    id: 1,
    title: 'Jog around the park 3x',
    completed: false,
    order: 1
  },
  {
    id: 2,
    title: 'Go to the midnight party',
    completed: false,
    order: 2
  },
  {
    id: 3,
    title: 'Testing',
    completed: true,
    order: 3
  },
  {
    id: 4,
    title: 'Teste123 123 456 798',
    completed: true,
    order: 4
  },
  {
    id: 5,
    title: 'Take a walk with my cat',
    completed: true,
    order: 5
  },
  {
    id: 6,
    title: 'Dinner with friends',
    completed: true,
    order: 6
  },
  {
    id: 7,
    title: 'Dinner with friends',
    completed: true,
    order: 7
  },
  {
    id: 8,
    title: 'Dinner with friends',
    completed: true,
    order: 8
  },
  {
    id: 9,
    title: 'Dinner with friends',
    completed: true,
    order: 9
  }
];

enum FilterEnum {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

export function Home() {
  const [todos, setTodos] = useState<TodoType[]>(todosMock);
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

  function handleOnChange(id: number) {
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

  function handleRemove(id: number) {
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

    const [reorderedItem] = todos.splice(result.source.index, 1);
    todos.splice(result.destination.index, 0, reorderedItem);
    setTodos(todos);
  }

  return (
    <Container>
      <Header>
        <h1>TODO</h1>
        <ThemeToggler/>
      </Header>

      <Input placeholder="Create a new todo..." />

      <TodoContainer>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <TodoList {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
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
          <span>5 items left</span>

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
      <span>Drag and drop to reorder list</span>
    </Container>
  );
}
