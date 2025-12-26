import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
    message: 'Token tidak ada'
    });
  }

  const token = authHeader.split(' ')[1];

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });

    req.user = user;
    next();
  });
};