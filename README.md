# 🧳 Tour Booking Web Application (Backend)

A secure and scalable **backend API** built with **Node.js** and **Express**, designed for managing a **tour booking platform**.  
Includes authentication, authorization, data modeling, and security best practices.  

---

## ✨ Features

- ⚡ **Node.js & Express** – Fast, scalable backend framework  
- 🔐 **Authentication & Authorization** – Secure login and role-based access control (JWT)  
- 🗄️ **Data Modeling** – Structured schemas with MongoDB & Mongoose  
- 🛡️ **Security** – Implemented best practices (password hashing, sanitization, rate limiting, etc.)  
- 📦 **RESTful API** – Clean endpoints for tours, users, and bookings  
- 📊 **Scalable Structure** – Organized MVC architecture for maintainability  

---

## 🛠️ Tech Stack

- **Backend Framework**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)  
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)  
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing  
- **Security**: Helmet, Express-rate-limit, Data sanitization  
- **Architecture**: REST API, MVC pattern  

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/tour-booking-api.git
cd tour-booking-api
### 2. Install dependencies

npm install
# or
yarn install

### 3. Configure environment variables
Create a .env file in the project root and add the following:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=30d
NODE_ENV=development

### 4. Run the development server
npm run dev

### 5. Open in browser / API client
Visit http://localhost:5000/api/v1/tours to test the API.
Use Postman or any REST client to interact with endpoints.

###  Usage
/api/v1/auth/register → Create a new user

/api/v1/auth/login → Login & get JWT token

/api/v1/tours → Get all tours

/api/v1/tours/:id → Get single tour details

/api/v1/bookings → Create & manage bookings (protected routes)

###  Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

