import { JSX } from "react";

interface ISteps {
  icon?: JSX.Element;
  title: string;
  description: string;
}
const FeatureItem = ({ icon, title, description }: ISteps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="p-4 rounded-lg bg-opacity-50 bg-blue-500">{icon}</div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
