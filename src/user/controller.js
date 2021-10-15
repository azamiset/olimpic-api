const User = require('./model')
const bcrypt = require('bcryptjs');

function signup(req, res) {
  if (req.cookies.jwt == undefined) {
    return res.render('register');
  }
  res.redirect('/');
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

      await register.generateAuthToken();
      // res.cookie('jwt', token, {
      //   expires: new Date(Date.now() + 300000),
      //   httpOnly: true
      // });
      await register.save();
      return res.redirect('/login');

    } else {
      res.send('Password are not matching!');
    }

  } catch (error) {
    res.status(400).send(error);

  }
}

function signin(req, res) {
  if (req.cookies.jwt == undefined) {
    return res.render('login');
  }

  res.redirect('/');
}

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userLogin = await User.findOne({ email: email });
    const isMatch = bcrypt.compare(password, userLogin.password);

    const token = await userLogin.generateAuthToken();

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 5000000),
      httpOnly: true
    });

    if (isMatch) {
      return res.redirect('/');

    } else {
      res.send('Invalid password details!');
    }

  } catch (e) {
    res.status(404).send('User is not found!');
  }
}

async function logout(req, res) {
  try {
    console.log(req.user);

    req.user.tokens = req.user.tokens.filter((object) =>{
      return object.token !== req.token;
    })

    res.clearCookie("jwt");

    await req.user.save();
    res.render('login')

  } catch (error) {
    res.status(500).send(error);
  }
}


module.exports = { signup, register, signin, login, logout };