import React, { useEffect, useState } from "react"
import { profileOfUser } from "../api/user.api"

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileOfUser()
        setUser(res.data)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return <p>Loading profile...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="flex flex-col items-center ">
      <img
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-white shadow-md mb-4"
      />
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

export default Profile
