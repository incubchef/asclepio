import { useState } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { companies } from '../mock/data'
import { useNotif } from '../context/NotifContext'
import styles from './CompanyProfile.module.css'

const COUNTRY_NAMES = { ES: 'España', UK: 'Reino Unido', US: 'Estados Unidos', DE: 'Alemania', FR: 'Francia' }

const MOCK_EVALS = [
  { role: 'Oncólogo', score: 9.2, comment: 'Tecnología muy sólida. Pendiente de ver resultados fase III pero los datos preliminares son robustos y reproducibles en distintos centros.', anon: true },
  { role: 'Inversor VC', score: 8.5, comment: 'Mercado direccionable enorme. El equipo tiene experiencia probada y el acuerdo con instituciones de referencia da credibilidad al modelo comercial.', anon: true },
  { role: 'Científico', score: 9.7, comment: 'La sensibilidad y especificidad reportada es excepcional. Los datos de validación multicéntrica son robustos y la metodología es reproducible.', anon: true },
]

function TrlVisual({ trl }) {
  return (
    <div className={styles.trlWrap}>
      <div className={styles.trlSteps}>
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className={`${styles.trlStep} ${i < trl - 1 ? styles.trlFilled : ''} ${i === trl - 1 ? styles.trlCurrent : ''}`}
          />
        ))}
      </div>
      <span className={styles.trlLabel}>
        TRL {trl} — {trl >= 8 ? 'Producto listo / en mercado' : trl >= 6 ? 'Demostración en entorno real' : trl >= 4 ? 'Validación en laboratorio' : 'Investigación básica'}
      </span>
    </div>
  )
}

export default function CompanyProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { openEval } = useOutletContext()
  const showNotif = useNotif()
  const [tab, setTab] = useState('overview')

  const company = companies.find(c => c.id === Number(id))

  if (!company) {
    return (
      <div className={styles.notFound}>
        <p>Compañía no encontrada.</p>
        <button className="btn btn-outline" onClick={() => navigate('/companies')}>← Volver</button>
      </div>
    )
  }

  const avg = ((company.sciScore + company.bizScore) / 2).toFixed(1)

  return (
    <div>
      <button className="btn btn-ghost" onClick={() => navigate('/companies')} style={{ marginBottom: 16 }}>
        ← Volver a compañías
      </button>

      {/* Header card */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo} style={{ background: company.color }}>
            {company.name.substring(0, 2)}
          </div>
          <div className={styles.headerMeta}>
            <h1 className={styles.name}>{company.name}</h1>
            <p className={styles.tagline}>{company.desc}</p>
            <div className={styles.tagRow}>
              <span className="tag tag-sector">{company.sector}</span>
              <span className="tag tag-trl">TRL {company.trl}</span>
              {company.tags.map(t => (
                <span key={t} className={`tag ${t === 'New' ? 'tag-new' : t === 'Paid' ? 'tag-paid' : 'tag-sector'}`}>{t}</span>
              ))}
              <span className="tag tag-sector">{COUNTRY_NAMES[company.country]}</span>
            </div>
          </div>
        </div>

        <div className={styles.statsRow}>
          {[
            { label: 'Score científico', value: company.sciScore, color: 'var(--teal2)' },
            { label: 'Score negocio',    value: company.bizScore, color: 'var(--accent2)' },
            { label: 'Score global',     value: avg,              color: 'var(--gold2)' },
            { label: 'Evaluaciones',     value: company.evals,    color: 'var(--text1)' },
          ].map(s => (
            <div key={s.label} className={styles.statBox}>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className="btn btn-primary btn-sm" onClick={() => openEval(company.name)}>
            Evaluar
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => showNotif('Solicitud enviada a la empresa')}>
            Solicitar info
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => showNotif('Documentos disponibles para suscriptores Premium')}>
            Ver documentos
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {[
          { key: 'overview',      label: 'Overview' },
          { key: 'ciencia',       label: 'Ciencia' },
          { key: 'negocio',       label: 'Negocio' },
          { key: 'evaluaciones',  label: `Evaluaciones (${company.evals})` },
        ].map(t => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {tab === 'overview' && (
        <div className={styles.tabContent}>
          <p className={styles.sectionTitle}>Technology Readiness Level</p>
          <TrlVisual trl={company.trl} />
          <div className={styles.infoGrid}>
            <InfoItem label="País"         value={COUNTRY_NAMES[company.country]} />
            <InfoItem label="Especialidad" value={company.sector} />
            <InfoItem label="Etapa"        value={company.stage} />
            <InfoItem label="Evaluaciones" value={`${company.evals} verificadas`} />
          </div>
        </div>
      )}

      {/* Tab: Ciencia */}
      {tab === 'ciencia' && (
        <div className={styles.tabContent}>
          <div className={styles.infoGrid}>
            <InfoItem label="Score científico" value={company.sciScore} accent="var(--teal2)" />
            <InfoItem label="Papers publicados" value={company.papers} />
            <InfoItem label="Ensayos clínicos"  value={company.trials} />
            <InfoItem label="Validación"        value={company.validation} />
          </div>
        </div>
      )}

      {/* Tab: Negocio */}
      {tab === 'negocio' && (
        <div className={styles.tabContent}>
          <div className={styles.infoGrid}>
            <InfoItem label="Score negocio"      value={company.bizScore} accent="var(--accent2)" />
            <InfoItem label="Mercado (TAM)"       value={company.tam} />
            <InfoItem label="Modelo de negocio"   value={company.model} />
            <InfoItem label="Traction"            value={company.traction} />
          </div>
        </div>
      )}

      {/* Tab: Evaluaciones */}
      {tab === 'evaluaciones' && (
        <div className={styles.tabContent}>
          <p className={styles.sectionTitle}>Evaluaciones de la comunidad</p>
          {MOCK_EVALS.map((ev, i) => (
            <div key={i} className={styles.evalCard}>
              <div className={styles.evalHeader}>
                <span className={styles.evalRole}>{ev.role}</span>
                <span className={styles.evalAnon}>Anónimo · verificado</span>
              </div>
              <div className={styles.evalScore}>
                <span className="serif" style={{ fontSize: 26 }}>{ev.score}</span>
                <span style={{ color: 'var(--text3)', fontSize: 12 }}>/10</span>
              </div>
              <p className={styles.evalText}>{ev.comment}</p>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={() => openEval(company.name)} style={{ marginTop: 8 }}>
            + Añadir evaluación
          </button>
        </div>
      )}
    </div>
  )
}

function InfoItem({ label, value, accent }) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoLabel}>{label}</div>
      <div className={styles.infoValue} style={accent ? { color: accent, fontFamily: 'var(--serif)', fontSize: 22 } : {}}>
        {value}
      </div>
    </div>
  )
}