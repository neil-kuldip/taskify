import React, { useReducer } from 'react';
import { Todo } from '../models/Todo';


type Actions = {
    type:'add';
    payload: string|number;
} |
{
    type: "remove";
    payload: number;
} |
{
    type: "done";
    payload: number;
};

const TodoReducer = (state: Todo[], action: Actions) => {
    switch(action.type) {
        case "add":
            return [
                ...state,
                { id: Date.now(), todo: action.payload, isDone: false }
            ];
        case "remove":
            return state.filter((element) => element.id !== action.payload);
        case "done":
            return state.map((element) => element.id === action.payload? {...element, isDone: true}: element);
        default:
            return state;
    }
};

const ReducerExample = () => {
  const [state, dispatch] = useReducer(TodoReducer, []);
  return (
    <div>ReducerExample</div>
  )
}

export default ReducerExample