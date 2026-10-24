
import { useState } from "react"
import "./Register.css"
import { apiRequest } from "../api"

function Register({
    onRegister,
    onSwitchToLogin,
    onRegistrationSuccess,
}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        try {
            const data = await apiRequest("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            })

            // If the backend returns a token, log the user in.
            if (data.token) {
                localStorage.setItem("token", data.token)
                onRegister()
            } else {
                onRegistrationSuccess()
            }
        } catch (error) {
            setMessage(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-page">
            <div className="register-card">
                <h1>Create Account</h1>
                <p className="register-subtitle">
                    Sign up to start managing your tasks
                </p>

                {message && <p className="register-error">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="register-field">
                        <label htmlFor="register-name">Full name</label>
                        <input
                            id="register-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="register-email">Email</label>
                        <input
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="register-password">Password</label>

                        <div className="register-password-row">
                            <input
                                id="register-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                minLength={6}
                                required
                            />

                            <button
                                type="button"
                                className="register-password-toggle"
                                onClick={() => setShowPassword((current) => !current)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="register-submit"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p className="register-footer">
                    Already have an account?{" "}
                    <button type="button" onClick={onSwitchToLogin}>
                        Login
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Register
