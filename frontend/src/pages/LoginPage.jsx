import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/welcome', { replace: true });
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(to bottom, #ffffff, #E5E7EB)' }}
    >
      {/* Background decorative blobs */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #E0E7FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FFEDD5 0%, transparent 70%)' }}
        />
      </div>

      {/* Card shell (gradient border treatment) */}
      <div
        className="relative w-full max-w-sm mx-4"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, rgba(0,0,0,0) 1px)',
          borderRadius: '32px',
          padding: '1px',
        }}
      >
        {/* Card surface */}
        <div
          className="relative bg-white/90 backdrop-blur-sm"
          style={{
            borderRadius: '32px',
            padding: '40px 32px',
            boxShadow:
              'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px',
            border: '0.8px solid #FFFFFF',
          }}
        >
          {/* Logo / brand mark */}
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center justify-center w-12 h-12"
              style={{
                background: '#111827',
                borderRadius: '9999px',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.3 4.7 3.2 5.9L8 22h8l-1.2-8.1C16.7 12.7 18 10.5 18 8c0-3.5-2.5-6-6-6z" />
              </svg>
            </div>
          </div>

          {/* Headings */}
          <div className="mb-8 text-center">
            <h1
              className="text-2xl font-medium mb-1"
              style={{ color: '#111827', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.025em' }}
            >
              Bienvenido
            </h1>
            <p
              className="text-sm font-light"
              style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif', lineHeight: '22.75px' }}
            >
              Inicia sesión para continuar
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="mb-5 px-4 py-3 text-sm font-light text-center"
              style={{
                background: '#FEF2F2',
                borderRadius: '16px',
                color: '#B91C1C',
                border: '0.8px solid #FECACA',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
                style={{ color: '#111827', letterSpacing: '0.35px' }}
              >
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                placeholder="admin"
                className="w-full px-4 py-3 text-sm font-light outline-none transition-all duration-150"
                style={{
                  background: '#F9FAFB',
                  border: '0.8px solid #E5E7EB',
                  borderRadius: '16px',
                  color: '#111827',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={(e) => (e.target.style.border = '1.6px solid #6496FF')}
                onBlur={(e) => (e.target.style.border = '0.8px solid #E5E7EB')}
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
                style={{ color: '#111827', letterSpacing: '0.35px' }}
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm font-light outline-none transition-all duration-150"
                style={{
                  background: '#F9FAFB',
                  border: '0.8px solid #E5E7EB',
                  borderRadius: '16px',
                  color: '#111827',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={(e) => (e.target.style.border = '1.6px solid #6496FF')}
                onBlur={(e) => (e.target.style.border = '0.8px solid #E5E7EB')}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-medium transition-all duration-150 disabled:opacity-60"
              style={{
                background: '#111827',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.35px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Iniciando sesión…' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Footer note */}
          <p
            className="mt-6 text-center text-xs font-light"
            style={{ color: '#6B7280' }}
          >
            FlowOps · Surgical Precision
          </p>
        </div>
      </div>
    </div>
  );
}
