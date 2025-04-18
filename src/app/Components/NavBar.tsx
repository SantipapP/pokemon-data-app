"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

interface PokeDex {
  name: string;
  url: string;
}

interface ItemCatagory {
  name: string;
  url: string;
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPokeDex, setDropdownPokeDex] = useState(false);
  const [dropdownItem, setDropdownItem] = useState(false);
  const [PokeDex, setPokeDex] = useState<PokeDex[]>([]);
  const [ItemCatagory, setItemCatagory] = useState<ItemCatagory[]>([]);

  useEffect(() => {
    const FetchPokeDex = async () => {
      try {
        const PokeDexResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokedex/?limit=1000`
        );
        setPokeDex(PokeDexResponse.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    const FetchItemCatagory = async () => {
      try {
        const ItemCatagoryResponse = await axios.get(
          `https://pokeapi.co/api/v2/item-category/?limit=1000`
        );
        setItemCatagory(ItemCatagoryResponse.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    FetchItemCatagory();

    FetchPokeDex();
  }, []);

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
            className={`lg:flex flex-col lg:flex-row absolute lg:static top-14 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link
              href="/"
              className="px-4 py-2 block lg:inline-block hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="/Pokemons"
              className="px-4 py-2 block lg:inline-block hover:text-blue-600"
            >
              Pokemons
            </Link>

            <div className="relative">
              <button
                onClick={() => setDropdownPokeDex(!dropdownPokeDex)}
                className="px-4 py-2 flex items-center w-full lg:w-auto hover:text-blue-600"
              >
                PokeDex <FaChevronDown size={18} className="ml-1" />
              </button>
              <div
                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 transition-all ${
                  dropdownPokeDex ? "block" : "hidden"
                } max-h-60 overflow-y-auto`}
              >
                {PokeDex.map((pokedex) => (
                  <Link
                    key={pokedex.name}
                    href={`/Pokedexs/${pokedex.name}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {pokedex.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownItem(!dropdownItem)}
                className="px-4 py-2 flex items-center w-full lg:w-auto hover:text-blue-600"
              >
                Items <FaChevronDown size={18} className="ml-1" />
              </button>
              <div
                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 transition-all ${
                  dropdownItem ? "block" : "hidden"
                } max-h-60 overflow-y-auto`}
              >
                {ItemCatagory.map((item) => (
                  <Link
                    key={item.name}
                    href={`/Items/${item.name}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="px-4 py-2 block lg:inline-block hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
