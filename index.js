const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./src/db");

const pagesRouter = require("./src/pages/router");
const authRouter = require("./src/user/router");

const app = express();
const port = 5000;

const static_path = path.join(__dirname, "/public");
const views_path = path.join(__dirname, "/templates/views");
const partials_path = path.join(__dirname, "/templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.use(pagesRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
