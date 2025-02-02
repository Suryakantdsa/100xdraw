"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      title: "Beginer",
      price: isAnnual ? "$0/year" : "$0/month",
      description:
        "Perfect for individuals and small teams just getting started.",
      features: [
        "Up to 5 boards",
        "Basic templates",
        "No Real-time collaboration",
      ],
      cta: "Get Started",
      popular: false,
    },

    {
      title: "Pro",
      price: isAnnual ? "$299/year" : "$29/month",
      description: "For growing teams and advanced features.",
      features: [
        "Unlimited boards",
        "Advanced templates",
        "Priority support",
        "Export as PNG, PDF, and SVG",
        "Custom branding",
      ],
      cta: "Go Pro",
      popular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs.",
      features: [
        "Unlimited boards",
        "Dedicated account manager",
        "Single sign-on (SSO)",
        "Custom integrations",
        "Advanced security",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ];

  return (
    <div className="bg-black text-white py-16" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Pricing</h2>
          <p className="text-slate-300 mt-4">
            Choose the plan that fits your needs.
          </p>
          <div className="mt-6 flex justify-center items-center gap-4">
            <span className="text-slate-300">Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                isAnnual ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <div
                className={`absolute -translate-y-2 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-slate-300">Annual</span>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-900 rounded-lg p-8 relative ${
                plan.popular
                  ? "border-2 border-blue-600"
                  : "border border-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="text-slate-300 mt-2">{plan.description}</p>
              <div className="my-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-slate-300">
                    / {isAnnual ? "year" : "month"}
                  </span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="text-blue-600" size={18} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
