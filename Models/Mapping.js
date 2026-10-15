const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
    },
  },
  {
    timestamps: true,
  }
);


mappingSchema.index({ patient: 1, doctor: 1 }, { unique: true });

module.exports = mongoose.model("Mapping", mappingSchema);