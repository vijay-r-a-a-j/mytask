const mongoose = require("mongoose")

const createEmpSchema = new mongoose.Schema({
    name:String,
    email:String,
    mobile: String,
    designation: String,
    gender: String,
    courses: [String],
    date:String,
    image: String,
})

const employeeModel = mongoose.model("Employee", createEmpSchema)

module.exports = employeeModel