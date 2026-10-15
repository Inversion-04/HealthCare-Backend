const Patient = require("../Models/Patient");
const Mapping = require("../Models/Mapping");

// Safe helper to extract authenticated user's ID

const getUserId = (user) => (user?._id || user?.id || user?.userId)?.toString();

// POST /api/patients/ - Add a new patient (Authenticated users only)

exports.createPatient = async (req, res, next) => {
  try {
    const { name, age, gender, address, phone, contact, medicalHistory } =
      req.body;
    const currentUserId = getUserId(req.user);

    if (!currentUserId) {
      return res.status(401).json({
        success: false,
        message: "User authentication missing or invalid.",
      });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      address,
      phone: phone || contact,
      medicalHistory,
      createdBy: currentUserId,
    });

    res.status(201).json({
      success: true,
      message: "Patient added successfully",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/patients/ - Retrieve all patients created by the authenticated user

exports.getPatients = async (req, res, next) => {
  try {
    const currentUserId = getUserId(req.user);
    const patients = await Patient.find({ createdBy: currentUserId }).populate(
      "createdBy",
      "name email",
    );

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/patients/<id>/ - Get details of a specific patient

exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const currentUserId = getUserId(req.user);

    const creatorId = (patient.createdBy?._id || patient.createdBy)?.toString();

    if (creatorId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this patient record",
      });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// PUT /api/patients/<id>/ - Update patient details

exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const currentUserId = getUserId(req.user);

    const creatorId = (patient.createdBy?._id || patient.createdBy)?.toString();

    if (creatorId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this patient record",
      });
    }

    const updateData = { ...req.body };

    delete updateData.createdBy;

    if (updateData.contact && !updateData.phone) {
      updateData.phone = updateData.contact;
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/patients/<id>/ - Delete a patient record

exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const currentUserId = getUserId(req.user);

    const creatorId = (patient.createdBy?._id || patient.createdBy)?.toString();

    if (creatorId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this patient record",
      });
    }

    await patient.deleteOne();

    await Mapping.deleteMany({ patient: req.params.id });

    res.status(200).json({
      success: true,
      message: "Patient and associated doctor mappings deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
