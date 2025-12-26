const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    console.log(req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username dan password harus diisi'
      });
    }

    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({
        message: 'User tidak ditemukan'
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: 'Password salah'
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d',
        algorithm: 'HS256' 
      }
    );

    res.json({ 
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        message: 'Username, password, dan role harus diisi'
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hash,
      role
    });

    res.status(201).json({
      message: 'User berhasil didaftarkan'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};