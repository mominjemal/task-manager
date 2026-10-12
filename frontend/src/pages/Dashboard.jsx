import { useState, useEffect } from "react"
function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("MEDIUM")

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token")

      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to load tasks")
        }

        const data = await response.json()

        console.log("Tasks API response:", JSON.stringify(data, null, 2))
        setTasks(data.tasks)
      } catch (error) {
        console.error("Error loading tasks:", error)
      }
    }

    fetchTasks()
  }, [])


  async function handleAddTask(e) {
    e.preventDefault()

    const token = localStorage.getItem("token")

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          priority,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Failed to create task")
        return
      }

      setTasks((currentTasks) => [data.task || data, ...currentTasks])
      setTitle("")
      setDescription("")
      setPriority("MEDIUM")
    } catch (error) {
      console.error("Error creating task:", error)
      alert("Could not connect to the server")
    }
  }

  async function handleToggleTask(task) {
    const token = localStorage.getItem("token")

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Failed to update task")
        return
      }

      const updatedTask = data.task || data

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === task.id ? updatedTask : item
        )
      )
    } catch (error) {
      console.error("Error updating task:", error)
      alert("Could not connect to the server")
    }
  }

  async function handleDeleteTask(taskId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    )

    if (!confirmed) return

    const token = localStorage.getItem("token")

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Failed to delete task")
        return
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      )
    } catch (error) {
      console.error("Error deleting task:", error)
      alert("Could not connect to the server")
    }
  }


  return (
    <div>
      <h1>Task Manager</h1>
      <p>Welcome to your dashboard!</p>


      <div>


        <h2>Add a New Task</h2>

        <form onSubmit={handleAddTask}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <button type="submit">Add Task</button>
        </form>

        <h2>My Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet. Add your first task soon!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.completed ? "Completed" : "Pending"}</p>
              <button onClick={() => handleToggleTask(task)}>
                {task.completed ? "Mark Pending" : "Mark Complete"}
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard