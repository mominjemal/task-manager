
import { useState } from "react"
import "./Login.css"
import { apiRequest } from "../api"

function Login({
  onLogin,
  onSwitchToRegister,
  registrationMessage,
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage("Logging in...")

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      localStorage.setItem("token", data.token)
      onLogin()
    } catch (error) {
      setMessage(error.message || "Could not connect to the server.")
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">
          Sign in to manage your tasks
        </p>

        {registrationMessage && (
          <p className="login-success">{registrationMessage}</p>
        )}

        {message && <p>{message}</p>}

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

        <p className="login-footer">
          Don't have an account?{" "}
          <button type="button" onClick={onSwitchToRegister}>
            Create account
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
