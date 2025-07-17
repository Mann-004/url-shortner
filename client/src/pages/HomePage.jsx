import React from 'react'
import { Outlet } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage
