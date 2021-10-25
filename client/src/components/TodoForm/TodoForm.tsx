/* eslint-disable jsx-a11y/no-onchange */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { useTodosContext } from '../../context/globalState';
import ITodo from '../../models/Todo.interface';
import './TodoForm.css';
import RadioButton from '../Checkbox/Checkbox';
import Button from '../Buttons/Button/Button';

type AppProps = {
  todo?: ITodo;
  type: 'create' | 'edit';
  isOpen: boolean;
};

type AppParams = {
  id: string;
};

const TodoForm = ({ todo, type, isOpen }: AppProps): JSX.Element => {
  const transition = useTransition(isOpen, {
    from: {
      x: -100,
      y: 800,
      opacity: 0,
    },
    enter: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    leave: {
      x: 100,
      y: 800,
      opacity: 0,
    },
  });

  const { todos, addTodo, updateTodo } = useTodosContext()!;

  const [dueDate, setDueDate] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ITodo>(
    todo || {
      title: '',
      body: '',
      pinned: false,
      section: 'private',
    }
  );

  const { id } = useParams<AppParams>();
  const history = useHistory<History>();

  useEffect(() => {
    if (type === 'edit') {
      const todo = todos.find((todo) => todo.id === Number(id));

      if (todo) {
        setFormData(todo);
      }

      if (todo?.dueDate) {
        setDueDate(true);
      }
    }
  }, []);

  const handleInputChange = (
    event: React.FormEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    type: 'section' | 'title' | 'body' | 'dueDate'
  ): void => {
    const { value } = event.currentTarget;

    setFormData((prevState) => {
      return {
        ...prevState,
        [type]: value,
      };
    });
  };

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (formData?.title) {
      const todo: ITodo = {
        ...formData,
        completed: false,
      };

      if (type === 'create') {
        addTodo(todo);
      } else {
        updateTodo(todo);
      }

      setFormData({
        title: '',
        body: '',
        pinned: false,
      });

      history.push('/');
    } else {
      inputRef.current?.focus();
    }
  };

  const form: JSX.Element = (
    <form
      onSubmit={handleFormSubmit}
      className={`todo-form ${!isOpen && 'todo-form--close'}`}
    >
      <select
        value={formData.section}
        onChange={(event: React.FormEvent<HTMLSelectElement>) =>
          handleInputChange(event, 'section')
        }
      >
        <option value="private">Private</option>
        <option value="work">Work</option>
      </select>

      <input
        ref={inputRef}
        type="text"
        placeholder="Todo title"
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          handleInputChange(event, 'title')
        }
        value={formData?.title}
      />

      <textarea
        name=""
        id=""
        placeholder="Todo body"
        onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
          handleInputChange(event, 'body')
        }
        value={formData?.body}
      />

      <fieldset>
        <RadioButton
          id="dueDate"
          label="Add due date?"
          callback={() => {
            setDueDate(!dueDate);
          }}
          checked={dueDate}
        />
        {dueDate && (
          <input
            type="date"
            value={formData.dueDate || ''}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              handleInputChange(event, 'dueDate')
            }
          />
        )}
      </fieldset>

      <Button
        typeOption="button"
        styleOption="button"
        buttonType="submit"
        callback={handleFormSubmit}
        text="Continue"
      />
    </form>
  );

  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.form
            style={style}
            onSubmit={handleFormSubmit}
            className="todo-form"
          >
            <select
              value={formData.section}
              onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                handleInputChange(event, 'section')
              }
            >
              <option value="private">Private</option>
              <option value="work">Work</option>
            </select>

            <input
              ref={inputRef}
              type="text"
              placeholder="Todo title"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                handleInputChange(event, 'title')
              }
              value={formData?.title}
            />

            <textarea
              name=""
              id=""
              placeholder="Todo body"
              onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
                handleInputChange(event, 'body')
              }
              value={formData?.body}
            />

            <fieldset>
              <RadioButton
                id="dueDate"
                label="Add due date?"
                callback={() => {
                  setDueDate(!dueDate);
                }}
                checked={dueDate}
              />
              {dueDate && (
                <input
                  type="date"
                  value={formData.dueDate || ''}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    handleInputChange(event, 'dueDate')
                  }
                />
              )}
            </fieldset>

            <Button
              typeOption="button"
              styleOption="button"
              buttonType="submit"
              callback={handleFormSubmit}
              text="Continue"
            />
          </animated.form>
        ) : (
          ''
        )
      )}
    </>
  );
};

export default TodoForm;
