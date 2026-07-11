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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
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
            <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition">Verify PIN</button>
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
            <button type="submit" className="w-full bg-gray-900 text-white font-medium py-2 rounded-lg hover:bg-black transition">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}