"use client";

import React, { FC } from "react";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import logo from "~/assets/logo.svg";
import Avatar from "react-avatar";

type Props = {};

const Header: FC<Props> = () => {
  return (
    <header>
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
            />
            <button hidden>Submit</button>
          </form>

          <Avatar name="Felipe Carvalho" round size="50" color="#2563eb" />
        </div>
      </div>

      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-blue-600 p-5">
          <UserCircleIcon className="inline-block h-10 w-10 text-blue-600 mr-1" />
          GTP is summarising your tasks for the day...
        </p>
      </div>
    </header>
  );
};

export default Header;
