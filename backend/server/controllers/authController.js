const jwt = require('jsonwebtoken');
const User = require('../models/User');
const publicUser = user => ({ id: user._id, name: user.name, email: user.email, role: user.role });
const makeToken = user => jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: makeToken(user), user: publicUser(user) });
  } catch (error) { res.status(error.code === 11000 ? 400 : 500).json({ message: error.code === 11000 ? 'Email is already registered' : error.message }); }
}
async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password || ''))) return res.status(401).json({ message: 'Email or password is incorrect' });
  res.json({ token: makeToken(user), user: publicUser(user) });
}
const me = (req, res) => res.json({ user: publicUser(req.user) });
module.exports = { register, login, me };
