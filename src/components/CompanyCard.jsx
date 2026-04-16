import { useNavigate } from 'react-router-dom'
import styles from './CompanyCard.module.css'

export default function CompanyCard({ company }) {
  const navigate = useNavigate()
  const avg = ((company.sciScore + company.bizScore) / 2).toFixed(1)

  return (
    <div className={styles.card} onClick={() => navigate(`/companies/${company.id}`)}>
      <div className={styles.header}>
        <div className={styles.logo} style={{ background: company.color }}>
          {company.name.substring(0, 2)}
        </div>
        <div>
          <div className={styles.name}>{company.name}</div>
          <div className={styles.sector}>{company.sector} · {company.country}</div>
        </div>
      </div>

      <p className={styles.desc}>{company.desc}</p>

      <div className={styles.footer}>
        <div className={styles.scorePill}>
          <span className={styles.dot} />
          <span style={{ color: 'var(--text2)', fontSize: 11 }}>Score</span>
          <span style={{ fontWeight: 500 }}>{avg}</span>
        </div>
        <div className={styles.tags}>
          {company.tags.map(t => (
            <span key={t} className={`tag ${t === 'New' ? 'tag-new' : t === 'Paid' ? 'tag-paid' : 'tag-sector'}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}