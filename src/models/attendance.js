import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: { type: Date, default: Date.now },
  isPresent: { type: Boolean, default: false },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
