import { Routes, Route, Navigate } from 'react-router-dom'
import { NotifProvider } from './context/NotifContext.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Feed from './pages/Feed.jsx'
import Companies from './pages/Companies.jsx'
import CompanyProfile from './pages/CompanyProfile.jsx'
import Investments from './pages/Investments.jsx'
import Portfolio from './pages/Portfolio.jsx'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public routes — redirect to app if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Protected app routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="feed" element={<Feed />} />
        <Route path="companies" element={<Companies />} />
        <Route path="companies/:id" element={<CompanyProfile />} />
        <Route path="investments" element={<Investments />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NotifProvider>
        <AppRoutes />
      </NotifProvider>
    </AuthProvider>
  )
}
