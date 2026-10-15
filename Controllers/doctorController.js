const Doctor = require("../Models/Doctor");
const Mapping = require("../Models/Mapping");

// POST /api/doctors/ - Add a new doctor (Authenticated users only)

exports.createDoctor = async (req, res, next) => {
  try {
    const { name, specialization, email, contact } = req.body;
    const doctor = await Doctor.create({
      name,
      specialization,
      email,
      contact,
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/doctors/ - Retrieve all doctors

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/doctors/<id>/ - Get details of a specific doctor

exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// PUT /api/doctors/<id>/ - Update doctor details

exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/doctors/<id>/ - Delete a doctor record

exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    await Mapping.deleteMany({ doctor: req.params.id });

    res.status(200).json({
      success: true,
      message: "Doctor and related mappings deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
