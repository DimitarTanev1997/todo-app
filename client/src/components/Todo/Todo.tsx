import ITodo from '../../models/Todo.interface';
import Checkbox from '../Checkbox/Checkbox';
import './Todo.css';
import { useTodosContext } from '../../context/globalState';
import IconButton from '../IconButton/IconButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';


type AppProps = {
    todo: ITodo
}

const Todo = ({ todo }: AppProps) => {
    const [isOptionsBarOpen, setIsOptionsBarOpen] = useState(false);
    
    const { removeTodo, updateTodo } = useTodosContext()!;
    
    const handleToggle = (): void => {
        const updatedTodo = {
            ...todo,
            completed: !todo.completed
        };
        
        updateTodo(updatedTodo);
    }

    const handlePin = (): void => {
        const updatedTodo = {
            ...todo,
            pinned: !todo.pinned
        };

        updateTodo(updatedTodo);
    }

    const handleDelete = (): void => {
        removeTodo(todo.id!);
    };

    const handleToggleOptionsBar = (): void => {
        setIsOptionsBarOpen(!isOptionsBarOpen);
    }
    
    return (
        <li className="Todo">
            <Checkbox checked={todo.completed!} callback={handleToggle} />
            <div
                className="TodoContent"
                onClick={handleToggleOptionsBar}
                onMouseEnter={handleToggleOptionsBar}
            >
                <h2 style={{ textDecoration: todo.completed ? 'line-through' : 'initial' }}>{todo.title}</h2>
                <p>{todo.body}</p>
            </div>

            <IconButton className="TodoOptionsButton" size="1.5em" type="FaThumbtack" callback={handlePin} color={todo.pinned ? 'green' : 'black'} />
            
            <div className={`TodoOptionsBar Open-${isOptionsBarOpen}`} onMouseLeave={handleToggleOptionsBar}>
                <Link to={`/todos/${todo.id}`}>
                    <IconButton type="FaPen" />
                </Link>
                <IconButton type="FaTrash" callback={handleDelete} />
            </div>
        </li>
    )
}

export default Todo;

