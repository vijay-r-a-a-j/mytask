import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import bgImage from '../../assets/BgImage.jpg'

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);

  const username = localStorage.getItem("username") || "Guest";

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required.";

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must contain only numeric values.";
    }

    // Designation validation
    if (!formData.designation) {
      newErrors.designation = "Please select a designation.";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
    }

    // Course validation
    if (formData.courses.length === 0) {
      newErrors.courses = "Please select at least one course.";
    }

    // Image validation
    if (!formData.image) {
      newErrors.image = "Please upload an image.";
    } else if (
      !["image/jpeg", "image/png"].includes(formData.image.type)
    ) {
      newErrors.image = "Only JPG or PNG files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const newCourses = checked
        ? [...formData.courses, value]
        : formData.courses.filter((course) => course !== value);
      setFormData({ ...formData, courses: newCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (name === "email") {
      // Check if email exists
        axios.post("http://localhost:3000/check-email", { email: value })
        .then((response) => setEmailExists(response.data.exists))
        .catch(() => setEmailExists(false));
    }
   
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          data.append(key, formData[key]);
        } else if (key === "courses") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      try {
       
        await axios.post("http://localhost:3000/submit-form", data);
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          courses: [],
          image: null
        });
        setEmailExists(false);
      } catch (err) {
        alert("Failed to submit the form.");
      }
    }
  };

  return (
    <div>
      <Navbar username={username}/>
      <div className="bg-cover "  style={{backgroundImage:`url(${bgImage})`}}>
    <form
      onSubmit={handleSubmit}
      className="bg-slate-200 p-6 rounded-lg shadow-md md:w-[500px] space-y-4 mx-auto my-10 border-2 "
    >
      <h2 className="text-3xl text-gray-800 font-bold mb-4 text-center">Create Employee</h2>

      {/* Name */}
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        {emailExists && (
          <p className="text-red-500 text-sm">Email already exists.</p>
        )}
      </div>

        {/* Mobile */}
        <div>
        <label className="block text-gray-700">Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your mobile number"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm">{errors.mobile}</p>
        )}
      </div>

      {/* Designation */}
      <div>
        <label className="block text-gray-700">Designation</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.designation && (
          <p className="text-red-500 text-sm">{errors.designation}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-700">Gender</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleInputChange}
              checked={formData.gender === "Male"}
            />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleInputChange}
              checked={formData.gender === "Female"}
            />
            <span>Female</span>
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      {/* Courses */}
      <div>
        <label className="block text-gray-700">Courses</label>
        <div className="flex flex-wrap gap-4">
          {["MCA", "BCA", "BSC"].map((course) => (
            <label key={course} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="courses"
                value={course}
                onChange={handleInputChange}
                checked={formData.courses.includes(course)}
              />
              <span>{course}</span>
            </label>
          ))}
        </div>
        {errors.courses && (
          <p className="text-red-500 text-sm">{errors.courses}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image}</p>
        )}
      </div>

      {/* Submit */}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
    </div>
    </div>
  );
}
