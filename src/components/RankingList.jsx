import { useNavigate } from 'react-router-dom'
import styles from './RankingList.module.css'

const RANK_COLORS = ['var(--gold2)', '#c0c0c0', '#cd7f32']

export default function RankingList({ data, onEval }) {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} style={{ width: 48 }}>#</th>
            <th className={styles.th}>Compañía</th>
            <th className={styles.th}>Especialidad</th>
            <th className={styles.th}>TRL</th>
            <th className={styles.th}>Científico</th>
            <th className={styles.th}>Negocio</th>
            <th className={styles.th}>Global</th>
            <th className={styles.th} />
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr
              key={c.id}
              className={styles.row}
              onClick={() => navigate(`/companies/${c.id}`)}
            >
              <td className={styles.td}>
                <span
                  className={styles.rankNum}
                  style={{ color: c.rank <= 3 ? RANK_COLORS[c.rank - 1] : 'var(--text3)' }}
                >
                  {c.rank}
                </span>
              </td>

              <td className={styles.td}>
                <div className={styles.companyCell}>
                  <div className={styles.logo} style={{ background: c.color }}>
                    {c.name.substring(0, 2)}
                  </div>
                  <div>
                    <div className={styles.cName}>{c.name}</div>
                    <div className={styles.cSector}>{c.sector}</div>
                  </div>
                </div>
              </td>

              <td className={styles.td}>
                <span className="tag tag-sector">{c.sector}</span>
              </td>

              <td className={styles.td}>
                <span className="tag tag-trl">TRL {c.trl}</span>
              </td>

              <td className={styles.td}>
                <div className="score-bar">
                  <span style={{ fontSize: 13, fontWeight: 500, width: 30, color: 'var(--teal2)' }}>
                    {c.sciScore}
                  </span>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${c.sciScore * 10}%`, background: 'var(--teal)' }} />
                  </div>
                </div>
              </td>

              <td className={styles.td}>
                <div className="score-bar">
                  <span style={{ fontSize: 13, fontWeight: 500, width: 30, color: 'var(--accent2)' }}>
                    {c.bizScore}
                  </span>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${c.bizScore * 10}%`, background: 'var(--accent)' }} />
                  </div>
                </div>
              </td>

              <td className={styles.td}>
                <span
                  className="serif"
                  style={{
                    fontSize: 20,
                    color: c.rank <= 3 ? RANK_COLORS[c.rank - 1] : 'var(--text1)',
                  }}
                >
                  {c.global}
                </span>
              </td>

              <td className={styles.td}>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={(e) => { e.stopPropagation(); onEval(c.name) }}
                >
                  Evaluar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}