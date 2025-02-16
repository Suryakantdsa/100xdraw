"use client";
import React from "react";
import { motion } from "motion/react";
const page = () => {
  return (
    <div
      className="[perspective::1000px] [transform-style:preserve-3d] h-screen w-full bg-neutral-900 flex items-center justify-center gap-x-5 gap-y-1 flex-wrap"
      style={{
        backgroundImage: `radial-gradient(circle at 0.8px 0.8px , rgba(6,182,212,0.2), 0.8px,transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
    >
      <motion.button
        initial={{ rotate: 0 }}
        animate={{
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        className="group  relative bg-black text-neutral-500 text-4xl px-12 py-4 rounded-lg shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.1),inset_0px_0px_1px_2px_rgba(255,255,255,0.1)]"
      >
        Suryakant Das
        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[3px] w-full mx-auto blur-sm"></span>
      </motion.button>
      <motion.button
        whileHover={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        className="group relative bg-black text-neutral-500 text-4xl px-12 py-4 rounded-lg shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.1),inset_0px_0px_1px_2px_rgba(255,255,255,0.1)]"
      >
        Suryakant Das
        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[3px] w-full mx-auto blur-sm"></span>
      </motion.button>
      <motion.button
        whileHover={{
          rotateX: 20,
          rotateY: 20,
          boxShadow: "0px 20px 50px rgba(8,112,184,0.7) ",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          translateZ: 100,
        }}
        className="group relative bg-black text-neutral-500 text-4xl px-12 py-4 rounded-lg shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.1),inset_0px_0px_1px_2px_rgba(255,255,255,0.1)]"
      >
        Suryakant Das
        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[3px] w-full mx-auto blur-sm"></span>
      </motion.button>
      <motion.button
        whileHover={{
          rotateX: 20,
          rotateY: 20,
          boxShadow: "0px 20px 50px rgba(8,112,184,0.7) ",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          translateZ: 100,
        }}
        className="group relative bg-black text-neutral-500 text-4xl px-12 py-4 rounded-lg shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.1),inset_0px_0px_1px_2px_rgba(255,255,255,0.1)]"
      >
        <span className="group-hover:text-cyan-500 transition-colors duration-300">
          Suryakant Das
        </span>
        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[3px] w-full mx-auto blur-sm"></span>
      </motion.button>
      <motion.button
        whileHover={{
          rotateX: 20,
          // rotateY: 20,
          boxShadow: "0px 20px 50px rgba(8,112,184,0.7) ",
          y: -10,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        style={{
          translateZ: 100,
        }}
        className="group relative bg-black text-neutral-500 text-4xl px-12 py-4 rounded-lg shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.1),inset_0px_0px_1px_2px_rgba(255,255,255,0.1)]"
      >
        <span className="group-hover:text-cyan-500 transition-colors duration-300">
          Suryakant Das
        </span>
        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[3px] w-full mx-auto blur-sm"></span>
      </motion.button>
      <motion.button
        whileHover={{
          rotateX: 20,
          // rotateY: 20,
          boxShadow: "0px 20px 50px rgba(8,112,184,0.7) ",
          y: -10,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        whileTap={{
          y: 100,
        }}
        style={{
          translateZ: 100,
        }}
        className="group relative bg-black text-neutral-500 text-4xl px-12 py-4 rounded-lg shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.1),inset_0px_0px_1px_2px_rgba(255,255,255,0.1)]"
      >
        <span className="group-hover:text-cyan-500 transition-colors duration-300">
          Suryakant Das
        </span>
        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[3px] w-full mx-auto blur-sm"></span>
      </motion.button>
    </div>
  );
};

export default page;
