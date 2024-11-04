import {useEffect, useState } from "react"

export default function TodoForm () {

    const [todo, setTodo] = useState(" ")
    const [enteredTodos, setenteredTodos] = useState([])

    useEffect(() => {
        localStorage.setItem("ReactTodos", JSON.stringify(enteredTodos))
    } , [enteredTodos])

    const submissionManager = (e) => {
        e.preventDefault()
        setenteredTodos([...enteredTodos, todo])
        setTodo("")
    }
   

    console.log(enteredTodos)

    return (
        <div className="form-container">
            <form action="" className="form" onSubmit={submissionManager}>
                <div className="input-group">
                    <label htmlFor="todoItem">Enter a Todo</label>
                    <input 
                    type="text"
                    name="todo"
                    id="todoItem"
                    className="input"
                    value={todo || " "}
                    onChange={(e) => setTodo(e.target.value)}
                    />
                </div>

                <div className="button-container">
                    <button type="submit">Add Todo</button>
                </div>
            </form>
        </div>
    )
}