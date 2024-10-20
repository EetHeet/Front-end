import { AgGridReact, useGridFloatingFilter } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fi'
import MenuItem from '@mui/material/MenuItem';

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

    const handleDate = (date) => {
        let today = dayjs().startOf('day')
        let d = ""

        if (date < today) {
            d = "Past time"
        }
        else {
            d = date.format('DD.MM.YYYY')
        }

        setTodo({ ...todo, date: d })
    };

    return (
        <>
            <Stack
                mt={2}
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center">
                <TextField
                    value={todo.description}
                    name="description"
                    placeholder="Description"
                    onChange={(event => setTodo({ ...todo, description: event.target.value }))} />
                <TextField
                    value={todo.priority}
                    name="priority"
                    placeholder="Priority"
                    onChange={(event => setTodo({ ...todo, priority: event.target.value }))} />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
                    <DatePicker
                        onChange={date => handleDate(date)}
                    />
                </LocalizationProvider>

                <Button onClick={addTodo}>Add</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </Stack>
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