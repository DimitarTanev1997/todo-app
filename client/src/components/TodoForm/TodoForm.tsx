import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTodosContext } from '../../context/globalState';
import ITodo from '../../models/Todo.interface';
import CircleButton from '../Buttons/CircleButton/CircleButton';
import './TodoForm.css';
import { useParams, useHistory } from 'react-router-dom';
import RadioButton from '../Checkbox/Checkbox';
import IconButton from '../Buttons/IconButton/IconButton';
import Button from '../Buttons/Button/Button';
import { useTransition, animated } from 'react-spring';

type AppProps = {
  todo?: ITodo;
  type: 'create' | 'edit';
  isOpen: boolean;
};

type AppParams = {
  id: string;
};

const TodoForm = ({ todo, type, isOpen }: AppProps) => {
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

  let { id } = useParams<AppParams>();
  let history = useHistory<History>();

  useEffect(() => {
    if (type === 'edit') {
      const todo = todos.find((todo) => todo.id === Number(id));

      todo && setFormData(todo);
      todo?.dueDate && setDueDate(true);
    }
  }, []);

  const handleInputChange = (
    event: React.FormEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    type: 'section' | 'title' | 'body' | 'dueDate'
  ): void => {
    let value: string | Date = event.currentTarget.value;

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
      ></textarea>

      <fieldset>
        <RadioButton
          id="dueDate"
          label="Add due date?"
          callback={() => {
            setDueDate(!dueDate);
          }}
          checked={dueDate}
        ></RadioButton>
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
      ></Button>
    </form>
  );

  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.form
            style={style}
            onSubmit={handleFormSubmit}
            className={`todo-form`}
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
            ></textarea>

            <fieldset>
              <RadioButton
                id="dueDate"
                label="Add due date?"
                callback={() => {
                  setDueDate(!dueDate);
                }}
                checked={dueDate}
              ></RadioButton>
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
            ></Button>
          </animated.form>
        ) : (
          ''
        )
      )}
    </>
  );
};

export default TodoForm;
