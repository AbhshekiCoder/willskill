import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';

const stories = [
  {
    name: "Anjali Sharma",
    story: "WillSkill helped me land my first full-time job as a frontend developer after 3 months of learning.",
    role: "Frontend Developer",
    img: "https://source.unsplash.com/300x300/?woman,smile"
  },
  {
    name: "Ravi Kumar",
    story: "From a mechanical engineer to a full-stack developer, this platform made my dream come true.",
    role: "Full Stack Engineer",
    img: "https://source.unsplash.com/300x300/?man,professional"
  },
  {
    name: "Simran Joshi",
    story: "The mentorship and real-world projects gave me the confidence to freelance and earn independently.",
    role: "Freelance Developer",
    img: "https://source.unsplash.com/300x300/?girl,tech"
  }
];

export default function SuccessStories() {
  return (
    <> 
   <Navbar/>
    <div className="bg-white py-20 px-6">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">Success Stories</h2>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
        Hear from learners who have successfully transitioned their careers, built startups, or landed amazing job opportunities with WillSkill.
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stories.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
          >
            <img src={item.img} alt={item.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
            <h3 className="text-lg font-semibold text-purple-700">{item.name}</h3>
            <p className="text-sm italic text-gray-600">{item.role}</p>
            <p className="text-base text-gray-700 mt-3">"{item.story}"</p>
          </motion.div>
        ))}
      </div>
    </div>
      </>
  );
}
