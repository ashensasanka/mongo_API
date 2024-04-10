const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl = "mongodb+srv://piumi0234:j4VkiQXxulYpubZI@cluster0.xwkzfvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl,{

}).then(()=>{console.log("Connected to MongoDB");})
.catch(e=>console.log(e));

require('./userDetails');
require('./markDetails');

// app.use(bodyParser.json());

const User = mongoose.model("UserInfo");
const Marks = mongoose.model("UserMarks");

app.get("/user-data", async (req, res)=> {
    try {
        // Assuming you're passing the user's email in the request headers
        const userEmail = req.headers.email; // Access the email from headers
        const user = await User.findOne({ email: userEmail });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//If press the Signin button call this API end point 
app.post("/register", async(req, res)=>{
    const { name, email, password, marks } = req.body;
    try {
        await User.create({
            name,
            email,
            password: password,
            marks
        });
        res.send({status:"Ok"})
    } catch (error) {
        res.send({status:"error"})
    }
});

app.post("/update-marks", async(req, res)=>{
    const { name, marks } = req.body;
    try {
        await User.updateOne({
            name: name // Find the user by name
        }, {
            $set: {
                marks: marks // Set the marks to the new value
            }
        });
        res.send({status:"Ok"})
    } catch (error) {
        console.error(error);
        res.status(500).send({status:"error"})
    }
  });

// If press the Login button call this API
app.post("/login-user", async (req, res)=> {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user){
        return res.json({error: "User Exists"});
    }
    if(password == user.password){
        const token = jwt.sign({email:user.email}, JWT_SECRET);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
          } else {
            return res.json({ error: "error" });
          }
        }
    res.json({ status: "error", error: "InvAlid Password" });
});

app.get("/marks-name", (req, res)=> {
    Marks.find()
    .then(UserMarks => res.json(UserMarks))
    .catch(err => res.json(err))
});

app.listen(5000,()=> {
    console.log("Sever Started");
});

