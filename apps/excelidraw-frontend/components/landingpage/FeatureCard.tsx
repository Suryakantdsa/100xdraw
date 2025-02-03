import React, { JSX } from "react";

interface IfeatureCard {
  icon?: JSX.Element;
  title: string;
  description: string;
  iconColor: string;
  hoverBg: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  iconColor,
  hoverBg,
}: IfeatureCard) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 p-6 rounded-lg transition-all duration-300 `}
    >
      <div className={`p-4 rounded-lg bg-opacity-50  ${iconColor}`}>{icon}</div>
      <div className="text-center sm:text-left">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
