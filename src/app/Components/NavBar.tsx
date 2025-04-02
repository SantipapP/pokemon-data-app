"use client";
import React, { useState } from 'react'
import Link from 'next/link'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav>
            <ul className='flex items-center justify-between p-4 bg-gray-500 text-white font-semibold space-x-6 md:space-x-12'>
                {/* เมนูขนาดเล็ก */}
                <div className='flex md:hidden'>
                    <button onClick={toggleMenu} className='text-white'>
                        {isOpen ? 'Close' : 'Menu'}
                    </button>
                </div>

                {/* เมนูปกติ */}
                <div className={`flex space-x-6 ${isOpen ? 'block' : 'hidden'} md:flex`}>
                    <Link href="/" className='hover:text-gray-600 transition duration-300'>
                        <li>Home</li>
                    </Link>
                    <Link href="/Pokemons" className='hover:text-gray-600 transition duration-300'>
                        <li>Pokemons</li>
                    </Link>

                    {/* Dropdown สำหรับ Items */}
                    <li 
                        className='relative' 
                        onMouseEnter={toggleDropdown} 
                        onMouseLeave={toggleDropdown}
                    >
                        <span className='cursor-pointer'>Items</span>
                        {dropdownOpen && (
                            <ul className='absolute left-0 mt-2 bg-gray-600 text-white p-2 rounded-md shadow-lg'>
                                <li className='px-4 py-2 hover:bg-gray-700'>
                                    <Link href="/item1">Item 1</Link>
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-700'>
                                    <Link href="/item2">Item 2</Link>
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-700'>
                                    <Link href="/item3">Item 3</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </div>
            </ul>

            {/* เมนูในขนาดเล็ก (สำหรับ Hamburger Menu) */}
            {isOpen && (
                <div className='md:hidden bg-gray-600'>
                    <ul className='flex flex-col items-center space-y-4 py-4'>
                        <Link href="/" className='hover:text-gray-600 transition duration-300'>
                            <li>Home</li>
                        </Link>
                        <Link href="/Pokemons" className='hover:text-gray-600 transition duration-300'>
                            <li>Pokemons</li>
                        </Link>
                        <li 
                            className='relative' 
                            onClick={toggleDropdown}
                        >
                            <span className='cursor-pointer'>Items</span>
                            {dropdownOpen && (
                                <ul className='bg-gray-600 text-white p-2 rounded-md shadow-lg'>
                                    <li className='px-4 py-2 hover:bg-gray-700'>
                                        <Link href="/item1">Item 1</Link>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-700'>
                                        <Link href="/item2">Item 2</Link>
                                    </li>
                                    <li className='px-4 py-2 hover:bg-gray-700'>
                                        <Link href="/item3">Item 3</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default NavBar
