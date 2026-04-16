import styles from './FeedItem.module.css'

export default function FeedItem({ item, onEval }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar} style={{ background: item.color }}>
          {item.company.substring(0, 2)}
        </div>
        <div className={styles.meta}>
          <span className={styles.company}>{item.company}</span>
          <span className={styles.time}>{item.time}</span>
        </div>
        <span
          className="tag"
          style={{ background: item.typeBg, color: item.typeColor, fontSize: 10.5 }}
        >
          {item.typeLabel}
        </span>
      </div>

      <div className={styles.title}>{item.title}</div>
      <p className={styles.text}>{item.text}</p>

      <div className={styles.actions}>
        <button className={styles.action}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {item.likes}
        </button>
        <button className={styles.action} onClick={() => onEval(item.company)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          {item.evals} evaluaciones
        </button>
        <button className={styles.action}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Compartir
        </button>
      </div>
    </div>
  )
}