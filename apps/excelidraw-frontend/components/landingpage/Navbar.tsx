"use client";
import React from "react";
import Logo from "./Logo";
import DestopMenu from "./DestopMenu";
import MobileMenu from "./MobileMenu";
import NavmenuItem from "./NavmenuItem";
import menuItemStore from "@/lib/store/NavMenuItemStore";

const Navbar = () => {
  const { isMenuBarCLicked } = menuItemStore();
  return (
    <nav
      className={`w-full px-4 sm:px-12 py-4 flex justify-between items-center shadow-blue-500 shadow-sm 
            overflow-hidden
      `}
    >
      <Logo />
      <DestopMenu />
      <MobileMenu />
      {isMenuBarCLicked && <NavmenuItem />}
    </nav>
  );
};

export default Navbar;
