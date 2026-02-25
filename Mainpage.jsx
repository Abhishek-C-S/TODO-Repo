import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Mainpage() {

    const [todo, settodo] = useState({
        title: "",
        description: "",
        Status: "pending"
    })

    const [todos, settodos] = useState([])
    const [page, setpage] = useState(1)
    const [totalpages, settotalpages] = useState(1)
    const [loading, setloading] = useState(false)
    const [editbyID, seteditbyID] = useState(null)

    const handlechange = (e) => {
        settodo({ ...todo, [e.target.name]: e.target.value })
    }

    const fetchtodos = () => {
        setloading(true)

        axios.get("http://localhost:5000/api/todo/get?page=" + page)
            .then((res) => {
                settodos(res.data.todos)
                settotalpages(res.data.totalpages)
                setloading(false)
            })
            .catch((err) => {
                console.log(err)
                setloading(false)
            })
    }

    useEffect(() => {
        fetchtodos()
    }, [page])

    const handlesubmit = (e) => {
        e.preventDefault()

        if (editbyID) {
            axios.put("http://localhost:5000/api/todo/update/" + editbyID, todo)
                .then(() => {
                    alert("Todo updated successfully")
                    settodo({ title: "", description: "", Status: "pending" })
                    seteditbyID(null)
                    fetchtodos()
                })
                .catch((err) => {
                    console.log(err)
                })


            axios.post("http://localhost:5000/api/todo/post", todo)
                .then(() => {
                    alert("Todo created successfully")
                    settodo({ title: "", description: "", Status: "pending" })
                    fetchtodos()
                })
                .catch((err) => {
                    console.log(err)
                    alert("Something went wrong")
                })
        }
        const handledelete = (id) => {
            axios.delete("http://localhost:5000/api/todo/delete/" + id)
                .then(() => {
                    alert("Todo deleted successfully")
                    fetchtodos()
                })
                .catch((err) => {
                    console.log(err);

                })
        }

    }


    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to the To-Do List App!</h1>

            <form onSubmit={handlesubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={todo.title}
                    onChange={handlechange}
                    required
                />

                <input
                    name="description"
                    placeholder="Description"
                    value={todo.description}
                    onChange={handlechange}
                />

                <button type="submit">Submit</button>
            </form>

            <hr />

            {loading && <p>Loading...</p>}

            {todos.map((item) => (
                <div key={item._id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <select value={item.Status}
                        onChange={(e) => handleupdate(item._id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>

                    </select>
                    <hr />
                    <button onClick={() => handledelete(item._id)}>
                        Delete
                    </button>
                    <button onClick={() => {
                        settodo({
                            title: item.title,
                            description: item.description,
                            Status: item.Status
                        })
                        seteditbyID(item._id)
                    }}>
                        Edit
                    </button>
                </div>
            ))}

            <button
                disabled={page === 1}
                onClick={() => setpage(page - 1)}
            >
                Prev
            </button>

            <span> Page {page} of {totalpages} </span>

            <button
                disabled={page === totalpages}
                onClick={() => setpage(page + 1)}
            >
                Nextr
            </button>


        </div>
    )
}

export default Mainpage