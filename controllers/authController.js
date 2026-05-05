const jwt = require('jsonwebtoken');

// In-memory mock database
const users = [];

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  
  res.cookie('jwt', token, cookieOptions);

  const userCopy = { ...user };
  delete userCopy.password;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: userCopy,
    },
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In a real app, hash this
      createdAt: new Date()
    };
    users.push(newUser);
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
  res.status(200).json({ status: 'success' });
};

exports.getMe = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user },
  });
};

// Mock protection middleware update
exports.mockProtect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token === 'loggedout') {
    return res.status(401).json({ status: 'fail', message: 'Not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ status: 'fail', message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', message: 'Invalid token' });
  }
};
