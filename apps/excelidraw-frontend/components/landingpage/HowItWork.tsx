import {
  DraftingCompass,
  MessageCircle,
  MonitorCheck,
  Share,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import FeatureItem from "./Steps";

const HowItWork = () => {
  const features = [
    {
      icon: <MonitorCheck size={30} />,
      title: "Create a board",
      description: "Start with a blank canvas or choose from our templates.",
    },
    {
      icon: <MessageCircle size={30} />,
      title: "Invite your team",
      description: "Share a link and collaborate in real-time with your team.",
    },
    {
      icon: <DraftingCompass size={30} />,
      title: "Sketch and ideate",
      description: "Use our intuitive tools to bring your ideas to life.",
    },
    {
      icon: <Share size={30} />,
      title: "Export and share",
      description:
        "Save your work as an image or share a live link with stakeholders.",
    },
  ];

  return (
    <div className="flex flex-col items-center text-white mt-4" id="feature">
      <div className="flex flex-col items-center gap-4 max-w-2xl text-center px-4">
        <h2 className="font-bold text-4xl mt-8">How 100xdraw works ?</h2>
        <h1 className="text-lg font-bold text-slate-300">
          Get started with excalidraw in just a few simple steps.
        </h1>
      </div>
      <div className="py-6 flex flex-col lg:flex-row w-full max-w-7xl justify-center items-center px-16  md:px-10 gap-8">
        <div className="flex flex-col gap-10 w-full lg:w-1/2">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={
              "https://res.cloudinary.com/dwnapxhev/image/upload/v1737349141/community_hero_image_afxlos.svg"
            }
            width={500}
            height={400}
            alt="how it work"
            className="w-full max-w-[500px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
