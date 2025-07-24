import React, { useEffect, useState } from 'react'
import ShortenUrlForm from '../components/ShortUrlForm'
import AllUrls from '../components/AllUrls'
import { getAllUrls } from '../api/user.api'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import useTitle from '../components/useTitle'
import Profile from '../components/Profile'
import { useNavigate } from 'react-router-dom'


const ShortenPage = () => {
  useTitle("Home | Url shorten")
  const navigate = useNavigate()

  const [userUrls, setUserUrls] = useState([])
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  

  useEffect(() => {
    // console.log(isAuthenticated)
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  const fetchUrls = async () => {
    try {
      const res = await getAllUrls()
      setUserUrls(res?.data || [])
    } catch (err) {
      console.error('Failed to fetch URLs:', err)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <>
      <Navbar onProfileClick={() => setIsProfileOpen((prev) => !prev)} />
      <div className="max-w-6xl">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border dark:border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white ">URL Shortener</h2>
          <ShortenUrlForm onSuccess={fetchUrls} />
        </div>
      </div>
      <AllUrls urls={userUrls} setUrls={setUserUrls} />

      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black/60 backdrop-blur-sm text-black dark:text-gray-400">
          <div className="relative dark:bg-black/80 p-6 rounded-2xl border bg-white dark:border-white/20 w-full max-w-md mx-auto">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="absolute top-2 right-3 text-2xl font-bold"
            >
              &times;
            </button>

            <Profile />
          </div>
        </div>
      )}
    </>
  )
}

export default ShortenPage
