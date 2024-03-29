import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import ITodo from '../models/Todo.interface';
import { FilterType } from '../models/types';
import TodosReducer from './reducers';
import { useAuthContext } from './userState/authContext';

type ContextType = {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  removeTodo: (todoId: number) => void;
  updateTodo: (todo: ITodo) => void;
  filterAll: (filter?: FilterType, filterValue?: string | boolean) => void;
  getAll: (filter?: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const TodosContext = React.createContext<ContextType | undefined>(undefined);

const TodosProvider = ({ children }: Props): JSX.Element => {
  const [todosState, dispatch] = useReducer(TodosReducer, []);
  const { token } = useAuthContext()!;

  useEffect(() => {
    axios
      .get('/api/todos', { headers: { Authorization: `Bearer ${token}` } })
      .then((response: AxiosResponse<ITodo[]>) => {
        dispatch({ type: 'SET_INITIAL_STATE', initialState: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addTodo = (todo: ITodo): void => {
    axios
      .post('/api/todos', todo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse<ITodo>) => {
        dispatch({ type: 'ADD_ITEM', item: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeTodo = (todoId: number): void => {
    axios
      .delete(`/api/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse) => {
        dispatch({ type: 'REMOVE_ITEM', itemId: todoId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTodo = (todo: ITodo): void => {
    axios
      .put(`/api/todos/${todo.id}`, todo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse) => {
        dispatch({ type: 'UPDATE_ITEM', updatedItem: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterAll = (
    filter?: FilterType,
    filterValue?: string | boolean
  ): void => {
    axios
      .get(
        `/api/todos?${filter || ''}${filterValue ? `=${filterValue}` : ''}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response: AxiosResponse) => {
        dispatch({ type: 'SET_TODOS', todos: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAll = (filter?: string): void => {
    axios
      .get('/api/todos', { headers: { Authorization: `Bearer ${token}` } })
      .then((response: AxiosResponse<ITodo[]>) => {
        dispatch({ type: 'SET_TODOS', todos: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TodosContext.Provider
      value={{
        todos: todosState,
        addTodo,
        removeTodo,
        updateTodo,
        filterAll,
        getAll,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);

export default TodosProvider;
