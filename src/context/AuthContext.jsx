import { createContext, useContext, useState, useCallback } from 'react'

/**
 * Mock users "database" — replace with Supabase auth in production.
 * Roles: 'profesional' | 'inversor' | 'empresa'
 */
const MOCK_USERS = [
  {
    id: 1,
    email: 'medico@asclepios.io',
    password: 'demo123',
    name: 'Dr. Ramírez',
    initials: 'DR',
    role: 'profesional',
    specialty: 'Oncología',
    plan: 'Premium',
    acceptedTerms: true,
  },
  {
    id: 2,
    email: 'inversor@asclepios.io',
    password: 'demo123',
    name: 'Carlos Vidal',
    initials: 'CV',
    role: 'inversor',
    specialty: null,
    plan: 'Premium',
    acceptedTerms: true,
  },
  {
    id: 3,
    email: 'empresa@asclepios.io',
    password: 'demo123',
    name: 'NeuraSynth Bio',
    initials: 'NB',
    role: 'empresa',
    specialty: null,
    plan: 'Free',
    acceptedTerms: true,
  },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)       // null = not logged in
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    // Simulate network delay
    await new Promise(r => setTimeout(r, 900))
    const found = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      setError('Credenciales incorrectas. Prueba con los usuarios de demo.')
      setLoading(false)
      return false
    }
    setUser(found)
    setLoading(false)
    return true
  }, [])

  // ── REGISTER ──────────────────────────────────────────────────────────────
  const register = useCallback(async ({ name, email, password, role, specialty }) => {
    setLoading(true)
    setError(null)
    await new Promise(r => setTimeout(r, 1100))

    if (MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError('Ya existe una cuenta con ese email.')
      setLoading(false)
      return false
    }

    const initials = name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('')

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      initials,
      role,
      specialty: specialty || null,
      plan: 'Free',
      acceptedTerms: true,
    }

    MOCK_USERS.push(newUser)
    setUser(newUser)
    setLoading(false)
    return true
  }, [])

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setUser(null)
    setError(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
