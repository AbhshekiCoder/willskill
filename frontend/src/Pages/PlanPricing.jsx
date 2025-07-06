import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';

const plans = [
  {
    title: "Starter",
    price: "Free",
    features: ["Access to basic courses", "Community support", "No certificate"],
    color: "bg-gray-100"
  },
  {
    title: "Pro",
    price: "$29/month",
    features: ["All premium courses", "Certificate of completion", "Priority support"],
    color: "bg-purple-100"
  },
  {
    title: "Enterprise",
    price: "Custom Pricing",
    features: ["Team dashboards", "Dedicated manager", "Custom integrations"],
    color: "bg-purple-200"
  }
];

export default function PlanPricing() {
  return (
    <> 
    <Navbar/>
    <div className="bg-white py-20 px-6">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
        Find the right plan for individuals, teams, or enterprises. Start for free or scale as you grow.
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className={`rounded-xl p-6 shadow-xl ${plan.color}`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
            <p className="text-3xl font-semibold text-purple-700 mb-4">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feat, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="text-green-500 mr-2">✔</span> {feat}
                </li>
              ))}
            </ul>
            <button className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 w-full">
              {plan.title === "Starter" ? "Get Started" : "Choose Plan"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}
