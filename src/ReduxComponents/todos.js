import React, { useState } from 'react';



const TodoItem = ({ todo, onToggle }) => {
    return(
        <li style={{textDecoration: todo.done ? 'line-through' : 'none' }}
            onClick={() => onToggle(todo.id)}>
            {todo.text}
        </li>
    );
}






const TodoList = ({ todos, onToggle }) => {
    return(
        <ul>
            {
                todos.map(todo => (<TodoItem key={todo.id} todo={todo} onToggle={onToggle}/>))
            }
        </ul>
    );
}








const Todos = ({ todos, onCreate, onToggle }) => {
    const [text, setText] = useState('');
    const onChange = (event) => {
        setText(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        onCreate(text);
        setText('');
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={text} onChange={onChange}/>
                <button onSubmit={onSubmit}>등록</button>
            </form>
            <TodoList todos={todos} onToggle={onToggle}/>
        </div>
    );
}

export default Todos;