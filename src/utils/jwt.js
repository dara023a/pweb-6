import jwt from 'jsonwebtoken';

const SECRET = 'secret123';

export function generateToken(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: '1h',
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}