"use client";
import menuItemStore from "@/lib/store/NavMenuItemStore";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavmenuItem = () => {
  const { isMenuBarCLicked, setMenuClicked } = menuItemStore();
  return (
    <>
      <div
        className={` ${isMenuBarCLicked ? "flex" : "hidden"} h-screen w-1/2 absolute right-0 top-0 justify-start items-start flex-col gap-4  bg-slate-800 py-6 px-4 
      text-white overflow-hidden `}
      >
        <Link
          href={"#feature"}
          onClick={() => setMenuClicked()}
          className="hover:text-blue-500 text-xl "
        >
          Features
        </Link>
        <Link
          href={"#feature"}
          onClick={() => setMenuClicked()}
          className="hover:text-blue-500 text-xl "
        >
          How it work
        </Link>
        <Link
          href={"#feature"}
          onClick={() => setMenuClicked()}
          className="hover:text-blue-500 text-xl"
        >
          Pricing
        </Link>
        <Link
          href={"#feature"}
          onClick={() => setMenuClicked()}
          className="hover:text-blue-500 text-xl"
        >
          Canvas
        </Link>
        <div className="mt-[400px] flex w-full flex-col items-center justify-center gap-1">
          <p className="text-xs">verion 1.0.0</p>
          <p className=" text-center">Made with ❤ by Suryakant</p>
        </div>
      </div>
      <button className="relative top-0" onClick={() => setMenuClicked()}>
        <X color="white" fontWeight={800} size={30} />
      </button>
    </>
  );
};

export default NavmenuItem;
