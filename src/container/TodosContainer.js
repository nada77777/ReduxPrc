import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo } from '../modules/todos';
import Todos from '../ReduxComponents/todos';

const TodosContainer = (props) => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const onCreate = (text) => dispatch(addTodo(text));
    const onToggle = (id) => dispatch(toggleTodo(id));
    return(
        <Todos todos={todos} onCreate={onCreate} onToggle={onToggle}/>
    );
};

export default TodosContainer;