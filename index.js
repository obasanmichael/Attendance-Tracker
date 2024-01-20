import express from "express";
import bodyParser from "body-parser";
import { router as userRoutes } from "./routes/userRoutes.js"; // Import as a named export
import connectToDatabase from "./config/database.js";
import User from "./src/models/user.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());



connectToDatabase()

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
