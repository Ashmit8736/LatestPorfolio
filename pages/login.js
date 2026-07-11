import { useState } from 'react';

export default function Login() {
  const [pin, setPin] = useState('');
  const [pinEntered, setPinEntered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === process.env.NEXT_PUBLIC_ADMIN_PIN) {
      setPinEntered(true);
      setEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL);
      setPassword(process.env.NEXT_PUBLIC_ADMIN_PASSWORD);
      setError('');
    } else {
      setError('Invalid Security PIN');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) window.location.href = '/admin';
    else setError('Invalid credentials');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
      <div className="max-w-md w-full p-8 rounded-xl bg-white/50/30 backdrop-blur-md border border-white/40 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">{!pinEntered ? 'Security Check' : 'Admin Login'}</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        
        {!pinEntered ? (
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit Security PIN</label>
              <input 
                required 
                type="password" 
                maxLength="6"
                value={pin} 
                onChange={e => setPin(e.target.value)} 
                className="w-full px-4 py-3 text-center tracking-[0.5em] text-xl font-bold border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="••••••" 
              />
            </div>
            <button type="submit" className="w-full font-medium py-3 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-opacity border-0">Verify PIN</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button type="submit" className="w-full font-medium py-2 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-opacity border-0">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}