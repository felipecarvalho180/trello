"use client";

import React, { FC } from "react";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import logo from "~/assets/logo.svg";
import Avatar from "react-avatar";
import { useBoardStore } from "~/store";

type Props = {};

const Header: FC<Props> = () => {
  const { searchString, setSearchString } = useBoardStore();

  return (
    <header className="mb-16">
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-blue-600 rounded-md filter blur-3xl opacity-50 -z-50"></div>

        <Image
          src={logo}
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-24 md:w-36 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              className="flex-1 outline-none p-2"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button hidden>Submit</button>
          </form>

          <Avatar name="Felipe Carvalho" round size="50" color="#2563eb" />
        </div>
      </div>
    </header>
  );
};

export default Header;
