import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiPolymerproject } from "react-icons/si"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className='text-7xl text-indigo-950'><SiPolymerproject /></p>
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
      <div className='flex gap-5'>
      <button
        className="bg-blue-500 text-white py-2 px-6 rounded-lg  hover:bg-blue-600 transition"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button
        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
        onClick={() => navigate('/signup')}
      >
        Signup
      </button>
      </div>
    </div>
  );
}
