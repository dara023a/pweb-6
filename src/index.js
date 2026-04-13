import 'dotenv/config';
import { Hono } from 'hono';
import { db } from './db.js';
import { serve } from '@hono/node-server';
import { generateToken } from './utils/jwt.js';
import { jwtMiddleware } from './middlewares/jwt.middleware.js';
import { googleAuthRoute } from './auth/google.js';
import { isAdminMiddleware } from './middlewares/isAdmin.middleware.js';


const app = new Hono();

app.get('/', (c) => c.text('Auth Testing'));

app.post('/login-jwt', async (c) => {
  const { email, password } = await c.req.json();

  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  const user = rows[0];

  if (!user || user.password !== password) {
    return c.json({ message: 'Login gagal' }, 401);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return c.json({ token });
});

app.get('/profile-jwt', jwtMiddleware, (c) => {
  return c.json(c.get('user'));
});

app.get('/admin', jwtMiddleware, isAdminMiddleware, (c) => {
  return c.text('Welcome Admin');
});

app.route('/auth', googleAuthRoute);

serve({
  fetch: app.fetch,
  port: 3000,
});

export default app;