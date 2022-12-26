const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

router.post("/signup", async (req, res) => {
  try {
    //accepts name , email , password
    const { name, email, password, isSeller } = req.body;

    // validate all =>  NO => 500 wrong information
    if (!validateName(name)) {
      return res.status(400).json({ err: "Invalid Name" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Invalid Email" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ err: "Invalid Password" });
    }

    // YES =>
    // check userExist => yes => 500 user already exists
    const existingUser = await User.findOne({ where: { email } });

    console.log("allo ", existingUser);
    if (existingUser) {
      return res.status(500).send("User already exists ");
    }

    // no =>
    // password encryption
    const hashedPassword = await bcrypt.hash(password, 2);
    // create new user , save to DB
    const user = {
      name,
      email,
      isSeller,
      password: hashedPassword,
    };
    const createdUser = await User.create(user);
    //send res 200 ok use saved succefully
    res.status(201).send("user created succefully");
  } catch (e) {
    return res.status(500).json({
      message: `there is some problem`,
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    //accepts email , password
    const { email, password } = req.body;

    // validate all =>  NO => 500 wrong information
    if (!validateEmail(email)) {
      return res.status(500).send("Invalid Email");
    }
    if (!validatePassword(password)) {
      return res.status(500).send("Invalid Password");
    }
    //yes =>
    // check userExists
    const userExist = await User.findOne({ where: { email } });

    //    => NO => 500 user Doesn't exists
    if (!userExist) {
      return res.status(500).send(" user Doesn't exist. Please sign Up!");
    }

    // yes => check the password
    const hash = userExist.password;
    const correctPassword = await bcrypt.compare(password, hash);

    //    => NO => password is wrong
    if (!correctPassword) {
      return res.status(500).send("email or password is incorrect");
    }
    // yes => send res you are signed in
    return res.status(200).send("you are signed in");
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
