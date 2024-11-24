import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployee = ({ employeeId, onClose, onUpdate }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch the employee details by ID
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employees/${employeeId}`);
        setEmployeeData(response.data);
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEmployeeData({ ...employeeData, courses: [...employeeData.courses, value] });
    } else {
      setEmployeeData({
        ...employeeData,
        courses: employeeData.courses.filter((courses) => courses !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", employeeData.name);
      formData.append("email", employeeData.email);
      formData.append("mobile", employeeData.mobile);
      formData.append("designation", employeeData.designation);
      formData.append("gender", employeeData.gender);
      formData.append("courses", JSON.stringify(employeeData.courses || []));

      if (image) formData.append("image", image);
    

      const response = await axios.put(`http://localhost:3000/employees/${employeeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Employee Data:", employeeData);
      console.log("Update success ", response.data)
      alert("Employee updated successfully!");
      onUpdate(); // Callback to refresh the employee list
      onClose(); // Close the modal or component
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };
   

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white  py-10 px-10  w-1/2 rounded-lg ">
        <h2 className="text-xl font-bold my-2">Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={employeeData.mobile}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Designation</label>
            <select
              name="designation"
              value={employeeData.designation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Gender</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={employeeData.gender === "Male"}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={employeeData.gender === "Female"}
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Course</label>
            <div>
              <label className="mr-4">
                <input
                  type="checkbox"
                  value="MCA"
                  checked={employeeData.courses.includes("MCA")}
                  onChange={handleCourseChange}
                />
                MCA
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  value="BCA"
                  checked={employeeData.courses.includes("BCA")}
                  onChange={handleCourseChange}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BSC"
                  checked={employeeData.courses.includes("BSC")}
                  onChange={handleCourseChange}
                />
                BSC
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded-md"
              accept=".jpg,.png"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
