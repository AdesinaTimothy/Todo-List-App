import { useEffect, useState } from "react"
import TodoComponents from "./TodoComponent.jsx"

export default function TodoForm () {

    const [todo, setTodo] = useState(" ")
    const [enteredTodos, setEnteredTodos] = useState([])
    const [initialLoad, setInitialLoad] = useState(true)
    const [editIndicator, setEditIndicator] = useState(null)

    //Fetching data from the database: Get and load data from the 
    // data storage

    useEffect (() => {
        const storedTodos = localStorage.getItem("ReactTodos")
        if (storedTodos) {
            setEnteredTodos(JSON.parse(storedTodos))

            setInitialLoad(false)
        }
    }, [])


    //Saved to local storage
    useEffect(() => {
        if (!initialLoad) {
            localStorage.setItem("ReactTodos", JSON.stringify(enteredTodos))
        }
    }, [enteredTodos])

    const submissionManager = (e) => {
        e.preventDefault()
        if (editIndicator !== null) {
            const allTodos = [...enteredTodos]
            allTodos[editIndicator] = todo 
            setEnteredTodos(allTodos)
            setEditIndicator(null)
        } else {
            setEnteredTodos([...enteredTodos, todo])
        }


        setTodo("")
    }
   

    //Edit todo function 
    const editTodo = (index) => {
        setTodo(enteredTodos[index])
        setEditIndicator(index)
        // console.log(editIndicator)
    }

    const deleteTodo = (index) => {
        const filteredTodos = enteredTodos.filter((_, ind) => 
           ind !== index
        )
        setEnteredTodos(filteredTodos)
    }

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

            {/* //Render data from the UI */}

            {enteredTodos.map((todoItem, index) => (
                <div key = {index} style = {{display: "flex", justifyContent
                    :"space-between"
                }}>
                <TodoComponents 
                todoItem = {todoItem}
                />

                <button onClick={(e) => editTodo(index)}>Edit</button>
                <button onClick={(e) => deleteTodo(index)}>Delete</button>
                </div>
            ))}
        </div>
    )
}