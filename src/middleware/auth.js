const jwt = require("jsonwebtoken");
const User = require("../user/model");

const sKey = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token === undefined ) return res.redirect("login");
      
    const verify = jwt.verify(token, sKey);
    user = await User.findOne({_id: verify._id})

    req.token = token;
    req.user = user;
      
    if (user) next();

  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
