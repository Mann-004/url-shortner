import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])



  return (
    <div className="min-h-screen bg-[#f1f1f1] dark:bg-zinc-900 text-zinc-900 dark:text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage
