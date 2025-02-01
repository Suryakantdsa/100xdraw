import { Globe, Pencil, UsersRound, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Feature = () => {
  const features = [
    {
      icon: <Pencil color="green" />,
      title: "Intuitive Drawing Tools",
      description:
        "Sketch and draw with ease using our simple yet powerful tools.",
      iconColor: "bg-green-900/50",
      hoverBg: "bg-green-950",
    },
    {
      icon: <UsersRound color="#ec4899" />,
      title: "Real-time Collaboration",
      description:
        "Work together with your team in real-time, no matter where you are.",
      iconColor: "bg-pink-950/50",
      hoverBg: "bg-pink-800",
    },
    {
      icon: <Zap color="#a855f7" />,
      title: "Lightning Fast",
      description:
        "Experience smooth and responsive drawing with our optimized performance.",
      iconColor: "bg-purple-950/50",
      hoverBg: "bg-purple-700",
    },
    {
      icon: <Globe color="#eab308" />,
      title: "Accessible Anywhere",
      description:
        "Access your whiteboards from any device with an internet connection.",
      iconColor: "bg-yellow-950/50",
      hoverBg: "bg-yellow-800",
    },
  ];

  return (
    <div
      className="flex flex-col items-center text-white mt-4 w-full"
      id="feature"
    >
      <div className="flex flex-col items-center gap-4 max-w-2xl text-center px-4">
        <h2 className="underline text-blue-800 font-bold text-2xl mt-8">
          Features
        </h2>
        <h1 className="text-4xl font-bold">
          Everything you need to create and collaborate
        </h1>
        <p className="text-slate-400">
          Excalidraw provides all the tools you need for effective visual
          collaboration.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl px-4 py-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
