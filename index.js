import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import bodyParser from "body-parser";
import { router as userRoutes } from "./routes/userRoutes.js";
import connectToDatabase from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.json());

connectToDatabase();

app.get("/login", (req, res) => {
  res.render("login"); 
});

app.get("/signup", (req, res) => {
  res.render("signup"); 
});

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
