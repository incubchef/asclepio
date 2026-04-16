import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { rankings } from '../mock/data'
import RankingList from '../components/RankingList'
import FilterChips from '../components/FilterChips'
import styles from './Home.module.css'

const PERIODS = ['Anual', 'Semestral', 'Trimestral']
const SPECS   = ['Todas', 'Oncología', 'Cardiología', 'Neurociencia', 'Inmunología', 'DiagDx']

export default function Home() {
  const { openEval } = useOutletContext()
  const [period, setPeriod] = useState('Anual')
  const [spec, setSpec]     = useState('Todas')

  const filtered = rankings.filter(c =>
    spec === 'Todas' || c.sector.toLowerCase().includes(spec.toLowerCase())
  )

  const totalEvals  = rankings.reduce((s, c) => s + c.evals, 0)
  const avgTopScore = (rankings.slice(0, 10).reduce((s, c) => s + c.global, 0) / Math.min(rankings.length, 10)).toFixed(1)

  return (
    <div>
      {/* Filters */}
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Periodo:</span>
        <FilterChips options={PERIODS} active={period} onChange={setPeriod} />
        <span className={styles.filterLabel} style={{ marginLeft: 12 }}>Especialidad:</span>
        <FilterChips options={SPECS} active={spec} onChange={setSpec} />
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Compañías activas</div>
          <div className={styles.statValue}>{rankings.length}</div>
          <div className={styles.statDelta}>+14 este trimestre</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Evaluaciones totales</div>
          <div className={styles.statValue}>{totalEvals.toLocaleString()}</div>
          <div className={styles.statDelta}>+203 este mes</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Score medio top‑10</div>
          <div className={styles.statValue}>{avgTopScore}</div>
          <div className={styles.statDelta}>+0.3 vs periodo anterior</div>
        </div>
      </div>

      {/* Table */}
      <RankingList data={filtered} onEval={openEval} />

      {filtered.length === 0 && (
        <p className={styles.empty}>No hay compañías para los filtros seleccionados.</p>
      )}
    </div>
  )
}