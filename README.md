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
```

## Installation & Setup
1. Clone the repository
Bash
git clone [https://github.com/](https://github.com/)<YOUR_GITHUB_USERNAME>/HealthCare-Backend.git
cd HealthCare-Backend

3. Install dependencies
Bash
npm install

5. Configure environment variables
Create a .env file in the root directory and populate it based on .env.example:

6. Run the application
Bash
# Development mode with automatic restart
npm run dev

# Production mode
npm start
The server will initialize on http://localhost:5000.

## API Endpoints

# Authentication (/api/auth)

Method	  Endpoint	        Description	                          Auth Required
POST	  /api/auth/register	Register a new user account	              No
POST	  /api/auth/login	    Log in and receive JWT token / cookie	    No

# Doctors (/api/doctors)

Method	  Endpoint	      Description        	            Auth Required
POST	  /api/doctors	    Add a new doctor	                Yes
GET	    /api/doctors	    Get all registered doctors	      Yes
GET	    /api/doctors/:id	Get single doctor details by ID	  Yes
PUT	    /api/doctors/:id	Update doctor information	        Yes
DELETE	/api/doctors/:id	Remove a doctor	                  Yes

# Patients (/api/patients)

Method	    Endpoint	            Description	                                Auth Required
POST	      /api/patients	      Register a new patient (sets createdBy)	            Yes
GET	        /api/patients	      Fetch patients created by authenticated user	      Yes
GET	        /api/patients/:id	  Get details of a specific patient	                  Yes
PUT	        /api/patients/:id	  Update patient record (owner only)	                Yes
DELETE	    /api/patients/:id	  Delete patient record (owner only)	                Yes

# Mappings (/api/mappings)

Method	        Endpoint	                        Description	                                      Auth Required
POST	          /api/mappings	                  Assign a doctor to a patient	                             Yes
GET	           /api/mappings	                  View all active patient-doctor mappings	                   Yes
GET	          /api/mappings/:patient_id	        View all doctors assigned to a specific patient	           Yes
DELETE	     /api/mappings/:id	                Delete a specific mapping	                                 Yes

