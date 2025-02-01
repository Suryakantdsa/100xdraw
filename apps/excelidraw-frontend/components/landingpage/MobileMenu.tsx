"use client";
import menuItemStore from "@/lib/store/NavMenuItemStore";
import { Menu } from "lucide-react";
import React from "react";

const MobileMenu = () => {
  const { setMenuClicked } = menuItemStore();
  return (
    <div className="md:hidden">
      <button onClick={() => setMenuClicked()}>
        <Menu color="white" size={30} />
      </button>
    </div>
  );
};

export default MobileMenu;
