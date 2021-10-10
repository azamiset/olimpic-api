const User = require('./model')
const bcrypt = require('bcryptjs');

function signup(req, res) {
  res.render('register');
}

async function register(req, res) {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const register = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
      });

      console.log('the succes part ' + register);

      const token = await register.generateAuthToken();
      console.log('the token part ' + token);

      const user = await register.save();
      console.log('the page part ' + user);

      res.status(201).render('index');

    } else {
      res.send('Password are not matching!');
    }

  } catch (error) {
    res.status(400).send(error);
    console.log('the error part page');
  }
}

function signin(req, res) {
  res.render('login');
}

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userLogin = await User.findOne({ email: email });
    console.log('User Login: ', userLogin);

    const isMatch = bcrypt.compare(password, userLogin.password);

    const token = await userLogin.generateAuthToken();
    console.log(`the token part ${token}`);

    if (isMatch) {
      res.status(201).render('index');
    } else {
      res.send('Invalid password details!');
    }

  } catch (e) {
    res.status(404).send('User is not found!');
  }
}


module.exports = { signup, register, signin, login };