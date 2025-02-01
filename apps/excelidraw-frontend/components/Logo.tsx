import { PencilRuler } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 15,
        left: "8%",
        transform: "translateX(-50%)",
      }}
    >
      <Link href={"/"} className=" flex items-center gap-2">
        <PencilRuler color="white" size={30} />
        <span className="text-blue-500 font-bold text-xl">100xdraw</span>
      </Link>
    </div>
  );
};

export default Logo;
