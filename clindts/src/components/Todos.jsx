import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiEdit } from "react-icons/ti";

const api_base = 'http://localhost:3001';

function Todos() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        GetTodos();
    }, []);

    const GetTodos = () => {
        fetch(api_base + '/todo')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch((err) => console.error("Error: ", err));
    }

    const completeTodo = async (id) => {
        const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }
            return todo;
        }));
    }

    const addTodo = async () => {
        const data = await fetch(api_base + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo
            })
        }).then(res => res.json());

        setTodos([...todos, data]);

        setPopupActive(false);
        setNewTodo("");
    }

    const updateTodo = async (id, newText) => {
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });

        setTodos(updatedTodos);

        await fetch(api_base + "/todo/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newText
            })
        });
    }

    const deleteTodo = async (id) => {
        await fetch(api_base + '/todo/delete/' + id, { method: 'DELETE' });

        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    };

    return (
        <div className="App">
            <div className='flex justify-between items-center'>
                <h1>Welcome, </h1>
                <h1 onClick={() => { navigate("/profile") }}>
                    <svg className='h-20 w-20' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </h1>
            </div>
            <h4>Your Notes</h4>

            <div className="todos">
                {todos.length > 0 ? todos.map(todo => (
                    <div
                        className={"todo" + (todo.complete ? " is-complete" : "")}
                        key={todo._id}
                        onClick={() => completeTodo(todo._id)}
                    >
                        <div className="checkbox"></div>
                        <div className="text">{todo.text}</div>
                        <div className="edit-todo mr-10" onClick={() => {
                            const newText = prompt("Enter new text for the note", todo.text);
                            if (newText) {
                                updateTodo(todo._id, newText);
                            }
                        }}><span className='mr-10'>

                                <TiEdit />

                            </span></div>
                        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
                    </div>
                )) : (
                    <p>You currently have no note</p>
                )}
            </div>

            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

            {popupActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input type="text" className="add-todo-input text-black" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                        <div className="button" onClick={addTodo}>Create Task</div>
                    </div>
                </div>
            ) : ''}
        </div>
    );
}

export default Todos;
