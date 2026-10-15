const Mapping = require("../Models/Mapping");
const Patient = require("../Models/Patient");
const Doctor = require("../Models/Doctor");

// POST /api/mappings/ - Assign a doctor to a patient

exports.assignDoctor = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;

    if (!patientId || !doctorId) {
      return res.status(400).json({
        success: false,
        message: "Both patientId and doctorId are required",
      });
    }

    const [patient, doctor] = await Promise.all([
      Patient.findById(patientId),
      Doctor.findById(doctorId),
    ]);

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const exists = await Mapping.findOne({ patient: patientId, doctor: doctorId });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Doctor is already assigned to this patient",
      });
    }

    const mapping = await Mapping.create({ patient: patientId, doctor: doctorId });

    res.status(201).json({
      success: true,
      message: "Doctor assigned to patient successfully",
      data: mapping,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/mappings/ - Retrieve all patient-doctor mappings

exports.getAllMappings = async (req, res, next) => {
  try {
    const mappings = await Mapping.find()
      .populate("patient", "name age gender address phone")
      .populate("doctor", "name specialization email contact");

    res.status(200).json({
      success: true,
      count: mappings.length,
      data: mappings,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/mappings/<patient_id>/ - Get all doctors assigned to a specific patient

exports.getDoctorsByPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patient_id);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const mappings = await Mapping.find({ patient: req.params.patient_id }).populate(
      "doctor",
      "name specialization email contact"
    );

    res.status(200).json({
      success: true,
      count: mappings.length,
      data: mappings,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/mappings/<id>/ - Remove a doctor from a patient

exports.deleteMapping = async (req, res, next) => {
  try {
    const mapping = await Mapping.findByIdAndDelete(req.params.id);

    if (!mapping) {
      return res.status(404).json({ success: false, message: "Mapping not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor removed from patient successfully",
    });
  } catch (error) {
    next(error);
  }
};