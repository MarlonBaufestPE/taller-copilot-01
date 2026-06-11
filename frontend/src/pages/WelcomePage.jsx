import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(to bottom, #ffffff, #E5E7EB)' }}
    >
      {/* Background decorative blobs */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #E0E7FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FFEDD5 0%, transparent 70%)' }}
        />
      </div>

      {/* Top navigation bar */}
      <header
        className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '0.8px solid #E5E7EB',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-8 h-8"
            style={{ background: '#111827', borderRadius: '9999px' }}
          >
            <svg
              width="16"
              height="16"
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
          <span
            className="text-sm font-medium"
            style={{ color: '#111827', fontFamily: 'Inter, sans-serif', letterSpacing: '0.35px' }}
          >
            FlowOps
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="text-sm font-light"
            style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif' }}
          >
            {username}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium transition-all duration-150"
            style={{
              color: '#6B7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.35px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-6 py-16">
        {/* Hero greeting */}
        <div className="text-center mb-16 max-w-2xl">
          <p
            className="text-sm font-medium mb-4 tracking-widest uppercase"
            style={{ color: '#6B7280', letterSpacing: '0.35px' }}
          >
            Panel de control
          </p>
          <h1
            className="font-medium mb-4"
            style={{
              color: '#111827',
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: '1.1',
              letterSpacing: '-0.025em',
            }}
          >
            Hola, <span style={{ color: '#111827' }}>{username}</span>
          </h1>
          <p
            className="text-sm font-light"
            style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif', lineHeight: '22.75px' }}
          >
            Has iniciado sesión correctamente. Bienvenido a FlowOps, tu dashboard de precisión quirúrgica.
          </p>
        </div>

        {/* Stats / info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              label: 'Sesión activa',
              value: 'Autenticado',
              accent: '#E0E7FF',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              label: 'Token expira en',
              value: '5 minutos',
              accent: '#FFEDD5',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ),
              label: 'Usuario',
              value: username,
              accent: '#E5E7EB',
            },
          ].map(({ icon, label, value, accent }) => (
            <div
              key={label}
              className="flex flex-col gap-3 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '0.8px solid #FFFFFF',
                borderRadius: '28px',
                padding: '24px',
                backdropFilter: 'blur(4px)',
                boxShadow:
                  'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.04) 0px 8px 30px 0px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                className="flex items-center justify-center w-10 h-10"
                style={{ background: accent, borderRadius: '12px', color: '#111827' }}
              >
                {icon}
              </div>
              <div>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: '#6B7280', letterSpacing: '0.35px', textTransform: 'uppercase' }}
                >
                  {label}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: '#111827' }}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Microsoft Certifications 2026 */}
        <div className="w-full max-w-5xl mt-16">
          <div className="text-center mb-8">
            <p
              className="text-sm font-medium mb-2 tracking-widest uppercase"
              style={{ color: '#6B7280', letterSpacing: '0.35px' }}
            >
              Microsoft Learn
            </p>
            <h2
              className="font-medium"
              style={{
                color: '#111827',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(22px, 3vw, 32px)',
                lineHeight: '1.2',
                letterSpacing: '-0.015em',
              }}
            >
              Nuevas Certificaciones Microsoft 2026
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                code: 'SC-500',
                title: 'Cloud and AI Security Engineer Associate',
                description:
                  'Nueva certificación que reemplaza AZ-500. Cubre seguridad de entornos cloud e IA, identidad, redes, cómputo y postura de seguridad.',
                badge: 'Nuevo · Jul 2026',
                accent: '#E0E7FF',
                accentText: '#4338CA',
                url: 'https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-500',
              },
              {
                code: 'MS-721',
                title: 'Collaboration Communications Systems Engineer Associate',
                description:
                  'Certificación Microsoft 365 para ingenieros de sistemas de comunicación y colaboración empresarial con Microsoft Teams.',
                badge: 'Actualizado · 2026',
                accent: '#DCFCE7',
                accentText: '#15803D',
                url: 'https://learn.microsoft.com/credentials/certifications/m365-collaboration-communications-systems-engineer/',
              },
              {
                code: 'AI-102',
                title: 'Azure AI Engineer Associate',
                description:
                  'Diseño e implementación de soluciones de IA en Azure usando Azure AI Services, Azure OpenAI y habilidades de IA generativa.',
                badge: 'Actualizado · 2026',
                accent: '#FEF3C7',
                accentText: '#92400E',
                url: 'https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/',
              },
              {
                code: 'DP-600',
                title: 'Fabric Analytics Engineer Associate',
                description:
                  'Implementación y administración de soluciones analíticas de datos con Microsoft Fabric, incluyendo lakehouses y pipelines.',
                badge: 'Microsoft Fabric · 2026',
                accent: '#FCE7F3',
                accentText: '#9D174D',
                url: 'https://learn.microsoft.com/credentials/certifications/fabric-analytics-engineer-associate/',
              },
            ].map(({ code, title, description, badge, accent, accentText, url }) => (
              <a
                key={code}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 transition-all duration-300 no-underline"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: '0.8px solid #E5E7EB',
                  borderRadius: '20px',
                  padding: '24px',
                  backdropFilter: 'blur(4px)',
                  boxShadow:
                    'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.04) 0px 8px 30px 0px',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-2 py-1"
                    style={{
                      background: accent,
                      color: accentText,
                      borderRadius: '8px',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {code}
                  </span>
                  <span
                    className="text-xs font-light"
                    style={{ color: '#9CA3AF', letterSpacing: '0.3px' }}
                  >
                    {badge}
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: '#111827', fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-xs font-light"
                    style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
                  >
                    {description}
                  </p>
                </div>
                <p
                  className="text-xs font-medium mt-auto"
                  style={{ color: accentText, letterSpacing: '0.3px' }}
                >
                  Ver certificación →
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* CTA / logout */}
        <div className="mt-12">
          <button
            onClick={handleLogout}
            className="px-8 py-3 text-sm font-medium transition-all duration-150"
            style={{
              background: 'none',
              color: '#6B7280',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.35px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
          >
            ← Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
