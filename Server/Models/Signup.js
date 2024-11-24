const mongoose = require("mongoose")


const signupSchema = new mongoose.Schema({
   username: String,
   email: String,
   password:String
})



const signupModel = mongoose.model("t_signup",signupSchema)

module.exports = signupModel