import { useOutletContext } from 'react-router-dom'
import { investments } from '../mock/data'
import { useNotif } from '../context/NotifContext'
import styles from './Investments.module.css'

export default function Investments() {
  const showNotif = useNotif()

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Oportunidades de inversión</h2>
          <p className={styles.sub}>Deal flow curado y validado por la comunidad Asclepios</p>
        </div>
        <button className="btn btn-teal btn-sm" onClick={() => showNotif('Acceso Premium activado')}>
          Solicitar acceso premium
        </button>
      </div>

      <div className={styles.list}>
        {investments.map(inv => (
          <div key={inv.id} className={styles.card}>
            <div className={styles.logoWrap}>
              <div className={styles.logo} style={{ background: inv.color }}>
                {inv.name.substring(0, 2)}
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.name}>{inv.name}</div>
              <div className={styles.meta}>
                {inv.sector} · {inv.stage} · Ticket mín. {inv.minTicket}
              </div>
              <div className={styles.progressWrap}>
                <div className={styles.progressBg}>
                  <div className={styles.progressFill} style={{ width: `${inv.progress}%` }} />
                </div>
                <span className={styles.progressLabel}>{inv.progress}% comprometido · cierra {inv.deadline}</span>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.amount}>{inv.amount}</div>
              <div className={styles.type}>{inv.type}</div>
              <div className={styles.irr}>{inv.irr}</div>
              <button
                className="btn btn-teal btn-sm"
                style={{ marginTop: 10 }}
                onClick={() => showNotif('Solicitud de participación enviada')}
              >
                Participar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}