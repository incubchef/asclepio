import { Routes, Route } from 'react-router-dom'
import { NotifProvider } from './context/NotifContext.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Feed from './pages/Feed.jsx'
import Companies from './pages/Companies.jsx'
import CompanyProfile from './pages/CompanyProfile.jsx'
import Investments from './pages/Investments.jsx'
import Portfolio from './pages/Portfolio.jsx'

export default function App() {
  return (
    <NotifProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="feed" element={<Feed />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:id" element={<CompanyProfile />} />
          <Route path="investments" element={<Investments />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </NotifProvider>
  )
}