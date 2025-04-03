"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link'
import { FaChevronDown } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
interface PokeDex {
    name: string;
    url: string;
}

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownPokeDex, setDropdownPokeDex] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [PokeDex, setPokeDex] = useState<PokeDex[]>([]);

    useEffect(() => {
        const FetchPokeDex = async () => {
            try {
                const PokeDexResponse = await axios.get(`https://pokeapi.co/api/v2/pokedex/?limit=1000`)
                setPokeDex(PokeDexResponse.data.results)
            } catch (error) {
                console.log(error)
            }
        }

        FetchPokeDex();
    }, [])

    return (
        <>
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        MyBrand
                    </Link>

                    {/* Hamburger Menu (Mobile) */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
                        {isOpen ? <CiMenuBurger size={28} /> : <CiMenuBurger size={28} />}
                    </button>

                    {/* Menu Items */}
                    <div
                        className={`lg:flex flex-col lg:flex-row absolute lg:static top-14 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all ${isOpen ? "block" : "hidden"
                            }`}
                    >
                        <Link href="/" className="px-4 py-2 block lg:inline-block hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/about" className="px-4 py-2 block lg:inline-block hover:text-blue-600">
                            About
                        </Link>

                        {/* First Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownPokeDex(!dropdownPokeDex)}
                                className="px-4 py-2 flex items-center w-full lg:w-auto hover:text-blue-600"
                            >
                                PokeDex <FaChevronDown size={18} className="ml-1" />
                            </button>
                            <div
                                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 transition-all ${dropdownPokeDex ? "block" : "hidden"
                                    }`}
                            >
                                <Link href="/web-dev" className="block px-4 py-2 hover:bg-gray-100">
                                    Web Development
                                </Link>
                                <Link href="/seo" className="block px-4 py-2 hover:bg-gray-100">
                                    SEO
                                </Link>
                            </div>
                        </div>

                        {/* Second Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen2(!dropdownOpen2)}
                                className="px-4 py-2 flex items-center w-full lg:w-auto hover:text-blue-600"
                            >
                                Projects <FaChevronDown size={18} className="ml-1" />
                            </button>
                            <div
                                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 transition-all ${dropdownOpen2 ? "block" : "hidden"
                                    }`}
                            >
                                <Link href="/project1" className="block px-4 py-2 hover:bg-gray-100">
                                    Project 1
                                </Link>
                                <Link href="/project2" className="block px-4 py-2 hover:bg-gray-100">
                                    Project 2
                                </Link>
                            </div>
                        </div>

                        <Link href="/contact" className="px-4 py-2 block lg:inline-block hover:text-blue-600">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
