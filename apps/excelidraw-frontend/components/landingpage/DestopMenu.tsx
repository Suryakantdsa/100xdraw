import Link from "next/link";
import React from "react";

const DestopMenu = () => {
  return (
    <div className="hidden md:flex justify-between gap-x-16 text-white font-bold capitalize text-lg font-mono  ">
      <Link href={"#feature"} className="hover:text-blue-500 ">
        Features
      </Link>
      <Link href={"#feature"} className="hover:text-blue-500 ">
        How it work
      </Link>
      <Link href={"#feature"} className="hover:text-blue-500 ">
        Pricing
      </Link>
      <Link href={"#feature"} className="hover:text-blue-500 ">
        Canvas
      </Link>
    </div>
  );
};

export default DestopMenu;
