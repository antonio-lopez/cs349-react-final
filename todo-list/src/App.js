import React, { useState } from 'react'
import './App.css'

// simple Todo app that uses the React useState hook which allows us to 
// store state in a functional component. no data persistence

// Todo component which takes in destructured props
function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
        <div style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}
        className="todo">
        { todo.text}
        <div>
            <button onClick={() => completeTodo(index)}>Complete</button>
            <button onClick={() => removeTodo(index)}>x</button>
        </div>
        </div>
    )
}

// Todo form component
function TodoForm( {addTodo}) {
    // takes in one prop which is the Add Todo method to add more todos
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if(!value) return;  // will not submit if it's an empty value
        addTodo(value);
        setValue('');   // clear form after Todo has been added to the list
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            className="input" 
            value={value} 
            placeholder="Add Todo..."
            // sets the value to the Todo that is in the form
            //  and passes it to setValue
            onChange={e => setValue(e.target.value)} />
        </form>
    )
}

function App() {
    // start a list with some hardcoded Todos
    const [todos, setTodos] = useState([
        {
            text: 'Make React app',
            isCompleted: false
        },
        {
            text: 'Implement useState()',
            isCompleted: false
        },
        {
            text: 'Turn in for final',
            isCompleted: false
        }
    ]);

    // takes a text as a parameter and adds a new Todo to the list
    const addTodo = text => {
        // take the array of Todos, use spread operator to
        // copy everything from the array and add the new Todo (text)
        const newTodos = [...todos, { text }];
        setTodos(newTodos); //update the state with the new Todo list
    }

    // takes an index as a parameter to know which Todo is complete
    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos); // updates the state of the Todo array
    };

   // takes an index as a parameter to know which Todo to remove
    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos); // updates the state of the Todo array
    }

    return (
        <div className="app">
            <h1>Todo List</h1>
            <h4>Simple React app with useState hooks </h4>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <Todo 
                    key={index} 
                    index={index} 
                    todo={todo} 
                    completeTodo={completeTodo} 
                    removeTodo={removeTodo}/>
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
        </div>
    )
}

export default App;