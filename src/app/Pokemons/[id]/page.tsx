"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import StatsBarChart from "@/app/Components/StatsBarChart";

// สร้าง Interface สำหรับข้อมูล Pokémon
interface PokeStats {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface PokeAbility {
    ability: {
        name: string;
    };
}

interface PokeType {
    type: {
        name: string;
    };
}

interface PokeData {
    name: string;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: PokeType[];
    abilities: PokeAbility[];
    stats: PokeStats[];
}

function Page() {
    const params = useParams();
    const [poke, setPoke] = useState<PokeData | null>(null); // ใช้ประเภท PokeData หรือ null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;
        setLoading(true);

        const fetchPokeDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
                setPoke(response.data); // รับข้อมูล Pokémon จาก API
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
            setLoading(false);
        };

        fetchPokeDetails();
    }, [params.id]);

    useEffect(() => {
        console.log("Updated Pokémon data:", poke);
    }, [poke]);

    return (
        <div className="container mx-auto p-10">
            <div className="grid grid-cols-5 grid-rows-4 gap-4">
                <div className="col-span-2 row-span-2">
                    <div className="shadow-lg p-8 rounded-lg text-center bg-white">
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin border-t-blue-400 rounded-full">
                                    <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin border-t-red-400 rounded-full"></div>
                                </div>
                            </div>
                        ) : poke && poke.sprites ? (
                            <>
                                <h2 className="text-2xl font-semibold capitalize text-blue-600">{poke.name}</h2>
                                <Image
                                    src={poke.sprites.other["official-artwork"].front_default}
                                    width={200}
                                    height={200}
                                    alt={poke.name}
                                    className="mx-auto mt-4"
                                />
                            </>
                        ) : (
                            <p className="text-gray-500">ไม่พบข้อมูล Pokémon</p>
                        )}
                    </div>
                </div>
                <div className="col-span-2 col-start-1 row-start-3">
                    <div className="shadow-lg p-8 rounded-lg text-center bg-white">
                        <h2 className="text-2xl font-semibold text-blue-600">Types</h2>
                        {loading ? (
                            <p className="text-gray-500">Loading types...</p>
                        ) : poke && poke.types ? (
                            <ul className="mt-4 space-y-2">
                                {poke.types.map((type) => (
                                    <li key={type.type.name} className="capitalize text-gray-700">
                                        {type.type.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No types found</p>
                        )}
                    </div>
                </div>
                <div className="col-span-2 col-start-1 row-start-4">
                    <div className="shadow-lg p-8 rounded-lg text-center bg-white">
                        <h2 className="text-2xl font-semibold text-blue-600">Abilities</h2>
                        {loading ? (
                            <p className="text-gray-500">Loading abilities...</p>
                        ) : poke && poke.abilities ? (
                            <ul className="mt-4 space-y-2">
                                {poke.abilities.map((ability) => (
                                    <li key={ability.ability.name} className="capitalize text-gray-700">
                                        {ability.ability.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No abilities found</p>
                        )}
                    </div>
                </div>
                <div className="col-span-3 row-span-4 col-start-3 row-start-1">
                    <div className="shadow-lg p-8 rounded-lg text-center bg-white w-full h-full">
                        {poke && poke.stats ? (
                            <div style={{ width: "100%", height: "100%" }}>
                                <StatsBarChart stats={poke.stats} />
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading stats...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
