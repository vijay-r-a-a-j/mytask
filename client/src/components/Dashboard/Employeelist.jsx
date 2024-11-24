import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "./Navbar";
import UpdateEmployee from "./UpdateEmployee";
import { useNavigate } from "react-router-dom";

const Employeelist = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

const handleEdit = (id) => {
  setSelectedEmployeeId(id);
  setIsUpdateModalOpen(true);
};

const handleUpdateModalClose = () => {
  setIsUpdateModalOpen(false);
  fetchEmployees(); // Refresh the list after update
};

const navigate = useNavigate()


  // Fetch employees from the backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Delete an employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/employees/${id}`);
      fetchEmployees();
      alert("Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Search employees
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.mobile.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div>
      <Navbar/>
    
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4 ">Employee List</h1>
        <button onClick={()=>navigate("/createemployee")} className='font-bold bg-gray-800 text-white 
                    rounded-lg px-5 py-2 mt-5 hover:bg-gray-700 my-auto'>
                       Create Employee
                    </button>
      </div>
      {isUpdateModalOpen && (
                <UpdateEmployee
                  employeeId={selectedEmployeeId}
                  onClose={handleUpdateModalClose}
                  onUpdate={fetchEmployees}
                />
              )}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or Mobile No"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded-md w-1/3"
        />
       
        <p className="font-semibold">Total Employees: {filteredEmployees.length}</p>
      </div>
      <div className="overflow-x-auto lg:overflow-x-hidden">
      <table className="table-auto w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className=" text-indigo-950 font-bold px-4 py-2 border">ID</th>
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Image</th>
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Name</th>
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Email</th>
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Mobile No</th>
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Designation</th>
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Gender</th>
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Course</th>
           
            <th className=" text-indigo-950 font-bold px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{employee._id}</td>
              <td className="border px-4 py-2">
                <img
                  src={`http://localhost/employees/${employee.image}`}
                  alt={employee.name}
                  className="h-10 w-10 object-cover  "
                />
              </td>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2"><a className="underline cursor-pointer text-blue-800">
                {employee.email}</a>
                </td>
              <td className="border px-4 py-2">{employee.mobile}</td>
              <td className="border px-4 py-2">{employee.designation}</td>
              <td className="border px-4 py-2">{employee.gender}</td>
              <td className="border px-4 py-2">{employee.courses.join(",")}</td>

              <td className="border px-4 py-2 flex gap-2 ">
                <button 
                  className="text-green-600 hover:underline flex items-center"
                  onClick={() => handleEdit(employee._id)}
                >
                  <FaEdit className="mr-1" />
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline flex items-center"
                  onClick={() => handleDelete(employee._id)}
                >
                  <FaTrash className="mr-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};

export default Employeelist;
