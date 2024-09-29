
import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {

    const [todo, setTodo] = useState({ description: "", date: "" });
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: value,
        }));
    };

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ description: "", date: "" })
    };

    const handleDelete = (row) => {
        setTodos(todos.filter((todo, index) => index != row));
    }

    return (
        <>
            <h1>Todo List</h1>
            <div className="input-container">
            <input name="description" placeholder="Description" onChange={handleChange} value={todo.description} />
            <input type="date" name="date" onChange={handleChange} value={todo.date} />
            <button onClick={addTodo}>Add</button>
            </div>
            <TodoTable todos = {todos} handleDelete = {handleDelete}></TodoTable>
        </>
    );
}

export default TodoList;
