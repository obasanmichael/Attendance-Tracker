import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const attendanceSchema = new mongoose.Schema({
  studentName: String,
  course: String,
  level: String,
  date: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

app.post("/mark-attendance", async (req, res) => {
  try {
    const { studentName, course, level } = req.body;
    await Attendance.create({ studentName, course, level });
    res.status(200).send("Attendance marked successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get-attendance", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().sort({ date: "desc" });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
