import { useEffect } from 'react';
import { useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReduce';


const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
  
    const [ todos, dispatch] = useReducer( todoReducer, initialState, init );
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));    
    }, [todos])
    

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };
        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
         dispatch({
            type: '[TODO] Remove todo',
            payload: id
         });

    }

    const handleToggleTodo = (id) => {
        dispatch({
           type: '[TODO] Toggle Todo',
           payload: id
        });
   }

   const counterTodos = () => {
        return todos.length;
   }

   const pendingTodos = () => {
        return todos.filter(todo => !todo.done).length;
   }



    return {
        ...todos,
        todos,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        counterTodos,
        pendingTodos,
    };
}
