import React, { useState } from 'react'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import { registerUser } from '../api/user.api.js'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice.js'
import { useNavigate } from 'react-router-dom'

const Signup = ({ onSwitch }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const validateForm = () => {
    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password
    }

    const errs = {}

    if (!trimmed.name) errs.name = 'Name is required'
    else if (trimmed.name.length < 4) errs.name = 'Name is too short'

    if (!trimmed.email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) errs.email = 'Please enter a valid email'

    if (!trimmed.password) errs.password = 'Password is required'
    else if (trimmed.password.length < 6) errs.password = 'Password must be at least 6 characters'

    return { trimmed, errs }
  }

  const handleSubmit = async () => {
    const { trimmed, errs } = validateForm()

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    try {
      setLoading(true)
      const res = await registerUser(trimmed.name, trimmed.email, trimmed.password)
      dispatch(setUser(res.data.data))
      navigate("/shorten")
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join us and start your journey</p>
          </div>

          {apiError && <p className="text-red-400 text-center mb-4">{apiError}</p>}

          <div className="space-y-4">
            <InputField
              id="name"
              label="Full Name"
              icon={<User />}
              value={formData.name}
              error={errors.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <InputField
              id="email"
              label="Email Address"
              icon={<Mail />}
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
            />

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-zinc-700 border border-gray-600 rounded-lg px-10 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-[#1eb9a4] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={onSwitch}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputField = ({ id, label, icon, value, onChange, placeholder, error, type = 'text' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">{icon}</span>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full bg-zinc-700 border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
)

export default Signup
