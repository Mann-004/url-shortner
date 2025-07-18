import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { login } from '../store/userSlice'
import axiosInstance from '../utils/axiosInstance'

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/api/user/me') 
        dispatch(login(res.data.data)) 
      } catch (err) {
        console.log('User not authenticated')
      } finally {
        setLoading(false)
      }
    }

    if (!auth.isAuthenticated) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [auth.isAuthenticated, dispatch])

  if (loading) return <div className="text-white">Loading...</div>

  return auth.isAuthenticated ? children : <Navigate to="/" />
}
export default ProtectedRoute
