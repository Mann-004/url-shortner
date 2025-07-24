import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Moon, Sun, CircleUserRound } from 'lucide-react'

import { logoutUser } from '../api/user.api'

const Navbar = ({onProfileClick}) => {
    const [darkMode, setDarkMode] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        const root = window.document.documentElement
        // console.log(root)
        if (darkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode(prev => !prev)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            setDarkMode(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    useEffect(() => {
        const root = window.document.documentElement
        if (darkMode) {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    const handleLogout = () => {
        logoutUser()
        navigate("/")
    }


    return (
        <nav className="bg-white dark:bg-zinc-800 rounded-md shadow-md px-6 py-4 flex justify-between items-center w-full fixed left-0 top-0 z-50">
            <Link to="/shorten" className="text-xl font-bold text-[#1eb9a4] dark:text-blue-500 ">
                Url shorten
            </Link>
            <ul className="flex items-center space-x-6">
                {['logout', 'profile'].map((item, index) => (
                    <li key={index}>
                        {item === 'logout' ? (
                            <button
                                onClick={handleLogout}
                                className="text-black dark:text-white capitalize hover:underline"
                            >
                                {item}
                            </button>
                            
                        ) : (
                            <NavLink
                            className={`text-black dark:text-white`}>
                                <CircleUserRound  onClick={onProfileClick} />  
                            </NavLink>
                        )}
                    </li>
                ))}



                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </ul>
        </nav>
    )
}

export default Navbar
