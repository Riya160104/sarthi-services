const path = require("path")
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")

// Load configuration from the project root .env file even when this script is
// started from a different current working directory.
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") })

console.log("Server file started")

const app = express()

// 1. Define your Netlify URL
const netlifyURL = 'https://sarthi-services.netlify.app/';

// 2. Configure CORS options
const corsOptions = {
  origin: netlifyURL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};


app.use(cors(corsOptions));
app.use(express.json())

// Serve the client-side site from the `client/` folder so the frontend and API share the same origin.
const CLIENT_DIR = path.join(__dirname, "..", "client")
app.use(express.static(CLIENT_DIR))

app.get("/", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "index.html"))
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
    debugger;
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
    debugger;
    console.error("Failed to send contact email:", err)
    res.status(500).json({ message: "Email failed", details: err.message })
  }

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})