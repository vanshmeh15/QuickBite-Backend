import userModel from "../models/User_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login User
const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    return res.json({success:false,message:"Some Error Occured"})
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register User

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Checking if the user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      res.json({
        success: false,
        Message: "User with this email already exists.",
      });
    }
    //Validating email and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong Password.",
      });
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "There's an error." });
  }
};

export { loginuser, registerUser };
