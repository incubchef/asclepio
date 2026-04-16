import { useState } from 'react'
import { companies } from '../mock/data.js'
import { useNotif } from '../context/NotifContext.jsx'
import styles from './EvalModal.module.css'

export default function EvalModal({ onClose, preselect }) {
  const showNotif = useNotif()
  const [selected, setSelected] = useState(preselect ?? companies[0].name)
  const [sciScore, setSciScore] = useState(7)
  const [bizScore, setBizScore] = useState(6)
  const [comment, setComment] = useState('')
  const [conf1, setConf1] = useState(false)
  const [conf2, setConf2] = useState(false)

  const globalScore = (sciScore * 0.6 + bizScore * 0.4).toFixed(1)

  function handleSubmit() {
    if (!conf1 || !conf2) {
      showNotif('⚠ Debes aceptar todas las confirmaciones')
      return
    }
    onClose()
    showNotif('✓ Evaluación enviada correctamente')
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.box}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Evaluar compañía</h2>
            <p className={styles.sub}>Tu evaluación es anónima y ponderada según tu perfil</p>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: '4px 8px', fontSize: 18 }}>×</button>
        </div>

        <div className={styles.warning}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Antes de evaluar confirma que no existe conflicto de interés con esta compañía
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Compañía a evaluar</label>
          <select className={styles.select} value={selected} onChange={e => setSelected(e.target.value)}>
            {companies.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Score científico — <span style={{ color: 'var(--teal2)' }}>{sciScore.toFixed(1)}</span></label>
          <input type="range" min="0" max="10" step="0.5" value={sciScore}
            onChange={e => setSciScore(parseFloat(e.target.value))} className={styles.range} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Score de negocio — <span style={{ color: 'var(--accent2)' }}>{bizScore.toFixed(1)}</span></label>
          <input type="range" min="0" max="10" step="0.5" value={bizScore}
            onChange={e => setBizScore(parseFloat(e.target.value))} className={styles.range} />
        </div>

        <div className={styles.scores}>
          <div className={styles.scoreBox}>
            <span className={styles.scoreNum} style={{ color: 'var(--teal2)' }}>{sciScore.toFixed(1)}</span>
            <span className={styles.scoreLabel}>Científico</span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.scoreNum} style={{ color: 'var(--accent2)' }}>{bizScore.toFixed(1)}</span>
            <span className={styles.scoreLabel}>Negocio</span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.scoreNum} style={{ color: 'var(--gold2)' }}>{globalScore}</span>
            <span className={styles.scoreLabel}>Global (60/40)</span>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Comentario técnico (anónimo)</label>
          <textarea className={styles.textarea} rows={4}
            placeholder="Descripción técnica, puntos fuertes, debilidades, preguntas..."
            value={comment} onChange={e => setComment(e.target.value)} />
        </div>

        <div className={styles.checkRow}>
          <input type="checkbox" id="conf1" checked={conf1} onChange={e => setConf1(e.target.checked)} />
          <label htmlFor="conf1" className={styles.checkLabel}>
            Confirmo que no tengo conflicto de interés con esta compañía
          </label>
        </div>
        <div className={styles.checkRow}>
          <input type="checkbox" id="conf2" checked={conf2} onChange={e => setConf2(e.target.checked)} />
          <label htmlFor="conf2" className={styles.checkLabel}>
            Acepto las condiciones de confidencialidad de la plataforma Asclepios
          </label>
        </div>

        <div className={styles.actions}>
          <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Enviar evaluación</button>
        </div>
      </div>
    </div>
  )
}