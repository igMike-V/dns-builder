import { createContext, useState, useContext } from 'react'

const ConfirmContext = createContext()

const useConfirm = () => {
  const [ confirm, setConfirm ] = useContext(ConfirmContext)

  const isConfirmed = (heading, message) => {
    return new Promise((resolve, reject) => {
      setConfirm({
        heading,
        message,
        isOpen: true,
        proceed: () => {
          setConfirm({...confirm, isOpen: false})
          resolve(true)
        },
        cancel: () => {
          setConfirm({...confirm, isOpen: false})
          resolve(false)
          reject("user cancelled")
        },
      })
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
    <ConfirmContext.Provider value={[ confirm, setConfirm ]}>
      {children}
    </ConfirmContext.Provider>
  )
}

export {ConfirmContextProvider, ConfirmContext, useConfirm}