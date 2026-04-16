import { createContext, useContext, useState, useCallback } from 'react'

const NotifContext = createContext(null)

export function NotifProvider({ children }) {
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)
  const [timer, setTimer] = useState(null)

  const showNotif = useCallback((text) => {
    if (timer) clearTimeout(timer)
    setMsg(text)
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 3000)
    setTimer(t)
  }, [timer])

  return (
    <NotifContext.Provider value={showNotif}>
      {children}
      <div className={`notif-toast${visible ? ' show' : ''}`}>{msg}</div>
    </NotifContext.Provider>
  )
}

export const useNotif = () => useContext(NotifContext)