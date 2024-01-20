const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  matricNumber: { type: String, required: true, unique: true },
  level: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  attendanceRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
