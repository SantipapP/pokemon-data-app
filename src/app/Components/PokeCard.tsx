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

    return (
        <>
            <div className='container text-center mx-auto'>
                {loading ? (
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div
                            className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                        >
                            <div
                                className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-6'>
                        {poke.map((val, index) => (
                            <div key={val.name} className="m-2 w-60 h-80 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 hover:scale-105 transition-transform duration-300 transition-shadow">
                                <div className="w-52 h-40 rounded-2xl flex justify-center items-center">
                                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} width={125} height={125} style={{ width: "auto", height: "auto" }} alt={val.name} priority />
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <p className="font-extrabold capitalize">{val.name}</p>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <Link href={`/Pokemons/${index + 1}`}>
                                        <button className="cursor-pointer bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">See more</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default PokeCard
