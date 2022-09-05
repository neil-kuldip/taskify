import React from 'react';
import { Todo } from '../models/Todo';
import SingleTodo from './SingleTodo';
import "./styles.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList : React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    const activeTodosList = todos.map((element, index) => (
        <SingleTodo 
            index={index}
            todo={element} 
            key={element.id} 
            todos={todos} 
            setTodos={setTodos}
        />
    ))

    const completedTodosList = completedTodos.map((element, index) => (
        <SingleTodo
            index={index}
            todo={element}
            key={element.id}
            todos={completedTodos}
            setTodos={setCompletedTodos}
        />
    ))
    return (
        <div className="container">
            <Droppable droppableId='TodosList'>
                {
                    (provided, snapshot) => (
                        <div 
                            className={`todos ${snapshot.isDraggingOver?"dragactive":""}`} 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Active Tasks
                            </span>
                            {activeTodosList}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {
                    (provided, snapshot) => (
                        <div 
                            className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}`} 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Completed Tasks
                            </span>
                            {completedTodosList}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    );

};

export default TodoList;