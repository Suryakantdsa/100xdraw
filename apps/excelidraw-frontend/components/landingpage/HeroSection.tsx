import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex mt-8 w-full items-center flex-col md:flex-row">
      <div className="flex justify-center items-center md:items-start flex-col text-white p-6 sm:p-10 gap-8 w-full md:w-1/2">
        <h1 className=" text-4xl md:text-6xl font-bold text-center  md:text-start  ">
          Collaborate and create{" "}
          <span className="text-blue-600">with 100xdraw</span>
        </h1>
        <p className="text-center md:text-start text-base text-slate-400">
          Unleash your creativity with our intuitive whiteboard tool. Sketch,
          brainstorm, and collaborate in real-time with your team, no matter
          where you are.
        </p>
        <div className=" flex gap-2">
          <Link href={"/signup"}>
            <button className=" bg-blue-600 text-white font-bold px-6 py-3 rounded-md">
              Get Started
            </button>
          </Link>
          <button className=" bg-white text-blue-600 font-bold px-6 py-3 rounded-md">
            Live demo
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-full p-4 flex justify-center">
        <Image
          src={"/darkmodehero.webp"}
          width={600}
          height={800}
          alt="heroimg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
