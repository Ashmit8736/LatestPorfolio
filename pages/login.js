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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-300 text-white relative overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/40 blur-3xl animate-float1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/40 blur-3xl animate-float2"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-pink-400/30 blur-3xl animate-float3"></div>
      </div>

      <div className="max-w-md w-full p-8 rounded-2xl bg-[#111111]  border border-[#333] shadow-2xl relative z-10">
        <h2 className="text-3xl font-heading font-normal tracking-wider text-center mb-8">{!pinEntered ? 'Security Check' : 'Admin Login'}</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        
        {!pinEntered ? (
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 font-semibold mb-1">Enter 6-digit Security PIN</label>
              <input 
                required 
                type="password" 
                maxLength="6"
                value={pin} 
                onChange={e => setPin(e.target.value)} 
                className="w-full px-4 py-3 text-center tracking-[0.5em] text-xl font-heading font-normal tracking-wider border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="••••••" 
              />
            </div>
            <button type="submit" className="w-full font-medium py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all">Verify PIN</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#111111] text-black font-medium" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#111111] text-black font-medium" />
            </div>
            <button type="submit" className="w-full font-medium py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}