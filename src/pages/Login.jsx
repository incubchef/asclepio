import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Login.module.css'

const DEMO_USERS = [
  { label: 'Profesional',  email: 'medico@asclepios.io',   color: '#14b8a6' },
  { label: 'Inversor',     email: 'inversor@asclepios.io', color: '#3b82f6' },
  { label: 'Empresa',      email: 'empresa@asclepios.io',  color: '#f59e0b' },
]

export default function Login() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { login, loading, error, clearError } = useAuth()

  const from = location.state?.from?.pathname || '/'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate(from, { replace: true })
  }

  function fillDemo(demoEmail) {
    clearError()
    setEmail(demoEmail)
    setPassword('demo123')
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgBlob1} aria-hidden />
      <div className={styles.bgBlob2} aria-hidden />
      <div className={styles.bgBlob3} aria-hidden />

      <div className={styles.card}>
        {/* ── Left panel ── */}
        <div className={styles.left}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>A</div>
            <div>
              <div className={styles.brandName}>Asclepios</div>
              <div className={styles.brandSub}>Healthcare Investment</div>
            </div>
          </div>

          <div className={styles.leftBody}>
            <h2 className={styles.leftTitle}>
              Donde la ciencia<br />
              <em>encuentra al capital.</em>
            </h2>
            <p className={styles.leftDesc}>
              Plataforma cerrada de inversión healthcare. Evaluación científica colaborativa, rankings dinámicos y deal flow curado por expertos del sector.
            </p>
          </div>

          <div className={styles.features}>
            {[
              { icon: '🔬', text: 'Evaluación por expertos reales' },
              { icon: '📊', text: 'Rankings científicos ponderados' },
              { icon: '🔒', text: 'Comunidad privada y confidencial' },
            ].map(f => (
              <div key={f.text} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className={styles.right}>
          <h1 className={styles.formTitle}>Bienvenido</h1>
          <p className={styles.formSub}>Accede a tu cuenta Asclepios</p>

          {/* Demo shortcuts */}
          <div className={styles.demoBox}>
            <div className={styles.demoLabel}>Acceso demo rápido</div>
            <div className={styles.demoBtns}>
              {DEMO_USERS.map(d => (
                <button
                  key={d.email}
                  type="button"
                  className={styles.demoBtn}
                  onClick={() => fillDemo(d.email)}
                >
                  <span className={styles.demoDot} style={{ background: d.color }} />
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider}><span>o accede con tu cuenta</span></div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="tu@email.com"
                value={email}
                onChange={e => { clearError(); setEmail(e.target.value) }}
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Contraseña</label>
              <div className={styles.pwWrap}>
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="········"
                  value={password}
                  onChange={e => { clearError(); setPassword(e.target.value) }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.pwToggle}
                  onClick={() => setShowPw(v => !v)}
                  tabIndex={-1}
                  aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPw ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : null}
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className={styles.switchLink}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" className={styles.link}>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
