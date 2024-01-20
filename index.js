import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render("login", {title: "Login"})
})
app.get("/signup", (req, res) => {
    res.render("signup")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
