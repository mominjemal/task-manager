
import { useState } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  )

  const [showRegister, setShowRegister] = useState(false)
  const [registrationMessage, setRegistrationMessage] = useState("")

  function handleLogout() {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setShowRegister(false)
  }

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />
  }

  if (showRegister) {
    return (
      <Register
        onRegister={() => setIsLoggedIn(true)}
        onSwitchToLogin={() => setShowRegister(false)}
        onRegistrationSuccess={() => {
          setRegistrationMessage(
            "Account created successfully! Please log in."
          )
          setShowRegister(false)
        }}
      />
    )
  }

  return (
    <Login
      onLogin={() => setIsLoggedIn(true)}
      onSwitchToRegister={() => setShowRegister(true)}
      registrationMessage={registrationMessage}
    />
  )
}

export default App
