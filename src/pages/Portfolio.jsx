import { portfolio } from '../mock/data'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const totalInvested = portfolio.reduce((s, p) => s + p.invested, 0)
  const totalCurrent  = portfolio.reduce((s, p) => s + p.current, 0)
  const totalReturn   = (((totalCurrent - totalInvested) / totalInvested) * 100).toFixed(1)
  const isPositive    = totalCurrent >= totalInvested

  function fmt(n) {
    return `€${(n / 1000).toFixed(0)}K`
  }

  function pct(inv, cur) {
    const p = (((cur - inv) / inv) * 100).toFixed(1)
    return { val: `${p > 0 ? '+' : ''}${p}%`, pos: cur >= inv }
  }

  return (
    <div>
      <h2 className={styles.title}>Mi Cartera</h2>

      {/* Summary */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Total invertido</div>
          <div className={styles.summaryValue}>{fmt(totalInvested)}</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Valor actual</div>
          <div className={styles.summaryValue} style={{ color: isPositive ? 'var(--green)' : 'var(--red)' }}>
            {fmt(totalCurrent)}
          </div>
          <div className={styles.summaryDelta} style={{ color: isPositive ? 'var(--green)' : 'var(--red)' }}>
            {isPositive ? '+' : ''}{totalReturn}% retorno total
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Posiciones</div>
          <div className={styles.summaryValue}>{portfolio.length}</div>
        </div>
      </div>

      {/* Positions table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Compañía</th>
              <th className={styles.th}>Etapa</th>
              <th className={styles.th}>Entrada</th>
              <th className={styles.th}>Invertido</th>
              <th className={styles.th}>Valor actual</th>
              <th className={styles.th}>Rendimiento</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map(p => {
              const { val, pos } = pct(p.invested, p.current)
              return (
                <tr key={p.id} className={styles.row}>
                  <td className={styles.td}>
                    <div className={styles.companyCell}>
                      <div className={styles.logo} style={{ background: p.color }}>
                        {p.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className={styles.cName}>{p.name}</div>
                        <div className={styles.cSector}>{p.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className="tag tag-sector">{p.stage}</span>
                  </td>
                  <td className={styles.td} style={{ color: 'var(--text3)', fontSize: 13 }}>{p.date}</td>
                  <td className={styles.td} style={{ color: 'var(--text2)' }}>{fmt(p.invested)}</td>
                  <td className={styles.td} style={{ fontWeight: 500 }}>{fmt(p.current)}</td>
                  <td className={styles.td}>
                    <span style={{ color: pos ? 'var(--green)' : 'var(--red)', fontWeight: 500 }}>{val}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}