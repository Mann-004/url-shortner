import React, { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/LoginForm'

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false)
  const toggleForm = () => setShowSignup(prev => !prev)

  return (
    <>
      {showSignup ? <Signup onSwitch={toggleForm} /> : <Login onSwitch={toggleForm} />}
    </>
  )
}

export default AuthPage
