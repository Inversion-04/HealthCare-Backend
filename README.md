# Healthcare Management Backend API

A secure, production-grade RESTful API built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** for managing healthcare operations, including doctor registries, patient medical profiles, and relational doctor-patient consultations.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM / MongoDB Atlas)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Middleware:** cookie-parser, cors, dotenv

---

## Key Features

- **Authentication & Security:**
  - Token-based authentication supporting both HTTP-only cookies and `Authorization: Bearer <token>` headers.
  - Salted password hashing with `bcryptjs`.
- **Doctor Management:**
  - Full CRUD operations for doctor profiles (name, specialization, email, contact).
- **Patient Management & Resource Ownership:**
  - Patient profiling with medical history and contact data.
  - Creator-based ownership control ensuring only the creator can update or delete specific records.
- **Doctor-Patient Mappings:**
  - Dynamic assignment of doctors to patients.
  - Duplicate mapping prevention.
  - Cascade cleanup and populated query responses.

---

## Project Structure

```text
├── Config/
│   └── db.js                 # Database connection logic
├── Controllers/
│   ├── authController.js     # User registration and login
│   ├── doctorController.js   # Doctor CRUD handlers
│   ├── mappingController.js  # Patient-doctor assignment logic
│   └── patientController.js  # Patient CRUD Handlers
├── Middlewares/
│   ├── errorHandler.js       # Centralized error formatting
│   └── fetchUser.js          # JWT token extraction and verification
├── Models/
│   ├── User.js               # User authentication model
│   ├── Doctor.js             # Doctor schema
│   ├── Patient.js            # Patient schema (includes createdBy reference)
│   └── Mapping.js            # Relational mapping schema
├── Routes/
│   ├── authRoutes.js         # Routes for /api/auth
│   ├── doctorRoutes.js       # Routes for /api/doctors
│   ├── patientRoutes.js      # Routes for /api/patients
│   └── mappingRoutes.js      # Routes for /api/mappings
├── .env.example              # Environment variables template
├── .gitignore                # Ignored directories and secret files
├── package.json              # Project dependencies and run scripts
└── server.js                 # App entry point
