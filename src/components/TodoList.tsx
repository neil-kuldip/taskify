import React from 'react';
import { Todo } from '../models/Todo';
import "./styles.css";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList : React.FC<Props> = ({todos, setTodos}) => {
    const todoList = todos.map((element) => (
        <li>{element.todo}</li>
    ))
    return (
        <div className="todos">{todoList}</div>
    );

};

export default TodoList;