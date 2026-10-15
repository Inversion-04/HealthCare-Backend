const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../Controllers/doctorController");
const fetchUser = require("../Middlewares/fetchUser");

router.post("/", fetchUser, createDoctor);
router.get("/", fetchUser, getDoctors);
router.get("/:id", fetchUser, getDoctorById);
router.put("/:id", fetchUser, updateDoctor);
router.delete("/:id", fetchUser, deleteDoctor);

module.exports = router;
