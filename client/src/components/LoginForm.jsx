import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { loginUser } from '../api/user.api.js'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ onSwitch, state }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = useSelector((state) => state.auth)
  // console.log(auth)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    return newErrors
  }

  const handleLogin = async () => {
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setApiError('')
    try {
      const response = await loginUser(formData.email, formData.password)
      // console.log(response)
      dispatch(login(response.data))
      // console.log("Redux user after login:", response.data)
      navigate("/shorten")
      // console.log('User logged in:', response.data)
    } catch (error) {
      console.error('Full error:', error)
      const backendMessage = error?.response?.data?.message
      setApiError(backendMessage || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }




  return (
    <div className="min-h-screen bg-[#f1f1f1] dark:bg-zinc-900 flex items-center justify-center p-4 text-black dark:text-gray-400">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold dark:text-white text-[#1f1f1f] mb-2">Login</h2>
            <p className="text-zinc-700 dark:text-zinc-400">Welcome back, log in to continue</p>
          </div>

          {apiError && <p className="text-red-400 text-center mb-4">{apiError}</p>}

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium dark:text-white text-[#1f1f1f] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-[#1f1f1f] h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                   className="w-full dark:bg-zinc-700 border border-gray-600 rounded-lg px-10 py-3 pr-12 text-black dark:text-gray-400 placeholder-gray-400 "
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium dark:text-white text-[#1f1f1f] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform dark:text-gray-400 text-[#1f1f1f] -translate-y-1/2 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full dark:bg-zinc-700 border border-gray-600 rounded-lg px-10 py-3 pr-12 text-black dark:text-gray-400 placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-[#1f1f1f]"
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className={`w-full bg-[#1eb9a4] dark:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2focus:ring-offset-2 focus:ring-offset-gray-800 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="dark:text-gray-400 text-zinc-700">
              Don't have an account?{' '}
              <button
                onClick={onSwitch}
                className="text-[#1eb9a4] dark:text-blue-500 font-medium transition-colors duration-200 hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
