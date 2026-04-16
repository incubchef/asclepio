import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { feed } from '../mock/data'
import FeedItem from '../components/FeedItem'
import FilterChips from '../components/FilterChips'
import styles from './Feed.module.css'

const FILTERS = ['Todo', 'Updates', 'Papers', 'Hitos', 'Contratos', 'Nuevas empresas']

export default function Feed() {
  const { openEval } = useOutletContext()
  const [active, setActive] = useState('Todo')

  const filtered = feed.filter(item =>
    active === 'Todo' ||
    item.typeLabel.toLowerCase().includes(active.toLowerCase()) ||
    item.type.toLowerCase().includes(active.toLowerCase())
  )

  return (
    <div className={styles.wrap}>
      <div className={styles.filterRow}>
        <FilterChips options={FILTERS} active={active} onChange={setActive} />
      </div>

      <div className={styles.feed}>
        {filtered.map(item => (
          <FeedItem key={item.id} item={item} onEval={openEval} />
        ))}

        {filtered.length === 0 && (
          <p className={styles.empty}>No hay publicaciones para este filtro.</p>
        )}
      </div>
    </div>
  )
}