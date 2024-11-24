const express = require("express") 
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const signupModel = require("./Models/Signup")
const employeeModel = require("./Models/CreateEmployee")

const app  = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/MyTask")
.then(()=> console.log("DataBase connected"))
.catch((err)=>console.log(err))



// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename
    },
  });
  
  // Initialize Multer with the storage configuration
  const upload = multer({ storage: storage });

  // Email check
app.post("/check-email", async (req, res) => {
    const { email } = req.body;
    const existingUser = await employeeModel.findOne({ email });
    res.json({ exists: !!existingUser });
  });
  
  // Submit form endpoint
  app.post("/submit-form", upload.single("image"), async (req, res) => {
    try {
      const { name, email, mobile, designation, gender, courses ,date} = req.body;
      const newForm = new employeeModel({
        name,
        email,
        mobile,
        designation,
        gender,
        courses: JSON.parse(courses),
        date,
        image: req.file.path,
      });
      await newForm.save();
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to submit form." });
    }
  });
    
   //Login 
   app.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await signupModel.findOne({ username, password });
      if (user) {
        res.json({ success: true, username: user.username });
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

//sign up
app.post("/register",(req,res)=>{
  signupModel.create(req.body)
  .then(data => res.json(data))
  .catch(err => res.json(err))
})


// API to fetch all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API to delete an employee
app.delete('/employees/:id', async (req, res) => {
  try {
    await employeeModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to update an employee (stubbed)

app.put('/employees/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, courses } = req.body;

    const updateData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses: JSON.parse(courses),
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedEmployee = await employeeModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});



app.listen(3000, ()=>{
    console.log("Server is running in Port 3000")
})