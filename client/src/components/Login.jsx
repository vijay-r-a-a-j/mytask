import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Login({ username}) {

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState('');
  const[errors,setErrors] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const validationErrors = {};
    if (!formData.username) validationErrors.username = "Username is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    setError(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(validate()){
      const response = await axios.post("http://localhost:3000/login", formData);
      
      if (response.data.success) {

        localStorage.setItem("username", response.data.username);
        navigate("/dashboard");
       
      }else{
        setErrors("Invalid Credentials")
        setTimeout(() => {
          setFormData({username:"",password:""})
        }, 3000);
      }
      }
     
    } catch (err) {
      setErrors("An error occurred while logging in");
    }
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
             {error.username && <p className="text-red-500 text-sm mb-4">{error.username}</p>}

            
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          {error.password && <p className="text-red-500 text-sm mb-4">{error.password}</p>}
          </div>
          {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}
         
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
