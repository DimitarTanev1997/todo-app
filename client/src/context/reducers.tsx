import ITodo from '../models/Todo.interface';

type ReducerAction =
  | { type: 'SET_INITIAL_STATE'; initialState: ITodo[] }
  | { type: 'ADD_ITEM'; item: ITodo }
  | { type: 'REMOVE_ITEM'; itemId: number }
  | { type: 'UPDATE_ITEM'; updatedItem: ITodo }
  | { type: 'SET_TODOS'; todos: ITodo[] };

const addTodo = (todo: ITodo, todos: ITodo[]): ITodo[] => {
  return [...todos, todo];
};

const removeTodo = (todoId: number, todos: ITodo[]): ITodo[] => {
  const updatedTodos = [...todos];
  const removedTodoIndex = updatedTodos.findIndex((todo: ITodo) => {
    return todo.id === todoId;
  });

  updatedTodos.splice(removedTodoIndex, 1);

  return updatedTodos;
};

const updateTodo = (updatedTodo: ITodo, todos: ITodo[]): ITodo[] => {
  const updatedTodos = [...todos];
  const removedTodoIndex = updatedTodos.findIndex((todo: ITodo) => {
    return todo.id === updatedTodo.id;
  });

  updatedTodos[removedTodoIndex] = { ...updatedTodo };
  return updatedTodos;
};

const setTodos = (newTodos: ITodo[], todos: ITodo[]): ITodo[] => {
  return newTodos;
};

export const todosReducer = (
  state: ITodo[],
  action: ReducerAction
): ITodo[] => {
  switch (action.type) {
    case 'SET_INITIAL_STATE': {
      return action.initialState;
    }

    case 'ADD_ITEM': {
      return addTodo(action.item, state);
    }

    case 'REMOVE_ITEM': {
      return removeTodo(action.itemId, state);
    }

    case 'UPDATE_ITEM': {
      return updateTodo(action.updatedItem, state);
    }

    case 'SET_TODOS': {
      return setTodos(action.todos, state);
    }

    default:
      return state;
  }
};
