import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';
import { verifyPKCE } from './lib/pkce';
import { userStore } from './lib/user-store';

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'pasadium-super-secret-key';

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store for auth codes
const authCodes = new Map<string, { 
  userId: string, 
  challenge: string, 
  method: string, 
  expiresAt: number 
}>();

/**
 * GET /login
 * Render a simple login form
 */
app.get('/login', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PASADIUM Login</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f4f9; margin: 0; }
          .login-card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 320px; }
          h2 { margin-top: 0; color: #333; text-align: center; }
          input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
          button { width: 100%; padding: 12px; background: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
          button:hover { background: #0051ad; }
        </style>
      </head>
      <body>
        <div class="login-card">
          <h2>PASADIUM</h2>
          <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

/**
 * POST /login
 * Verify credentials and redirect to /authorize
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userStore.verifyPassword(username, password);

  if (!user) {
    return res.status(401).send('Invalid credentials. <a href="/login">Try again</a>');
  }

  // Store user in session (simulated by cookie for this blueprint)
  res.cookie('pasadium_user', user.id, { httpOnly: true });
  res.redirect('/authorize');
});

/**
 * GET /authorize
 * OIDC Authorization Endpoint
 */
app.get('/authorize', async (req, res) => {
  const { client_id, response_type, redirect_uri, code_challenge, code_challenge_method, state } = req.query;
  
  const userId = req.cookies?.pasadium_user;
  if (!userId) {
    return res.redirect('/login');
  }

  if (!client_id || response_type !== 'code' || !redirect_uri) {
    return res.status(400).send('Missing required parameters');
  }

  const code = uuidv4();
  authCodes.set(code, {
    userId,
    challenge: (code_challenge as string) || '',
    method: (code_challenge_method as string) || 'plain',
    expiresAt: Date.now() + 60 * 10000, // 10 mins
  });

  const redirectUrl = `${redirect_uri}?code=${code}${state ? `&state=${state}` : ''}`;
  res.redirect(redirectUrl);
});

/**
 * POST /token
 * OIDC Token Endpoint
 */
app.post('/token', async (req, res) => {
  const { grant_type, code, code_verifier, client_id } = req.body;

  if (grant_type !== 'authorization_code' || !code) {
    return res.status(400).json({ error: 'invalid_request' });
  }

  const authData = authCodes.get(code);
  if (!authData || Date.now() > authData.expiresAt) {
    return res.status(400).json({ error: 'invalid_grant' });
  }

  // Verify PKCE
  if (!verifyPKCE(code_verifier as string, authData.challenge, authData.method)) {
    return res.status(400).json({ error: 'invalid_grant', message: 'PKCE verification failed' });
  }

  // Generate JWT
  const user = await userStore.findById(authData.userId);
  if (!user) return res.status(500).json({ error: 'server_error' });

  const token = jwt.sign(
    { 
      sub: user.id, 
      username: user.username, 
      roles: user.roles 
    }, 
    JWT_SECRET, 
    { expiresIn: '1h' }
  );

  authCodes.delete(code);

  res.json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: uuidv4(),
  });
});

/**
 * GET /userinfo
 * Protected UserInfo Endpoint
 */
app.get('/userinfo', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await userStore.findById(decoded.sub);
    if (!user) return res.status(404).json({ error: 'user_not_found' });
    
    res.json({
      sub: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    });
  } catch (err) {
    res.status(401).json({ error: 'invalid_token' });
  }
});

app.listen(port, () => {
  console.log(`PASADIUM Auth Service running at http://localhost:${port}`);
});
