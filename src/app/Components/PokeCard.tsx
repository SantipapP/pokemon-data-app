"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Pokemon {
    name: string;
    url: string;
}

function PokeCard() {
    const [poke, setPoke] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        const fetchPokeData = async () => {
            try {
                const PokeResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
                setPoke(PokeResponse['data']['results'])
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }

        fetchPokeData();

    }, [])

    const filteredPoke = poke.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="container mx-auto text-center p-4">
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search Pokémon..."
                        className="w-full md:w-1/2 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {filteredPoke.map((val, index) => (
                            <div
                                key={val.name}
                                className="m-2 w-full max-w-xs bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-center justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 hover:scale-105 transition-transform duration-300 transition-shadow"
                            >
                                <div className="w-52 h-40 rounded-2xl flex justify-center items-center">
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                                        width={125}
                                        height={125}
                                        className="object-contain"
                                        alt={val.name}
                                        priority
                                    />
                                </div>
                                <p className="font-extrabold capitalize">{val.name}</p>
                                <Link href={`/Pokemons/${index + 1}`}>
                                    <button className="cursor-pointer bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">See more</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    )
}

export default PokeCard
