import { createContext, useState, useEffect, useContext } from 'react'
import authService from '../../services/authService'

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContext = createContext()

const AuthContextConsumer = ({children}) => {
  return (
    <AuthContext.Consumer>{children}</AuthContext.Consumer>
  )
}

const AuthContextProvider = ({ children }) => {
  const [ user, setUser ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const user = await authService.getAuth()
      if (user) {
        setUser(user.name)
        setIsLoggedIn(true)
        setLoading(false)
      } else {
        setUser(null)
        setIsLoggedIn(false)
        setLoading(true)
      }
      
    }

    getUser()

  },[])

  const value = { user, setUser, isLoggedIn, setIsLoggedIn, loading, setLoading }
  
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export { AuthContextProvider, AuthContextConsumer, useAuth }
