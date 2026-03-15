const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
require("dotenv").config()

console.log("Server file started")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Sarthi Services Backend Running")
})

app.post("/contact", async (req,res)=>{

const {name,email,message} = req.body

try{

const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}
})

await transporter.sendMail({
from:process.env.EMAIL_USER,
to:"bishnu@sarthiservices.in",
replyTo:email,
subject:"New Contact from Sarthi Services Website",
text:`Name: ${name}
Email: ${email}
Message: ${message}`
})

res.json({message:"Email sent successfully"})

}catch(err){
console.log(err)
res.status(500).json({message:"Email failed"})
}

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})