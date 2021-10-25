import React, { useState } from 'react';
import ITodo from '../../models/Todo.interface';
import Checkbox from '../Checkbox/Checkbox';
import './Todo.css';
import { useTodosContext } from '../../context/globalState';
import Button from '../Buttons/Button/Button';

type AppProps = {
  todo: ITodo;
};

const Todo = ({ todo }: AppProps): JSX.Element => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { removeTodo, updateTodo } = useTodosContext()!;

  const handleToggle = (): void => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    updateTodo(updatedTodo);
  };

  const handlePin = (): void => {
    const updatedTodo = {
      ...todo,
      pinned: !todo.pinned,
    };

    updateTodo(updatedTodo);
  };

  const handleDelete = (): void => {
    removeTodo(todo.id!);
  };

  const handleMouseOver = (): void => {
    setIsDeleteOpen(true);
  };

  const handleMouseOut = (): void => {
    setIsDeleteOpen(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <li
      className="todo"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Checkbox checked={todo.completed!} callback={handleToggle} />
      <div className="todo__content">
        <h3
          style={{
            textDecoration: todo.completed ? 'line-through' : 'initial',
          }}
        >
          {todo.title}
        </h3>
      </div>

      <Button
        typeOption="button"
        className={`todo__delete-btn ${
          isDeleteOpen && 'todo__delete-btn--open'
        }`}
        styleOption="icon"
        iconSize="1.5em"
        iconType="FaTrash"
        callback={handleDelete}
        iconColor="red"
      />

      {/* <div className={`TodoOptionsBar Open-${isOptionsBarOpen}`} onMouseLeave={handleToggleOptionsBar}>
                <Link to={`/todos/${todo.id}`}>
                    <IconButton type="FaPen" />
                </Link>
                <IconButton type="FaTrash" callback={handleDelete} />
            </div> */}
    </li>
  );
};

export default Todo;
