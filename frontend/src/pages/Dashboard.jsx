import { useState, useEffect } from "react"
import "./Dashboard.css"
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
    <div className="dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>My Task Manager</h1>
            <p>Organize your work and get things done.</p>
          </div>
        </header>

        <section className="task-summary">
          <div className="summary-card">
            <p>Total Tasks</p>
            <h2>{tasks.length}</h2>
          </div>

          <div className="summary-card">
            <p>Completed</p>
            <h2>{tasks.filter((task) => task.completed).length}</h2>
          </div>

          <div className="summary-card">
            <p>Pending</p>
            <h2>{tasks.filter((task) => !task.completed).length}</h2>
          </div>
        </section>

        <section className="task-form">
          <h2>Add a New Task</h2>

          <form onSubmit={handleAddTask}>
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />

            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />

            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <button type="submit">+ Add Task</button>
          </form>
        </section>

        <section className="task-list">
          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <p>No tasks yet. Add your first task above!</p>
          ) : (
            tasks.map((task) => (
              <article className="task-card" key={task.id}>
                <div>
                  <h3>{task.title}</h3>

                  {task.description && <p>{task.description}</p>}

                  <p>
                    Priority:{" "}
                    <span className={`priority priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </p>

                  <p className={task.completed ? "completed" : "pending"}>
                    Status: {task.completed ? "Completed" : "Pending"}
                  </p>
                </div>

                <div className="task-actions">
                  <button onClick={() => handleToggleTask(task)}>
                    {task.completed ? "Mark Pending" : "Mark Complete"}
                  </button>

                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  )

}

export default Dashboard