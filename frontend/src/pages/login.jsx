import { useState } from "react"
import "./Login.css"
function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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
      onLogin()
    } catch (error) {
      setMessage("Could not connect to the server.")
    }
  }
  return (


    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">
          Sign in to manage your tasks
        </p>

        {message && <p className="login-error">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>

            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>
      </div>
    </div>

  )
}

export default Login