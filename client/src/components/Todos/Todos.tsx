import React from 'react';
import { useTodosContext } from '../../context/globalState';
import ITodo from '../../models/Todo.interface';
import Todo from '../Todo/Todo';
import './Todos.css';

type TodoSort = 'pinned' | 'completed';

const Todos = () => {
    const { todos } = useTodosContext()!;

  const todoElements: Array<JSX.Element> = todos.map((todo: ITodo) => {
    return <Todo todo={todo} key={todo.id} />
  });

  return (
    <div className="Todos">
      <ul className="TodosList">
          {todoElements.length ? todoElements : <h2>Such empty</h2>}
     </ul>
    </div>
  )
}

export default Todos;