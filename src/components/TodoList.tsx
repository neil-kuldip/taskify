import React from 'react';
import { Todo } from '../models/Todo';
import SingleTodo from './SingleTodo';
import "./styles.css";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList : React.FC<Props> = ({todos, setTodos}) => {
    const todoList = todos.map((element) => (
        <SingleTodo 
            todo={element} 
            key={element.id} 
            todos={todos} 
            setTodos={setTodos}
        />
    ))
    return (
        <div className="todos">{todoList}</div>
    );

};

export default TodoList;