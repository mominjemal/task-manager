import { useState } from "react"
function Login() {
  const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [message, setMessage] = useState("")


async function handleSubmit(e) {
  e.preventDefault()
  setMessage("Logging in...")

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      setMessage(data.message || "Login failed")
      return
    }

    localStorage.setItem("token", data.token)
    setMessage("Login successful!")
  } catch (error) {
    setMessage("Could not connect to the server.")
  }
}
  return (
    
    <div>
      <h1>Login</h1>
      <p>{message}</p>

<form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />      
          
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />       
         </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login