const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const twilio = require("twilio");

// Twilio Config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

// Generate a 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register User
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateCode();

    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      verificationCode,
    });

    // Send SMS Verification Code
    await client.messages.create({
      body: `Your KenyorkZenia Group verification code is: ${verificationCode}`,
      from: twilioPhone,
      to: phoneNumber,
    });

    res.status(201).json({ message: "User registered. Check your SMS for the verification code." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = null; // Clear the code
      await user.save();
      res.json({ message: "Verification successful" });
    } else {
      res.status(400).json({ message: "Invalid verification code" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "User not found or not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
