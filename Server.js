const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const errorHandler = require("./Middlewares/errorHandler");

dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/patients", require("./Routes/patientRoutes"));
app.use("/api/doctors", require("./Routes/doctorRoutes"));
app.use("/api/mappings", require("./Routes/mappingRoutes"));


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
