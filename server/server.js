const path = require("path")
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")

// Load configuration from the project root .env file even when this script is
// started from a different current working directory.
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") })

console.log("Server file started")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Sarthi Services Backend Running")
})

app.post("/contact", async (req,res)=>{

  const {name,email,message} = req.body

  // Ensure required credentials are set
  const { EMAIL_USER, EMAIL_PASS } = process.env
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("Missing EMAIL_USER or EMAIL_PASS environment variables")
    return res.status(500).json({ message: "Server email credentials are not configured" })
  }

  try {
    console.log("Received contact form submission:", {name,email,message});

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: EMAIL_USER,
      to: "bishnu@sarthiservices.in",
      replyTo: email,
      subject: "New Contact from Sarthi Services Website",
      text: `Name: ${name}
Email: ${email}
Message: ${message}`,
    })

    res.json({ message: "Email sent successfully" })
  } catch (err) {
    console.error("Failed to send contact email:", err)
    res.status(500).json({ message: "Email failed", details: err.message })
  }

})

app.listen(5500,()=>{
console.log("Server running on port 5500")
})