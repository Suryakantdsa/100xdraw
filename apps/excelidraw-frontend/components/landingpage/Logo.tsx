import { PencilRuler } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href={"/"} className=" flex items-center gap-2">
        <PencilRuler color="white" size={32} />
        <span className="text-blue-500 font-bold text-2xl">100xdraw</span>
      </Link>
    </div>
  );
};

export default Logo;
