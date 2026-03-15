# Sarthi Services Website

## Project Overview

Sarthi Services Website is a simple full-stack web application built to represent the consultancy services offered by **Sarthi Services Private Limited**.
The website provides information about the company, its services, and allows users to contact the company through a contact form.

When a user submits the contact form, an email notification is sent to the company email address.

---

## Services Offered

The website highlights the following services:

1. Management Consultancy
2. Manpower Supply
3. Financial Consultancy
4. Human Resource Management
5. Marketing & Development Consultancy

---

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Email Service

* Nodemailer (for sending contact emails)

---

## Project Structure

sarthi-services
│
├── client
│   ├── css
│   │   └── style.css
│   │
│   ├── js
│   │   └── script.js
│   │
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   └── contact.html
│
├── server
│   ├── server.js
│   └── .env
│
└── README.md

---

## Features

* Clean and simple consultancy website
* Responsive design for desktop and mobile
* Contact form for user inquiries
* Automatic email notification when someone contacts the company
* Professional UI using beige and dark blue color theme

---

## Setup Instructions

### 1. Clone the project

```
git clone <repository-link>
```

or download the project and open it in VS Code.

---

### 2. Install backend dependencies

Navigate to the server folder:

cd server
npm install

---

### 3. Configure environment variables

Create a `.env` file inside the **server** folder and add:

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

These credentials are used to send emails through Nodemailer.


### 4. Run the backend server

```
node server.js
```

Server will start on:

```
http://localhost:5000
```

---

### 5. Run the frontend

Open the **client folder** and open `index.html` using:

* Live Server extension in VS Code
  or
* Directly open the file in the browser.

---

## Contact Form Functionality

When a user fills out the contact form:

1. The form sends data to the backend API.
2. The backend processes the request.
3. Nodemailer sends an email to the company email address.

---

