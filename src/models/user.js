// user.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  matricNumber: { type: String, required: true, unique: true },
  programme: {type: String, required: true},
  level: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const User = mongoose.model("users", userSchema);

export default User; // Make sure to export User as the default export
