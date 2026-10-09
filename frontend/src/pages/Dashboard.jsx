import { useState, useEffect } from "react"
function Dashboard() {
  const [tasks, setTasks] = useState([])
  
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
        setTasks(data.tasks) } catch (error) {console.error("Error loading tasks:", error)
      }
    }

    fetchTasks()
  }, [])
  return (
    <div>
      <h1>Task Manager</h1>
      <p>Welcome to your dashboard!</p>

      
  <div>
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
        </div>
      ))
    )}
  </div>
    </div>
  )
}

export default Dashboard