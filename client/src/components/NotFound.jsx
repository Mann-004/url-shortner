import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const NotFound = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col justify-center items-center text-center dark:bg-zinc-900 dark:text-white bg-white text-black px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page not found.</p>
      <Link to="/shorten" className="text-blue-500 underline hover:text-blue-700">Go back home</Link>
    </div>
    </>
  )
}

export default NotFound
