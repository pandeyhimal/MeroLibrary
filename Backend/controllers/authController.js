const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, address, profession } = req.body;
    if (!name || !email || !password || !contact || !address || !profession) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!/^\d{10}$/.test(contact)) {
      return res.status(400).json({ message: 'Contact number must be exactly 10 digits.' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, contact, address, profession });
    await user.save();
    res.status(201).json({ message: 'Registration successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email, contact: user.contact, address: user.address, profession: user.profession } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}; 