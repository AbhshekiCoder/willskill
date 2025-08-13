import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';

const benefits = [
  {
    title: "Upskill Your Team",
    description: "Train employees with the latest industry-standard technologies using our tailored learning paths.",
    image: "https://source.unsplash.com/600x400/?teamwork"
  },
  {
    title: "Dedicated Account Manager",
    description: "Get personalized support and onboarding assistance to achieve your training goals.",
    image: "https://source.unsplash.com/600x400/?support,customer"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your team’s learning journey with intuitive dashboards and analytics.",
    image: "https://source.unsplash.com/600x400/?analytics"
  }
];

export default function Business() {
  return (
    <> 
    <Navbar/>
    <div className="bg-white py-20 px-6">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-4">WillSkill for Business</h2>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
        Empower your workforce with cutting-edge tech skills. Flexible, scalable, and result-driven learning solutions.
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {benefits.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}