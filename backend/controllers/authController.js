
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const STATIC_PASSCODE = '000000'; 

const sendPasscodeEmail = async (email, passcode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your 6-Digit Passcode',
    text: `Your passcode is: ${passcode}`
  };

  await transporter.sendMail(mailOptions);
};

const requestPasscode = async (req, res) => {
  const { email } = req.body;
  
  try {
    await sendPasscodeEmail(email, STATIC_PASSCODE);
    res.status(200).json({ message: 'Passcode sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending passcode', error });
  }
};

const verifyPasscode = (req, res) => {
  const { passcode } = req.body;

  if (passcode === STATIC_PASSCODE) {
    res.status(200).json({ message: 'Passcode verified' });
  } else {
    res.status(400).json({ message: 'Invalid passcode' });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = {
  register,
  login,
  requestPasscode,
  verifyPasscode
};
