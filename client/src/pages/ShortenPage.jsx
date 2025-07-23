import React, { useEffect, useState } from 'react'
import ShortenUrlForm from '../components/ShortUrlForm'
import AllUrls from '../components/AllUrls'
import { getAllUrls } from '../api/user.api'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import useTitle from '../components/useTitle'


const ShortenPage = () => {
  useTitle("Home | Url shorten")

  const [userUrls, setUserUrls] = useState([])
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

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
       <Navbar/>
      <div className="max-w-6xl">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border dark:border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white ">URL Shortener</h2>
          <ShortenUrlForm onSuccess={fetchUrls} />
        </div>
      </div>
      <AllUrls urls={userUrls} setUrls={setUserUrls} />
    </>
  )
}

export default ShortenPage
