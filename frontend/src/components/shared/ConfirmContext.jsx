import { createContext, useState, useContext } from 'react'

export const ConfirmContext = createContext()

export const useConfirm = () => {
  const [ confirm, setConfirm ] = useContext(ConfirmContext)

  const isConfirmed = (prompt) => {
    const promise = new Promise((resolve, reject) => {
      setConfirm({
        heading: prompt,
        isOpen: true,
        proceed: resolve,
        cancel: reject
      })
    })

    return promise.then(() => {
      () => {
        setConfirm({...confirm, isOpen: false})
        return true
      },
      () => {
        setConfirm({...confirm, isOpen: false})
        return false
      }
    })
  }

  return {
    ...confirm,
    isConfirmed
  }
}

const ConfirmContextProvider = ({ children }) => {
  const [ confirm, setConfirm ] = useState({
    heading: '',
    isOpen: false,
    proceed: null,
    cancel: null
  })
  return (
    <ConfirmContext.Provider value={{ confirm, setConfirm }}>
      {children}
    </ConfirmContext.Provider>
  )
}

export default {ConfirmContextProvider}