import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Register.module.css'

const ROLES = [
  {
    id: 'profesional',
    label: 'Profesional sanitario',
    desc: 'Médico, científico, investigador o técnico del sector salud. Evalúas compañías y accedes a contenido científico.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    color: '#14b8a6',
    fields: ['specialty'],
  },
  {
    id: 'inversor',
    label: 'Inversor',
    desc: 'Business angel, VC o family office. Accedes a rankings, evaluaciones y oportunidades de inversión.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    color: '#3b82f6',
    fields: [],
  },
  {
    id: 'empresa',
    label: 'Empresa / Startup',
    desc: 'Startup o empresa healthcare. Subes tu perfil, recibes evaluaciones científicas y ganas visibilidad.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18M3 9h6M3 15h6"/>
      </svg>
    ),
    color: '#f59e0b',
    fields: [],
  },
]

const SPECIALTIES = [
  'Oncología', 'Cardiología', 'Neurología', 'Inmunología',
  'Medicina Interna', 'Cirugía', 'Diagnóstico por imagen',
  'Bioquímica', 'Biotecnología', 'Farmacología', 'Otra',
]

const STEPS = ['Datos', 'Rol', 'Términos']

export default function Register() {
  const navigate = useNavigate()
  const { register, loading, error, clearError } = useAuth()

  const [step, setStep] = useState(0)

  // Form state
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [password2, setPassword2] = useState('')
  const [showPw,    setShowPw]    = useState(false)
  const [role,      setRole]      = useState('')
  const [specialty, setSpecialty] = useState('')
  const [acceptPrivacy,        setAcceptPrivacy]        = useState(false)
  const [acceptConfidentiality, setAcceptConfidentiality] = useState(false)
  const [acceptNoConflict,     setAcceptNoConflict]     = useState(false)

  const [localError, setLocalError] = useState('')

  function showErr(msg) { setLocalError(msg); clearError() }
  function clearErr()   { setLocalError(''); clearError() }

  const displayError = localError || error

  // ── Step validation ──────────────────────────────────────────────────────
  function validateStep0() {
    if (!name.trim())           { showErr('Introduce tu nombre completo.'); return false }
    if (!email.trim())          { showErr('Introduce tu email.'); return false }
    if (password.length < 6)    { showErr('La contraseña debe tener al menos 6 caracteres.'); return false }
    if (password !== password2) { showErr('Las contraseñas no coinciden.'); return false }
    return true
  }

  function validateStep1() {
    if (!role)                                              { showErr('Selecciona un tipo de cuenta.'); return false }
    if (role === 'profesional' && !specialty)              { showErr('Selecciona tu especialidad.'); return false }
    return true
  }

  function validateStep2() {
    if (!acceptPrivacy)         { showErr('Debes aceptar la política de privacidad.'); return false }
    if (!acceptConfidentiality) { showErr('Debes aceptar el acuerdo de confidencialidad.'); return false }
    if (role === 'profesional' && !acceptNoConflict) {
      showErr('Debes confirmar la ausencia de conflicto de interés.'); return false
    }
    return true
  }

  function goNext() {
    clearErr()
    if (step === 0 && !validateStep0()) return
    if (step === 1 && !validateStep1()) return
    setStep(s => s + 1)
  }

  function goBack() { clearErr(); setStep(s => s - 1) }

  async function handleSubmit() {
    clearErr()
    if (!validateStep2()) return

    const ok = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      specialty,
      acceptedPrivacy: acceptPrivacy,
      acceptedConfidentiality: acceptConfidentiality,
    })

    if (ok) navigate('/', { replace: true })
  }

  const selectedRole = ROLES.find(r => r.id === role)

  return (
    <div className={styles.page}>
      <div className={styles.bgBlob1} aria-hidden />
      <div className={styles.bgBlob2} aria-hidden />

      <div className={styles.card}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>A</div>
            <div className={styles.brandName}>Asclepios</div>
          </div>
          <Link to="/login" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Iniciar sesión
          </Link>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
          {STEPS.map((s, i) => (
            <div key={s} className={styles.stepItem}>
              <div className={`${styles.stepDot} ${i < step ? styles.stepDone : ''} ${i === step ? styles.stepActive : ''}`}>
                {i < step ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ''}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
            </div>
          ))}
        </div>

        {/* Error */}
        {displayError && (
          <div className={styles.errorBox}>{displayError}</div>
        )}

        {/* ── Step 0: Datos personales ── */}
        {step === 0 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Crea tu cuenta</h2>
            <p className={styles.stepSub}>Datos de acceso a la plataforma</p>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Nombre completo</label>
                <input
                  id="name"
                  className={styles.input}
                  type="text"
                  placeholder="Dr. Ana García"
                  value={name}
                  onChange={e => { clearErr(); setName(e.target.value) }}
                  autoComplete="name"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-email">Correo electrónico</label>
                <input
                  id="reg-email"
                  className={styles.input}
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => { clearErr(); setEmail(e.target.value) }}
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-pw">Contraseña</label>
                <div className={styles.pwWrap}>
                  <input
                    id="reg-pw"
                    className={styles.input}
                    type={showPw ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={e => { clearErr(); setPassword(e.target.value) }}
                    autoComplete="new-password"
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    className={styles.pwToggle}
                    onClick={() => setShowPw(v => !v)}
                    tabIndex={-1}
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

              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-pw2">Confirmar contraseña</label>
                <input
                  id="reg-pw2"
                  className={styles.input}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Repite la contraseña"
                  value={password2}
                  onChange={e => { clearErr(); setPassword2(e.target.value) }}
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Selección de rol ── */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>¿Cuál es tu perfil?</h2>
            <p className={styles.stepSub}>Define tu tipo de cuenta — determina qué puedes hacer en la plataforma</p>

            <div className={styles.roleGrid}>
              {ROLES.map(r => (
                <div
                  key={r.id}
                  className={`${styles.roleCard} ${role === r.id ? styles.roleCardActive : ''}`}
                  style={{ '--role-color': r.color }}
                  onClick={() => { clearErr(); setRole(r.id) }}
                >
                  <div className={styles.roleIcon} style={{ color: r.color, background: `${r.color}18` }}>
                    {r.icon}
                  </div>
                  <div className={styles.roleLabel}>{r.label}</div>
                  <div className={styles.roleDesc}>{r.desc}</div>
                  {role === r.id && (
                    <div className={styles.roleCheck} style={{ background: r.color }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Specialty field for profesional */}
            {role === 'profesional' && (
              <div className={styles.field} style={{ marginTop: 20 }}>
                <label className={styles.label} htmlFor="specialty">Especialidad principal</label>
                <select
                  id="specialty"
                  className={styles.input}
                  value={specialty}
                  onChange={e => { clearErr(); setSpecialty(e.target.value) }}
                >
                  <option value="">Selecciona tu especialidad...</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Términos y privacidad ── */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Términos y privacidad</h2>
            <p className={styles.stepSub}>Necesitamos tu aceptación para acceder a la plataforma</p>

            <div className={styles.termsBox}>
              <CheckItem
                id="privacy"
                checked={acceptPrivacy}
                onChange={v => { clearErr(); setAcceptPrivacy(v) }}
                required
              >
                He leído y acepto la <span className={styles.termLink}>Política de Privacidad</span> y el tratamiento de mis datos personales conforme al RGPD.
              </CheckItem>

              <CheckItem
                id="confidentiality"
                checked={acceptConfidentiality}
                onChange={v => { clearErr(); setAcceptConfidentiality(v) }}
                required
              >
                Acepto el <span className={styles.termLink}>Acuerdo de Confidencialidad</span>. Todo el contenido de la plataforma es estrictamente privado y no puede ser compartido fuera de Asclepios.
              </CheckItem>

              {role === 'profesional' && (
                <CheckItem
                  id="noconflict"
                  checked={acceptNoConflict}
                  onChange={v => { clearErr(); setAcceptNoConflict(v) }}
                  required
                  accent
                >
                  Confirmo que al evaluar compañías declararé cualquier conflicto de interés existente, y que mis evaluaciones reflejarán mi criterio científico independiente.
                </CheckItem>
              )}
            </div>

            {/* Role summary */}
            {selectedRole && (
              <div className={styles.roleSummary} style={{ borderColor: selectedRole.color + '40' }}>
                <div className={styles.roleSummaryIcon} style={{ color: selectedRole.color, background: `${selectedRole.color}18` }}>
                  {selectedRole.icon}
                </div>
                <div>
                  <div className={styles.roleSummaryLabel}>Tu tipo de cuenta</div>
                  <div className={styles.roleSummaryName}>{selectedRole.label}</div>
                  {specialty && <div className={styles.roleSummarySpec}>{specialty}</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className={styles.navRow}>
          {step > 0 ? (
            <button className={`btn btn-outline btn-sm`} onClick={goBack} disabled={loading}>
              ← Atrás
            </button>
          ) : (
            <Link to="/login" className={`btn btn-ghost btn-sm`} style={{ textDecoration: 'none' }}>
              Ya tengo cuenta
            </Link>
          )}

          {step < 2 ? (
            <button className={styles.nextBtn} onClick={goNext}>
              Siguiente →
            </button>
          ) : (
            <button className={styles.nextBtn} onClick={handleSubmit} disabled={loading}>
              {loading && <span className={styles.spinner} />}
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function CheckItem({ id, checked, onChange, children, required, accent }) {
  return (
    <label htmlFor={id} className={`${styles.checkRow} ${accent ? styles.checkRowAccent : ''}`}>
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className={styles.checkText}>{children}</span>
      {required && <span className={styles.reqDot} />}
    </label>
  )
}
