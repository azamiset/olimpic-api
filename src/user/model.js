const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sKey = process.env.SECRET_KEY;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Generating tokens
userSchema.methods.generateAuthToken = async function () {
  try {
    const myToken = jwt.sign({ _id: this._id.toString() }, sKey);

    this.tokens = this.tokens.concat({ token: myToken });
    await this.save();

    return myToken;
  } catch (err) {
    res.send("the error part " + err);
  }
};

// Converting password into hash
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.password, 10);
  }

  next();
});

const User = new model("User", userSchema);

module.exports = User;
