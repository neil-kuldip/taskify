import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../models/Todo";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
    oppositeTodos: Todo[];
    setOppositeTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos, oppositeTodos, setOppositeTodos}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string|number>(todo.todo);

    const handleDone = (id: number) => {
        let todoRemove = todos.filter((element) => element.id === id)[0];
        todoRemove.isDone = !todoRemove.isDone;
        setTodos(
            todos.filter((element) => element.id !== id)
        );
        setOppositeTodos(
            [...oppositeTodos, todoRemove]
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((element) => element.id !== id));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((element) => 
            element.id === id? {...element, todo: editTodo}: element)
        );
        setEdit(!edit);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form 
                        className={`todos__single ${snapshot.isDragging?"drag":""}`} 
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                    { edit? (
                        <input 
                            ref={inputRef}
                            value={editTodo} 
                            onChange={(e)=>setEditTodo(e.target.value)}
                            className="todos__single--text"
                        />
                    ) : (
                        todo.isDone ? (
                        <s className="todos__single--text">
                            {todo.todo}
                        </s>
                        ) : (
                        <span className="todos__single--text">
                            {todo.todo}
                        </span>
                        )
                    )
                    }
    
                
                    <div>
                        <span className="icon"
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit)
                                }
                            }
                        }> <AiFillEdit /> </span>
                        <span className="icon"
                            onClick={() => handleDelete(todo.id)}
                        > <AiFillDelete /> </span>
                        <span className="icon" 
                            onClick={() => handleDone(todo.id)}
                        > <MdDone /> </span>
                    </div>
                    </form>
                )
            }
           
        </Draggable>
    );
};

export default SingleTodo;