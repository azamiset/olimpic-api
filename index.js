const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

require('./src/db');
const pagesRouter = require('./src/pages/router');
const authRouter = require('./src/auth/router');

const app = express();
const port = process.env.PORT || 5000;

// console.log(__dirname);
const static_path = path.join(__dirname, "/public");
const views_path = path.join(__dirname, "/templates/views");
const partials_path = path.join(__dirname, "/templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

console.log(process.env.SECRET_KEY);

app.use(pagesRouter);
app.use(authRouter);


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});