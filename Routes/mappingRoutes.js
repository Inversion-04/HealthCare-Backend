const express = require("express");
const router = express.Router();
const {
  assignDoctor,
  getAllMappings,
  getDoctorsByPatient,
  deleteMapping,
} = require("../Controllers/mappingContoller");
const fetchUser = require("../Middlewares/fetchUser");

router.post("/", fetchUser, assignDoctor);
router.get("/", fetchUser, getAllMappings);
router.get("/:patient_id", getDoctorsByPatient);
router.delete("/:id", fetchUser, deleteMapping);

module.exports = router;
