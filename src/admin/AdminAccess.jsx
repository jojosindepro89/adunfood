import React, { useEffect, useState } from 'react';
import { KeyRound, LoaderCircle, LockKeyhole } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

export default function AdminAccess({ onExit }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/admin-session', { credentials: 'same-origin', cache: 'no-store' })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok && response.status !== 503) throw new Error(data.error || 'Could not verify the admin session.');
        setAuthenticated(Boolean(data.authenticated));
        if (response.status === 503) setError(data.error || 'Admin login is not configured yet.');
      })
      .catch(() => setError('Admin login needs the Vercel API deployment to be available.'))
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await fetch('/api/admin-session', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
      setPassword('');
      setAuthenticated(true);
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in.');
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin-session', { method: 'DELETE', credentials: 'same-origin' }).catch(() => {});
    setAuthenticated(false);
    onExit();
  };

  if (checking) return <div className="admin-auth-screen"><LoaderCircle className="admin-auth-spinner" size={28} /><span>Checking secure session…</span></div>;
  if (authenticated) return <AdminDashboard onLogout={handleLogout} />;

  return (
    <main className="admin-auth-screen">
      <section className="admin-auth-card" aria-labelledby="admin-login-title">
        <div className="admin-auth-brand"><span className="admin-auth-mark">À</span><span>Àdùn <small>KITCHEN</small></span></div>
        <div className="admin-auth-icon"><LockKeyhole size={22} /></div>
        <p className="admin-auth-eyebrow">PRIVATE AREA</p>
        <h1 id="admin-login-title">Kitchen sign in</h1>
        <p className="admin-auth-copy">Sign in with your administrator password to manage the menu and orders.</p>
        <form onSubmit={handleLogin} className="admin-auth-form">
          <label htmlFor="admin-password">Administrator password</label>
          <div className="admin-password-field"><KeyRound size={17} /><input id="admin-password" type="password" autoComplete="current-password" required maxLength={256} value={password} onChange={(event) => setPassword(event.target.value)} /></div>
          {error && <p className="admin-auth-error" role="alert">{error}</p>}
          <button type="submit" disabled={busy || !password}>{busy ? 'Signing in…' : 'Sign in securely'}</button>
        </form>
        <button className="admin-auth-back" type="button" onClick={onExit}>← Back to Àdùn Kitchen</button>
      </section>
    </main>
  );
}
