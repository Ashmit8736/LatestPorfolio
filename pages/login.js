import { useState } from 'react';

export default function Login() {
  const [pin, setPin] = useState('');
  const [pinEntered, setPinEntered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verifyingPin, setVerifyingPin] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setVerifyingPin(true);
    setError('');
    // Tiny delay so the loading state is visible even though the check itself is instant
    setTimeout(() => {
      if (pin === process.env.NEXT_PUBLIC_ADMIN_PIN) {
        setPinEntered(true);
        setEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL);
        setPassword(process.env.NEXT_PUBLIC_ADMIN_PASSWORD);
      } else {
        setError('Invalid Security PIN');
      }
      setVerifyingPin(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoggingIn(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        window.location.href = '/admin';
        return;
      }
      setError('Invalid credentials');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream text-ink font-sans relative overflow-hidden px-4 selection:bg-accent/40">
      {/* Hero section jaise amber glow */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 -left-4 w-96 h-96 bg-accent rounded-full mix-blend-multiply blur-[150px] opacity-25" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 right-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply blur-[150px] opacity-25" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6 font-heading font-extrabold text-xl tracking-wide text-ink">
          <span className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-ink text-sm">A</span>
          Ashmit.
        </div>

        <div className="admin-card p-8 sm:p-10">
          <p className="admin-eyebrow justify-center">{!pinEntered ? 'Step 1 of 2' : 'Step 2 of 2'}</p>
          <h2 className="admin-title text-center mb-8">{!pinEntered ? 'Security Check' : 'Admin Login'}</h2>
          {error && (
            <p className="mb-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-center text-sm font-semibold text-danger">{error}</p>
          )}

          {!pinEntered ? (
            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div>
                <label className="admin-label text-center">Enter 6-digit Security PIN</label>
                <input
                  required
                  type="password"
                  maxLength="6"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="admin-input text-center text-2xl tracking-[0.5em] font-heading"
                  placeholder="••••••"
                />
              </div>
              <button type="submit" disabled={verifyingPin} className="admin-btn admin-btn-primary admin-btn-block">
                {verifyingPin ? 'Verifying…' : 'Verify PIN'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="admin-label">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="admin-input" disabled={loggingIn} />
              </div>
              <div>
                <label className="admin-label">Password</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="admin-input" disabled={loggingIn} />
              </div>
              <button type="submit" disabled={loggingIn} className="admin-btn admin-btn-primary admin-btn-block">
                {loggingIn ? 'Logging in…' : 'Login'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
