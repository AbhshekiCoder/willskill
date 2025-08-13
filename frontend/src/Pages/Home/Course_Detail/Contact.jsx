import React, { useState } from 'react';
import ContactUsImg from '../../../assets/ContactUsImg.png';
import axios from 'axios';

let url = import.meta.env.VITE_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', description: '' });
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    console.log("hello")
    e.preventDefault()
   
    try {
      const result = await axios.post(`${url}customer_contact`, form);
      if (result.data.success) {
        setMessageColor('green');
        setMessage(result.data.message);
        setForm({ name: '', email: '', description: '' });

        setTimeout(() => {
          setMessage('');
        }, 4000);
      } else {
        setMessageColor('red');
        setMessage(result.data.message);
      }
    } catch (err) {
      setMessageColor('red');
      setMessage('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className='flex flex-wrap bg-gray-100 px-6 py-16'>
      {/* Left: Form */}
      <div className='w-full lg:w-1/2 mb-10 lg:mb-0'>
        {message && (
          <div
            className='text-lg font-medium mb-6'
            style={{ color: messageColor }}
          >
            {message}
          </div>
        )}

        <h2 className='text-4xl md:text-5xl font-semibold text-purple-800 mb-8'>
          Contact Us
        </h2>

        <form  className='space-y-6 max-w-md'>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            required
            placeholder='📧 Email'
            className='w-full h-12 px-3 rounded-md border border-gray-300 bg-gray-200 placeholder:text-gray-500 text-base focus:outline-purple-400'
          />

          <input
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            required
            placeholder='👤 Name'
            className='w-full h-12 px-3 rounded-md border border-gray-300 bg-gray-200 placeholder:text-gray-500 text-base focus:outline-purple-400'
          />

          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            required
            placeholder='📝 Message'
            className='w-full h-28 px-3 py-2 rounded-md border border-gray-300 bg-gray-200 placeholder:text-gray-500 text-base resize-none focus:outline-purple-400'
          ></textarea>

          <button
            type='submit'
            className='w-full h-12 bg-purple-600 text-white text-lg font-semibold rounded-full hover:bg-purple-700 transition'
            onClick={submit}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className='w-full lg:w-1/2 flex justify-center items-center'>
        <img
          src={ContactUsImg}
          alt='Contact Us Illustration'
          className='w-full max-w-md object-contain'
        />
      </div>
    </div>
  );
}
