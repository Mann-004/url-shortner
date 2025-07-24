import React, { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/LoginForm'
import useTitle from '../components/useTitle'

const AuthPage = () => {
  useTitle("url shorten")
  const [showSignup, setShowSignup] = useState(false)
  const toggleForm = () => setShowSignup(prev => !prev)
  const [login, setLogin] = useState(false)
  return (
    <>
      {showSignup ? <Signup onSwitch={toggleForm} state={setLogin} /> : <Login onSwitch={toggleForm} state={setLogin} />}
    </>
  )
}

export default AuthPage
