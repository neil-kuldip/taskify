import React, { useState } from 'react';
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import './App.css';
import { Todo } from './models/Todo';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  
  const [todo, setTodo] = useState<string | number>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e : React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && destination.index === source.index) return;
    let add, active = todos;
    let complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    }
    else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    
    if (destination.droppableId === "TodosList") {
      add.isDone = false;
      active.splice(destination.index, 0, add);
    }
    else {
      add.isDone = true;
      complete.splice(destination.index, 0, add);
    }
    setTodos([...active]);
    setCompletedTodos([...complete]);
  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList 
          todos={todos} 
          setTodos={setTodos} 
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
