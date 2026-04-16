import styles from './FilterChips.module.css'

export default function FilterChips({ options, active, onChange }) {
  return (
    <div className={styles.row}>
      {options.map(opt => (
        <button
          key={opt}
          className={`${styles.chip} ${active === opt ? styles.active : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}