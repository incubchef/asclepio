import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { companies } from '../mock/data'
import CompanyCard from '../components/CompanyCard'
import FilterChips from '../components/FilterChips'
import { useNotif } from '../context/NotifContext'
import styles from './Companies.module.css'

const FILTERS = ['Todas', 'Oncología', 'Cardiología', 'Neurociencia', 'MedTech', 'BioTech', 'Nuevas']

export default function Companies() {
  const showNotif = useNotif()
  const [filter, setFilter] = useState('Todas')

  const filtered = companies.filter(c => {
    if (filter === 'Todas') return true
    if (filter === 'Nuevas') return c.tags.includes('New')
    return c.sector.toLowerCase().includes(filter.toLowerCase()) ||
           c.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
  })

  return (
    <div>
      <div className={styles.topRow}>
        <FilterChips options={FILTERS} active={filter} onChange={setFilter} />
        <button
          className="btn btn-primary btn-sm"
          onClick={() => showNotif('Formulario de alta disponible próximamente')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Añadir empresa
        </button>
      </div>

      <div className={styles.grid}>
        {filtered.map(c => <CompanyCard key={c.id} company={c} />)}
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>No hay compañías para este filtro.</p>
      )}
    </div>
  )
}