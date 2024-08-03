require("dotenv").config();
const express = require("express");
const db = require("./config/db.config.js");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/Auth.js");
const teacherAuth = require("./routes/Teacher.js")
const classRoute = require("./routes/Class.js");
const paymentRoute = require("./routes/Payment.js");



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.use("/api/teacher", teacherAuth );

app.use("/api/class", classRoute)

app.use("/api/payment", paymentRoute);

app.get("/api/hello", (req,res)=>{
    res.json({data: "HELLLO"}) 
})


app.listen(process.env.PORT, ()=>{  
    console.log(`Server is running on PORT ${process.env.PORT}`)
})