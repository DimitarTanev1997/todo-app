import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useTodosContext } from '../../context/globalState';
import ITodo from '../../models/Todo.interface';
import CircleButton from '../CircleButton/CircleButton';
import './TodoForm.css';
import { useParams, useHistory } from 'react-router-dom';
import RadioButton from '../Checkbox/Checkbox';
import IconButton from '../IconButton/IconButton';

type AppProps = {
    todo?: ITodo,
    type: 'create' | 'edit'
}

type AppParams = {
    id: string
}

const TodoForm = ({ todo, type }: AppProps ) => {
    const { todos, addTodo, updateTodo } = useTodosContext()!;

    const [ dueDate, setDueDate ] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<ITodo>(todo || {
        title: '',
        body: '',
        pinned: false,
        section: 'private',
    });

    let { id } = useParams<AppParams>();
    let history = useHistory<History>();

    useEffect(() => {
        if(type === 'edit') {
            const todo = todos.find(todo => todo.id === Number(id));

            todo && (setFormData(todo));
            todo?.dueDate && setDueDate(true)
        }
    }, [])

    const handleInputChange = (event: React.FormEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, type: 'section' | 'title' | 'body' | 'dueDate'): void => {
        let value: string | Date = event.currentTarget.value;
        
        setFormData(prevState => {
            return {
                ...prevState,
                [type]: value
            }
        })
    }

    const handleFormSubmit = (event: FormEvent): void => {
        event.preventDefault();

        if (formData?.title) {
            const todo: ITodo = {
                ...formData,
                completed: false
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
    }

    return (
        <form onSubmit={handleFormSubmit} 
        className="TodoForm">
            <select value={formData.section} onChange={(event: React.FormEvent<HTMLSelectElement>) => handleInputChange(event, 'section')}>
                <option value="private">Private</option>
                <option value="work">Work</option>
            </select>
            
            <input
                ref={inputRef}
                type="text"
                placeholder="Todo title"
                onChange={(event: React.FormEvent<HTMLInputElement>) => handleInputChange(event, 'title')}
                value={formData?.title}
            />

            <textarea
                name=""
                id=""
                placeholder="Todo body"
                onChange={(event: React.FormEvent<HTMLTextAreaElement>) => handleInputChange(event, 'body')}
                value={formData?.body}
            ></textarea>

            <fieldset>
                <RadioButton id="dueDate" label="Add due date?" callback={() => {setDueDate(!dueDate)}} checked={dueDate}></RadioButton>
                {dueDate && (<input type="date" value={formData.dueDate || ''} onChange={(event: React.FormEvent<HTMLInputElement>) => handleInputChange(event, 'dueDate')} />)}
            </fieldset>

            <IconButton className="TodoFormButton" callback={() => handleFormSubmit} type="FaPlusCircle" size="3em" color="#2bd485" />
        </form>
    )
}

export default TodoForm;