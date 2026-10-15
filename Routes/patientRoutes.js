const express = require("express");
const router = express.Router();
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../Controllers/patientController");
const fetchUser = require("../Middlewares/fetchUser");

router.post("/", fetchUser, createPatient);
router.get("/", fetchUser, getPatients);
router.get("/:id", fetchUser, getPatientById);
router.put("/:id", fetchUser, updatePatient);
router.delete("/:id", fetchUser, deletePatient);

module.exports = router;
