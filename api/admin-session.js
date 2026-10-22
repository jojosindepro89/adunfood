import { createHmac, createHash, timingSafeEqual } from 'node:crypto';

const COOKIE = 'adun_admin_session';
const SESSION_SECONDS = 60 * 60 * 8;

function signature(value, secret) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function isValidSession(req, secret) {
  const cookies = Object.fromEntries((req.headers.cookie || '').split(';').map((part) => {
    const index = part.indexOf('=');
    return index < 0 ? ['', ''] : [part.slice(0, index).trim(), part.slice(index + 1).trim()];
  }));
  const [expiresAt, suppliedSignature] = (cookies[COOKIE] || '').split('.');
  if (!/^\d+$/.test(expiresAt || '') || Number(expiresAt) <= Math.floor(Date.now() / 1000) || !suppliedSignature) return false;
  const expected = signature(expiresAt, secret);
  const suppliedHash = createHash('sha256').update(suppliedSignature).digest();
  const expectedHash = createHash('sha256').update(expected).digest();
  return timingSafeEqual(suppliedHash, expectedHash);
}

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Cookie');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  const secret = process.env.ADMIN_SESSION_SECRET;
  const password = process.env.ADMIN_PASSWORD;

  if (!secret || Buffer.byteLength(secret) < 32 || !password || password.length < 12) {
    return res.status(503).json({ authenticated: false, error: 'Admin login is not configured. Set a password of at least 12 characters and a session secret of at least 32 bytes.' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ authenticated: isValidSession(req, secret) });
  }

  if (req.method === 'POST') {
    const submitted = typeof req.body?.password === 'string' ? req.body.password : '';
    if (submitted.length > 256) return res.status(401).json({ error: 'Incorrect password.' });
    const submittedHash = createHash('sha256').update(submitted).digest();
    const passwordHash = createHash('sha256').update(password).digest();
    if (!timingSafeEqual(submittedHash, passwordHash)) return res.status(401).json({ error: 'Incorrect password.' });

    const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
    const token = `${expiresAt}.${signature(expiresAt, secret)}`;
    res.setHeader('Set-Cookie', `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_SECONDS}`);
    return res.status(200).json({ authenticated: true });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
    return res.status(200).json({ authenticated: false });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'Method not allowed.' });
}
