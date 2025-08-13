import React from 'react';
import CoursesNavbar from './Course_Detail/CoursesNavbar';
import Review from './Course_Detail/Review';
import Contact from './Course_Detail/Contact';

import react from '../../assets/react.jpg';
import java from '../../assets/java.jpg';
import js from '../../assets/js.jpg';
import web from '../../assets/web.jpg';
import html from '../../assets/html.jpg';
import css from '../../assets/css.jpg';

export default function Course_detail() {
  const logos = [html, css, js, react, java, web, js, html, css, js, react, java, web, js];

  return (
    <>
      <div className='bg-white font-sans text-gray-800'>
        {/* 🔹 Header Section */}
        <div className='text-center py-16 px-6 max-w-5xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-purple-700 mb-4'>
            All The Skills You Need In One Place
          </h1>
          <p className='text-lg md:text-2xl text-gray-600 font-medium'>
            From critical skills to technical topics, Tech Temple supports your professional development
          </p>
          <div className='border-b-2 border-gray-300 mt-6 w-3/4 mx-auto'></div>
        </div>

        {/* 🔹 Courses Section */}
        <div className='mb-20'>
          <CoursesNavbar />
        </div>

        {/* 🔹 Growth Promotion Section */}
        <div className='text-center py-16 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-50'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-700 mb-4'>
            Accelerate Growth — For You or Your Organization
          </h2>
          <p className='text-lg md:text-xl text-gray-600 font-medium'>
            Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.
          </p>
        </div>

        {/* 🔹 Scrolling Logos Section */}
        <div className="overflow-hidden py-10 bg-white">
          <div className="animate-marquee whitespace-nowrap flex space-x-10 items-center">
            {logos.map((logo, i) => (
              <div key={i} className="flex-shrink-0 w-28 h-28">
                <img
                  src={logo}
                  alt="tech"
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Review Section */}
        <div className='mt-20'>
          <Review />
        </div>

        {/* 🔹 Contact Section */}
        <div className='mt-16'>
          <Contact />
        </div>
      </div>
    </>
  );
}
