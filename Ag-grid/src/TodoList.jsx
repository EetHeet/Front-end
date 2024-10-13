import { AgGridReact, useGridFloatingFilter } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useState } from "react";

function TodoList() {

    const [todo, setTodo] = useState({ description: "", date: "" });
    const [todos, setTodos] = useState([]);

    const [colDefs, setColDefs] = useState([
        { 
            field: "description", 
            filter: true, 
            floatingFilter: true 
        },
        {
            field: "priority",
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' },
            filter: true,
            floatingFilter: true
        },
        { 
            field: "date", 
            filter: true, 
            floatingFilter: true
        }
    ]);

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ description: "", date: "", priority: "" })
    };

    const handleDelete = (row) => {
        setTodos(todos.filter((todo, index) => index != row));
    }

    return (
        <>
            <h1>Todo List</h1>
            <input
                value={todo.description}
                name="description"
                placeholder="Description"
                onChange={(event => setTodo({ ...todo, description: event.target.value }))} />
            <input
                value={todo.priority}
                name="priority"
                placeholder="Priority"
                onChange={(event => setTodo({ ...todo, priority: event.target.value }))} />
            <input
                value={todo.date}
                name="date"
                placeholder="Date"
                onChange={(event => setTodo({ ...todo, date: event.target.value }))} />

            <button onClick={addTodo}>Add</button>
            <button onClick={handleDelete}>Delete</button>

            <div
                className="ag-theme-quartz"
                style={{ height: 500, width: 900 }}>
                <AgGridReact
                    rowData={todos}
                    columnDefs={colDefs} />
            </div>
        </>
    );
}

export default TodoList;