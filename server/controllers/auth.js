import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { userModel } from "../model/userModel.js";

export async function registerUser(req, res) {
  try {
    const { fullName, emailAddress, password, confirmPassword, phoneNumber } =
      req.body;
    const existingUser = await userModel.findOne({ emailAddress });
    if (existingUser) {
      return res.json({
        message: "emailAddress is already exist",
        status: false,
      });
    }
    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        userName: fullName,
        emailAddress: emailAddress,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        city:"64972aa33d1974b584d27cba"
      });
      const validationError = newUser.validateSync();
      if (validationError) {
        throw new Error(validationError.message);
      }
      await newUser.save();
      res
        .status(200)
        .json({ message: "User registered successfully", status: true });
    } else {
      return res
        .status(400)
        .json({ message: "Password mismatch", status: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function googleLogin(req, res) {
  try {
    const { email, family_name, given_name } = req.body;
    const user = await userModel.findOne({ emailAddress: email });
    if (user) {
      const token =await generateToken(user._id);
      res
        .status(200)
        .json({ token, message: "Login successful", status: true });
    } else {
      const newUser = new userModel({
        userName: given_name + family_name,
        emailAddress: email,
        city:"64972aa33d1974b584d27cba"
      });
      const validationError = newUser.validateSync();

      if (validationError) {
        throw new Error(validationError.message);
      }

      await newUser.save();
      console.log(newUser,5656566);
      const token =await generateToken(newUser._id);
      res
        .status(200)
        .json({ token, message: "Login successful", status: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login" });
  }
}

export async function loginUser(req, res) {
  try {
    const { emailAddress, password } = req.body;
    const user = await userModel.findOne({ emailAddress });
    if (!user) {
      return res.json({ message: "wrong email", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid password", status: false });
    }
    const token =await generateToken(user._id);
    res.status(200).json({ token, message: "Login successful", status: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
}

export function Auth(req, res) {
  console.log(req.user);
  res.json({ message: "yes", status: true });
}
